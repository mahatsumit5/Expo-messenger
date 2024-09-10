import { storeData } from "@/util";
import { setUser } from "../reducers/userSlice";
import { emptySplitApi } from "./index";
import { doesItemExistInCache, ErrorAlert } from "@/lib/utils";
import { Alert } from "react-native";
import { setTotalNumberOfUsers } from "../reducers/querySlice";

interface Response extends ServerResponse {
  token: {
    accessJWT: string;
  };
}
interface IGetAllUsersParams {
  take: number;
  page: number;
  order: "asc" | "desc";
  search?: string;
}
interface IAllUsersResponse {
  status: boolean;
  data: IUser[];
  totalUsers: number;
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
            await storeData("email", arg.email);
            dispatch(userApi.endpoints.getLoggedInUser.initiate());
          }
        } catch (error) {
          ErrorAlert(error);
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
          ErrorAlert(error);
        }
      },
    }),
    signUp: builder.mutation<ServerResponse, object>({
      query: (data) => {
        return { url: "user/sign-up", method: "post", body: data, timeout: 10 };
      },
    }),

    getAllUsers: builder.query<IAllUsersResponse, IGetAllUsersParams | null>({
      query: (params) =>
        `user/all-users?order=${params?.order}&&page=${params?.page}&&take=${params?.take}&&search=${params?.search}`,

      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) => {
        try {
          const { data } = await cacheDataLoaded;

          dispatch(setTotalNumberOfUsers(data.totalUsers));
        } catch (error) {
          ErrorAlert(error);
        }
        await cacheEntryRemoved;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch(params) {
        return (
          params.currentArg?.page !== params.previousArg?.page ||
          params.currentArg?.order !== params.previousArg?.order
        );
      },
      merge(currentCacheData, responseData, otherArgs) {
        if (doesItemExistInCache(currentCacheData.data, responseData.data)) {
          return;
        }
        currentCacheData.data = [
          ...currentCacheData.data,
          ...responseData.data,
        ];
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
