import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { commentApi } from "./api/commentApi";
export const { useLoginMutation, useGetLoggedInUserQuery } = userApi;
export const { useGetPostsQuery, useCreatePostMutation } = postApi;
export const { useGetCommentsQuery } = commentApi;
