import { ErrorAlert } from "@/util";
import { emptySplitApi } from ".";
type sendMessagePArams = {
  content: string | File;
  roomId: string;
  author: string;
  numOfMessages: number;
};

interface IMessageResponse {
  status: boolean;
  result: {
    messages: IMessage[];
    _count: { messages: number };
  };
}
type keys = "author" | "roomId" | "content";
export const messageApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      { status: boolean; result: IMessage },
      sendMessagePArams
    >({
      query: (data) => {
        return { url: "message", method: "post", body: data };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            messageApi.util.updateQueryData(
              "getMessages",
              {
                take: arg.numOfMessages,
                roomId: arg.roomId,
              },
              (draft) => {
                draft.result._count.messages = draft.result._count.messages + 1;
                draft.result.messages = [data.result, ...draft.result.messages];
              }
            )
          );
        } catch (error) {
          // display error or do something else
          ErrorAlert(error);
        }
      },
    }),

    getMessages: builder.query<
      IMessageResponse,
      { roomId: string; take: number }
    >({
      query: ({ roomId, take }) =>
        `message?id=${roomId}&&take=${take}&&platform=mobile`,
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          // wait for initial query to resolve before proceeding

          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
        } catch (error) {
          ErrorAlert(error);
        }
        await cacheEntryRemoved;
      },
    }),
  }),

  overrideExisting: true,
});
