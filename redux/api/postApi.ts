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
export interface IDeletePost {
  status: boolean;
  message: string;
  post: IPost;
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
    getPostsByUser: builder.query<Response, string>({
      query: (userId) => `post/user/${userId}`,
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

    deletePost: builder.mutation<IDeletePost, string>({
      query: (postId) => {
        return { url: `post/${postId}`, method: "delete" };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                ...draft,
                posts: draft.posts.filter((post) => post.id !== data.post.id),
              };
            })
          );
        } catch (error) {
          throw new Error();
        }
      },
    }),
    // likePost: builder.mutation<ILikedPost, string>({
    //   query: (postId) => {
    //     return { url: "like", method: "put", body: { postId } };
    //   },
    //   transformResponse: (res: ILikePostResponse) => res.likedPost,
    //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    //     try {
    //       const { data } = await queryFulfilled;

    //       dispatch(
    //         postApi.util.updateQueryData("getPosts", 0, (draft) => {
    //           return {
    //             ...draft,
    //             posts: draft.posts.map((post) => {
    //               if (post.id === data.postId) {
    //                 return { ...post, likes: [...post.likes, data] };
    //               } else {
    //                 return post;
    //               }
    //             }),
    //           };
    //         })
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // }),
    // removeLike: builder.mutation<ILikedPost, string>({
    //   query: (likeId) => {
    //     return {
    //       url: `remove-like`,
    //       method: "put",
    //       body: { likeId },
    //     };
    //   },
    //   transformResponse: (res: IRemovedLikeRes) => res.deletedLike,
    //   onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
    //     try {
    //       const { data } = await queryFulfilled;

    //       dispatch(
    //         postApi.util.updateQueryData("getPosts", 0, (draft) => {
    //           return {
    //             ...draft,
    //             posts: draft.posts.map((post) => {
    //               if (post.id === data.postId) {
    //                 return {
    //                   ...post,
    //                   likes: post.likes.filter((like) => like.id !== data.id),
    //                 };
    //               } else {
    //                 return post;
    //               }
    //             }),
    //           };
    //         })
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // }),
  }),
  overrideExisting: true,
});
