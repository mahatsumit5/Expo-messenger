import { Alert } from "react-native";
import { emptySplitApi } from ".";
import { userApi } from "./userApi";
export interface ISendReqRes {
  status: boolean;
  data: IFriendReq;
}
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
  }),
});
