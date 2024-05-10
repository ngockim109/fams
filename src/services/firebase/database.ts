import { ref, child, get, set } from "firebase/database";
import { database } from "./firebaseConfig";
import {
  errorNotify,
  successNotify,
} from "../../components/atoms/Notify/Notify";
import { generateSuccessMessage } from "../../utils/GenerateErrorMessage";

export const dbRef = ref(database);

export const getUserFirebase = async (userId: string) => {
  await get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const setUserFirebase = async (userId: string, imgUrl: string) => {
  await set(child(dbRef, `users/${userId}`), {
    imgUrl: `${imgUrl}`,
  })
    .then(() => {
      successNotify(generateSuccessMessage("has been added", "The image"));
    })
    .catch((error) => {
      errorNotify(error.response.data);
    });
};
