/* eslint-disable import/prefer-default-export */
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const getUserImage = async (userId: string): Promise<string> => {
  try {
    const url = await getDownloadURL(ref(storage, `images/${userId}`));
    return url;
  } catch (error) {
    console.log("Error getting download URL:", error);
    return "";
  }
};
