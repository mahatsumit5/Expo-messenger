import { EventEmitter } from "@react-navigation/native";

declare global {
  namespace NodeJS {
    interface Process extends EventEmitter {
      env: {
        EXPO_PUBLIC_BUCKET: string;
        EXPO_PUBLIC_REGION: string;
        EXPO_PUBLIC_ACCESSKEY: string;
        EXPO_PUBLIC_SECRETKEY: string;
      };
    }
  }
}
