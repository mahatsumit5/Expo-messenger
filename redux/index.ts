import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { commentApi } from "./api/commentApi";
export const {
  useLoginMutation,
  useGetLoggedInUserQuery,
  useSignUpMutation,
  useUpdateUserMutation,
} = userApi;
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsByUserQuery,
} = postApi;
export const { useGetCommentsQuery } = commentApi;
