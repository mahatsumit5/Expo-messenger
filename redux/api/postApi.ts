import { emptySplitApi } from ".";
import { Alert } from "react-native";
import { ErrorAlert } from "@/lib/utils";
interface GetPostParams {
  page: number;
  take: number;
}
export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all post
    getPosts: builder.query<GetPostRes, GetPostParams>({
      query: ({ page, take }) => `post?page=${page}&&take=${take}`,
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          await cacheDataLoaded;
        } catch (error) {
          ErrorAlert(error);
        } finally {
          await cacheEntryRemoved;
        }
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
      // Serialize the query args to ensure correct cacheKey generation
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (cacheData, incomingData) => {
        if (cacheData.posts[0].id === incomingData.posts[0].id) {
          cacheData = cacheData;
          console.log("same data");
          return;
        }
        console.log(incomingData);

        cacheData.posts = [...cacheData.posts, ...incomingData.posts];
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // get post by user
    getPostsByUser: builder.query<Response, string>({
      query: (userId) => `post/user/${userId}`,
    }),

    // create a new post
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
            postApi.util.updateQueryData(
              "getPosts",
              { take: 5, page: 1 },
              (draft) => {
                return {
                  totalNumberOfPosts: draft.totalNumberOfPosts + 1,
                  posts: [data.result, ...draft.posts],
                };
              }
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

    // delete post
    deletePost: builder.mutation<IDeletePost, string>({
      query: (postId) => {
        return { url: `post/${postId}`, method: "delete" };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData(
              "getPosts",
              { take: 5, page: 1 },
              (draft) => {
                return {
                  ...draft,
                  posts: draft.posts.filter((post) => post.id !== data.post.id),
                };
              }
            )
          );
        } catch (error) {
          ErrorAlert(error);
        }
      },
    }),

    // like post
    likePost: builder.mutation<ILikedPost, string>({
      query: (postId) => {
        return { url: "post/like", method: "put", body: { postId } };
      },
      transformResponse: (res: ILikePostResponse) => res.likedPost,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData(
              "getPosts",
              { take: 5, page: 1 },
              (draft) => {
                return {
                  ...draft,
                  posts: draft.posts.map((post) => {
                    if (post.id === data.postId) {
                      return { ...post, likes: [...post.likes, data] };
                    } else {
                      return post;
                    }
                  }),
                };
              }
            )
          );
        } catch (error) {
          ErrorAlert(error);
        }
      },
    }),

    // remove like
    removeLike: builder.mutation<ILikedPost, string>({
      query: (likeId) => {
        return {
          url: `post/remove-like`,
          method: "put",
          body: { likeId },
        };
      },
      transformResponse: (res: IRemovedLikeRes) => res.deletedLike,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData(
              "getPosts",
              { take: 5, page: 1 },
              (draft) => {
                return {
                  ...draft,
                  posts: draft.posts.map((post) => {
                    if (post.id === data.postId) {
                      return {
                        ...post,
                        likes: post.likes.filter(
                          (like: ILikedPost) => like.id !== data.id
                        ),
                      };
                    } else {
                      return post;
                    }
                  }),
                };
              }
            )
          );
        } catch (error) {
          ErrorAlert(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

interface IRemovedLikeRes {
  status: boolean;
  message: string;
  deletedLike: ILikedPost;
}
interface ILikePostResponse {
  status: boolean;
  message: string;
  likedPost: ILikedPost;
}
interface ILikedPost {
  id: string;
  postId: string;
  userId: string;
}
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
interface GetPostRes {
  posts: IPost[];
  totalNumberOfPosts: number;
}
