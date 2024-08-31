import { IChatRoom } from "@/types";
import { emptySplitApi } from ".";
type GetChatRoomParams = {
  page: number;
  take: number;
  search: string;
};
export type chatroomReturnType = {
  status: boolean;
  data: IChatRoom[];
};
export const roomApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllChatRoom: builder.query<chatroomReturnType, GetChatRoomParams>({
      query: ({ search, page, take }) =>
        "room?search=" + search + "&page=" + page + "&take=" + take,
      onQueryStarted: async () => {},
    }),
  }),
});
