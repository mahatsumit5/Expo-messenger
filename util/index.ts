import { ErrorAlert } from "@/lib/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    ErrorAlert(e);
  }
};
export const getToken = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    ErrorAlert(e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.clear((err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  } catch (error) {
    ErrorAlert(error);
  }
};
