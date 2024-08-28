import { ImagePickerAsset } from "expo-image-picker";
import { emptySplitApi } from ".";
import * as AWSS3 from "react-native-aws3";
interface Response extends ServerResponse {
  posts: IPost[];
  totalNumberOfPosts: number;
}

export interface createPostParams {
  title: string;
  content: string;
  id: string;
  images: string[];
}

export interface ICreatePostRes {
  status: boolean;
  result: IPost;
}

type keys = "title" | "id" | "content" | "images";

export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      {
        posts: IPost[];
        totalNumberOfPosts: number;
      },
      number
    >({
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
      transformResponse(response: Response, meta, arg) {
        return {
          posts: response.posts,
          totalNumberOfPosts: response.totalNumberOfPosts,
        };
      },
      merge: (cacheData, incomingData) => {
        cacheData.posts.push(...incomingData.posts);
        cacheData.totalNumberOfPosts =
          cacheData.totalNumberOfPosts + incomingData.posts.length;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    createPost: builder.mutation<ICreatePostRes, createPostParams>({
      query: (data) => {
        return {
          url: "post",
          method: "post",
          body: data,
        };
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                totalNumberOfPosts: draft.totalNumberOfPosts + 1,
                posts: [data.result, ...draft.posts],
              };
            })
          );
        } catch (error) {
          throw new Error();
        }
      },
    }),
  }),
  overrideExisting: true,
});
