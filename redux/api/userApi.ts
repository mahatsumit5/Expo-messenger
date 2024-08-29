import { storeData } from "@/util";
import { setUser } from "../reducers/userSlice";
import { emptySplitApi } from "./index";

interface Response extends ServerResponse {
  token: {
    accessJWT: string;
  };
}

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Response, { email: string; password: string }>({
      query: (data) => ({ url: "user/sign-in", method: "POST", body: data }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.token.accessJWT) {
            await storeData("token", data.token.accessJWT);

            dispatch(userApi.endpoints.getLoggedInUser.initiate());
          }
        } catch (error) {
          throw new Error();
        }
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),

    getLoggedInUser: builder.query<IUser, void>({
      query: () => ({ url: "user", method: "get" }),
      transformResponse: (response: { status: boolean; data: IUser }) =>
        response.data,

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("this is data after user is called", data);
          dispatch(setUser({ user: data as IUser, isLoggedIn: true }));
        } catch (error) {
          throw new Error();
        }
      },
    }),
    signUp: builder.mutation<ServerResponse, Object>({
      query: (data) => {
        return { url: "user/sign-up", method: "post", body: data, timeout: 10 };
      },
    }),

    updateUser: builder.mutation<
      ServerResponse,
      {
        fName: string;
        lName: string;
        bio?: string;
        profile?: string | null;
        coverPicture?: string | null;
      }
    >({
      query: (data) => {
        console.log(data);
        return { url: "user/update-user", method: "put", body: data };
      },
    }),
  }),
  overrideExisting: true,
});
