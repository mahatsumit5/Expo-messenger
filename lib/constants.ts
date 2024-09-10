import { ImagePickerAsset } from "expo-image-picker";

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(240 20% 92%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(226 100% 50%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 17% 26%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 25% 15.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(226 100% 70%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export const emptyTitle: Record<
  (typeof tabs)[number],
  { title: string; subtitle: string }
> = {
  Request: { title: "You do not have any friend request.", subtitle: "" },
  Friends: {
    title: "No friends available",
    subtitle: "Please try gain later",
  },
  "Sent Request": {
    title: "No request sent",
    subtitle: "",
  },
  allUsers: {
    title: "No users found",
    subtitle: "Try again later",
  },
} as const;

export const tabs = ["Friends", "Request", "Sent Request", "allUsers"] as const;
export const initialState: {
  images: ImagePickerAsset[];
  title: string;
  content: string;
} = {
  images: [],
  title: "",
  content: "",
};
