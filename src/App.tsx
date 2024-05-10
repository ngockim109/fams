import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";
import { ConfigProvider } from "antd";
import router from "./router";
import antConfig from "../antd-config";
import { checkExpire, getUserInfo } from "./utils/JWTAuth";
import { getUserImage } from "./services/firebase/storage";

const App = () => {
  const userId = getUserInfo().uid;
  useEffect(() => {
    checkExpire();
    const getAvatar = async () => {
      const url = await getUserImage(userId);
      if (url) localStorage.setItem("imgUrl", url);
    };
    getAvatar();
  }, []);

  return (
    <ConfigProvider theme={antConfig}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ConfigProvider>
  );
};

export default App;
