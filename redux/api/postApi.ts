import { ImagePickerAsset } from "expo-image-picker";
import { emptySplitApi } from ".";
interface Response extends ServerResponse {
  posts: IPost[];
  totalNumberOfPosts: number;
}

export interface createPostParams {
  title: string;
  content: string;
  id: string;
  images: ImagePickerAsset[];
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
        const formData = new FormData();
        for (const key in data) {
          const value = key as keys;
          if (value !== "images") formData.append(key, data[value]);
        }
        if (data.images) {
          for (let index = 0; index < data.images.length; index++) {
            const element = data.images[index];
            formData.append("images", element);
          }
        }

        return { url: "", method: "post", body: formData };
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
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});
