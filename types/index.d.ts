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
