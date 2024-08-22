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
          dispatch(setUser({ user: data as IUser, isLoggedIn: true }));
        } catch (error) {
          throw new Error();
        }
      },
    }),
  }),
  overrideExisting: true,
});
