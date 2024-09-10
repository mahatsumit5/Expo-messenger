import { clsx, type ClassValue } from "clsx";
import { Alert } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const extractInitial = (fName: string, lName: string): string => {
  return fName.slice(0, 1).toUpperCase() + lName.slice(0, 1).toUpperCase();
};

export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    case diffInDays >= 1 && diffInDays <= 7:
      return `${Math.floor(diffInDays)} days ago`;
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const ErrorAlert = (error: unknown) => {
  if (error instanceof Error) {
    Alert.alert("error", error.message);
  } else {
    throw new Error("Unknown error occured");
  }
};

export function doesItemExistInCache(
  cacheData: IUser[],
  incomingData: IUser[]
): boolean {
  // Create a Set of IDs from the cache data for fast lookup
  const cacheIds = new Set(cacheData.map((user) => user.id));

  // Check if any incoming data ID exists in the cache IDs
  return incomingData.some((user) => cacheIds.has(user.id));
}
