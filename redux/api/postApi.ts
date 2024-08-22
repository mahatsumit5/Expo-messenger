import { emptySplitApi } from ".";
interface Response extends ServerResponse {
  posts: IPost[];
  totalNumberOfPosts: number;
}
export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Response, number>({
      query: (skip) => `post?skip=${skip}&&take=6`,
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          await cacheDataLoaded;
        } catch (error) {
          throw new Error();
        }
        await cacheEntryRemoved;
      },

      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue;
      },
      merge: (cacheData, incomingData) => {
        cacheData.posts.push(...incomingData.posts);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
  overrideExisting: true,
});
