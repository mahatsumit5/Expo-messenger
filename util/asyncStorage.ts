import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw new Error();
  }
};
export const getToken = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw new Error();
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
    throw new Error();
  }
};
