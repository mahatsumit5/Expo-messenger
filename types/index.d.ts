declare interface ServerResponse {
  status: boolean;
  message: string;
}
declare interface IFriendReq {
  status: string;
  from: IUser;
  to: IUser;
}
declare interface IMessage {
  id: string;
  content: string;
  createdAt: Date;
  isSeen: boolean;
  chatRoomId: string;
  author: string;
}
declare interface IChatRoom {
  id: string;
  userId: string;
  fName: string;
  lName: string;
  profile: string | null;
  email: string;
  isActive: boolean;
  lastMessage: string;
  isLastMessageSeen: boolean;
  lastmessageAuthor: string;
  unSeenMessageCount: number;
}
declare interface IUser {
  id: string;
  fName: string;
  lName: string;
  profile: string | null;
  email: string;
  isActive: boolean;
  bio: string;
  coverPicture: string | null;
}
declare interface IPost {
  id: string;
  title: string;
  content: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
  likes: ILikedPost[];
  images: string[];
  comments: { id: string }[];
  _count: {
    comments: number;
  };
}
declare interface ILikedPost {
  id: string;
  postId: string;
  userId: string;
}

declare interface IComment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  author: IUser;
  likes: string[];
  // array of like IDs or identifiers (assuming likes are identified by strings)
}
