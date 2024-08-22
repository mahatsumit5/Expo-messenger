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
