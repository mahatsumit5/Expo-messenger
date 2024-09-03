import { Alert } from "react-native";
import { emptySplitApi } from ".";
import { userApi } from "./userApi";

export const friendApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    sendFriendRequest: builder.mutation<
      ISendReqRes,
      { to: string; page: number }
    >({
      query: (data) => ({
        url: "friend/send-request",
        method: "POST",
        body: { to: data.to },
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          // dispatch(
          //   friendApi.util.updateQueryData(
          //     "getSentFriendRequest",
          //     { search: "", page: 1 },
          //     (draft) => {
          //       draft.data = [...draft.data, data.data];
          //       draft.count = ++draft.count;
          //     },
          //     true
          //   )
          // );
          dispatch(
            userApi.util.updateQueryData(
              "getAllUsers",
              { order: "asc", page: arg.page, take: 8, search: "" },
              (draft) => {
                // Filter out the user with the matching ID from getAllUsers data
                draft.data = draft.data.filter(
                  (user) => user.id !== data.data.to.id
                );
              },
              true
            )
          );
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert("error", error.message);
          } else {
            throw new Error("Unknown error occured");
          }
        }
      },
    }),
    // get sent request  by the current logged in user
    getSentFriendRequest: builder.query<
      ISentReq,
      { page?: number; search?: string } | null
    >({
      query: (data) =>
        `friend/sent-request?take=7&&page=${data?.page}&&search=${data?.search}`,
      onCacheEntryAdded: async (
        argument,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) => {
        try {
          await cacheDataLoaded;
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert("error", error.message);
          } else {
            throw new Error("Unknown error occured");
          }
        } finally {
          await cacheEntryRemoved;
        }
      },
    }),
  }),
});
interface ISentReq {
  status: boolean;
  data: IFriendReq[];
  count: number;
}
interface ISendReqRes {
  status: boolean;
  data: IFriendReq;
}
