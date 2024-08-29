declare interface ServerResponse {
  status: boolean;
  message: string;
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

declare interface IComment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  author: {
    id: string;
    email: string;
    fName: string;
    lName: string;
    profile: string | null; // assuming profile is a string or null
  };
  likes: string[]; // array of like IDs or identifiers (assuming likes are identified by strings)
}
