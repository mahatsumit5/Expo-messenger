export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
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
