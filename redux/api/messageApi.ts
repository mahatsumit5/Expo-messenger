import { ErrorAlert } from "@/lib/utils";
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
                skip: 10,
              },
              (draft) => {
                draft.result._count.messages = draft.result._count.messages + 1;
                draft.result.messages = [data.result, ...draft.result.messages];
              }
            )
          );
          // arg.socket.emit("send_message", data.result, arg.roomId);
        } catch (error) {
          // display error or do something else
          ErrorAlert(error);
        }
      },
    }),

    getMessages: builder.query<
      IMessageResponse,
      { roomId: string; skip: number; take: number }
    >({
      query: ({ roomId, skip, take }) =>
        `message?id=${roomId}&&take=${take}&&skip=${skip}&&platform=mobile`,

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
      }, // Serialize the query args to ensure correct cacheKey generation
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (cacheData, incomingData) => {
        console.log(incomingData);
        if (
          cacheData.result.messages[0].id === incomingData.result.messages[0].id
        ) {
          cacheData = cacheData;
          return;
        }
        cacheData.result.messages = [
          ...cacheData.result.messages,
          ...incomingData.result.messages,
        ];
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
      },
    }),
  }),

  overrideExisting: true,
});
