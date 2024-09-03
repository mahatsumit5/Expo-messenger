import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { commentApi } from "./api/commentApi";
import { friendApi } from "./api/friend";
export const {
  useLoginMutation,
  useGetLoggedInUserQuery,
  useSignUpMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
} = userApi;
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsByUserQuery,
} = postApi;
export const { useGetCommentsQuery } = commentApi;
export const { useSendFriendRequestMutation, useGetSentFriendRequestQuery } =
  friendApi;
