import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { commentApi } from "./api/commentApi";
import { friendApi } from "./api/friend";
import { roomApi } from "./api/room";
import { messageApi } from "./api/messageApi";
export const { useGetAllChatRoomQuery } = roomApi;
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
  useLikePostMutation,
  useRemoveLikeMutation,
} = postApi;
export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
export const {
  useSendFriendRequestMutation,
  useGetSentFriendRequestQuery,
  useGetFriendRequestQuery,
  useAcceptFriendReqMutation,
  useDeleteSentRequestMutation,
} = friendApi;
export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;
