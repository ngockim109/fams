/* eslint-disable import/prefer-default-export */
import post from "../apiImport";
import { Endpoints } from "../../../constants/Api";

export const postStudentImport = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await post<string>(Endpoints.StudentImport, formData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

export const postStudentClassImport = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await post<string>(Endpoints.StudentClassImport, formData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

export const postStudentScoreImport = async (
  file: File,
  classId: string
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await post<string>(
      `${Endpoints.StudentScoreImport}${classId}`,
      formData
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

export const postUserImport = async (
  file: File,
  senderId: string
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await post<string>(
      `${Endpoints.UserImport}${senderId}`,
      formData
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};
