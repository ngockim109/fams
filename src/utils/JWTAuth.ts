import { jwtDecode } from "jwt-decode";
import { IAccount } from "../interfaces/account.interface";
import { getCompareConvertDate, getCompareCurrentTime } from "./CompareTime";

export const decodeToken = () => {
  let decodedToken;
  const token = localStorage.getItem("token");
  if (token) {
    decodedToken = jwtDecode<IAccount>(token);
  }
  try {
    if (decodedToken) {
      const { exp } = decodedToken;
      const expDate = getCompareConvertDate(exp).toString();
      localStorage.setItem("userInfo", JSON.stringify(decodedToken));
      localStorage.setItem("exp", expDate);
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

export const getUserInfo = (): IAccount => {
  const userInfoString: string | null = localStorage.getItem("userInfo");
  if (!userInfoString) {
    return {} as IAccount;
  }
  const userInfo: IAccount = JSON.parse(userInfoString);
  return userInfo;
};

export const Authenticate = () => {
  const token = localStorage.getItem("token");
  const userRole = getUserInfo().role;
  if (token) {
    if (userRole === "Admin") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/classes";
    }
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const checkExpire = () => {
  const expItem = localStorage.getItem("exp");
  const currentTime = getCompareCurrentTime();
  if (expItem !== null && expItem < currentTime) {
    localStorage.clear();
    window.location.href = "/";
  }
};

// check if the user is authorized based on roles
export const isAuthorized = (requiredRoles: string[]): boolean => {
  const token = localStorage.getItem("token");
  const user = getUserInfo();
  if (token && user) {
    const userRole = user.role;
    return requiredRoles.includes(userRole);
  }
  return false;
};
