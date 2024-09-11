import { ErrorAlert } from "@/lib/utils";
import { emptySplitApi } from ".";
import { postApi } from "./postApi";

export const commentApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all your comments
    getComments: builder.query<IComment[], string>({
      query: (postId) => `comment/${postId}`,
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
        } catch (error) {
          ErrorAlert(error);
        } finally {
          await cacheEntryRemoved;
        }
      },
      transformResponse(baseQueryReturnValue: Response, meta, arg) {
        return baseQueryReturnValue.comments;
      },
    }),

    // create a new comment
    postComment: builder.mutation<IComment, ICreateCommentParams>({
      query: (data) => {
        return { url: "comment", body: data, method: "post" };
      },
      transformResponse: (response: { status: boolean; comment: IComment }) =>
        response.comment,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        try {
          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              (draft) => {
                draft.push(data);
              }
            )
          );
          dispatch(
            postApi.util.updateQueryData("getPosts", 0, (draft) => {
              return {
                ...draft,
                posts: draft.posts.map((post) => {
                  if (post.id === arg.postId) {
                    return {
                      ...post,
                      _count: {
                        comments: post._count.comments + 1,
                      },
                    };
                  } else {
                    return post;
                  }
                }),
              };
            })
          );
        } catch (error) {
          ErrorAlert(error);
        }
      },
    }),

    // delete your comment
    deleteComment: builder.mutation<IDeleteCommentRes, arg>({
      query: ({ commentId }) => ({
        url: `comment/delete-comment/${commentId}`,
        method: "delete",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              (draft) => {
                return draft.filter((comment) => comment.id !== arg.commentId);
              }
            )
          );
        } catch (error) {
          ErrorAlert(error);
        }
      },
    }),

    // like comment
    likeComment: builder.mutation<ILikeCommentResponse, arg>({
      query: ({ commentId }) => {
        return {
          url: "comment/like-comment",
          body: { commentId },
          method: "post",
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            commentApi.util.updateQueryData(
              "getComments",
              arg.postId,
              (draft) => {
                return draft.map((comment) => {
                  if (comment.id === arg.commentId) {
                    return {
                      ...comment,
                      likes: [...comment.likes, data.likedComment],
                    };
                  } else {
                    return comment;
                  }
                });
              }
            )
          );
        } catch (error) {
          ErrorAlert(error);
        }
      },
    }),

    // unlike comment
    unlikeComment: builder.mutation<IUnlikeLikeCommentResponse, arg>({
      query: ({ commentId }) => {
        return { url: `comment/unlike-comment/${commentId}`, method: "delete" };
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {},
    }),
  }),
  overrideExisting: true,
});

type arg = { commentId: string; postId: string };

interface Response extends ServerResponse {
  comments: IComment[];
}

interface ICreateCommentParams {
  userId: string;
  content: string;
  postId: string;
}

interface IDeleteCommentRes extends ServerResponse {
  data: IComment;
}

interface ILikeCommentResponse extends ServerResponse {
  likedComment: {
    userId: string;
  };
}
interface IUnlikeLikeCommentResponse extends ServerResponse {
  unlikedComment: {
    userId: string;
  };
}
