import { post } from "../api";
import { ILogin } from "../../../interfaces/login.interface";
import { decodeToken, getUserInfo } from "../../../utils/JWTAuth";
import { Endpoints } from "../../../constants/Api";

interface PostLoginProps {
  data: ILogin[];
}
export const postLogin = async ({
  data,
}: PostLoginProps): Promise<ILogin[]> => {
  try {
    const response = await post<ILogin>(Endpoints.Login, data);
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    decodeToken();
    if (getUserInfo().role === "Admin") {
      window.location.href = "/dashboard";
      return [];
    }
    window.location.href = "/classes";
    return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

interface PostLogoutProps {
  token: string;
}
export const postLogout = async ({
  token,
}: PostLogoutProps): Promise<PostLogoutProps[]> => {
  try {
    const response = await post<PostLogoutProps>(Endpoints.Logout, token);
    if (response.status === 200) {
      localStorage.clear();
      window.location.href = "/login";
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};
