import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
export const { useLoginMutation, useGetLoggedInUserQuery } = userApi;
export const { useGetPostsQuery } = postApi;
