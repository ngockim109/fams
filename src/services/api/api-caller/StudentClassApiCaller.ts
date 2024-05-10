/**
 * This file contains TypeScript code for managing student data.
 *
 * It includes functions to retrieve all students, post students,
 * retrieve a single student by its ID, post a single student,
 * update a single student, and delete a single student.
 *
 * The code utilizes asynchronous functions with promises and makes HTTP requests
 * using the `get`, `post`, `put`, and `del` methods from an API module. It interfaces
 * with an `IStudentClass` interface to maintain type safety. Additionally, error handling
 * is implemented to log and rethrow any encountered errors.
 */
import { del, get, post, put } from "../api";
import {
  IPartStudentClass,
  IStudentClass,
} from "../../../interfaces/student-class.interface";
import { Endpoints } from "../../../constants/Api";
import { IStudentClassStatus } from "../../../interfaces/student-class-status.interface";

// get all students in specific class
export const getStudentClass = async (
  id: string,
  searchTerm?: string,
  searchSignal?: AbortSignal
): Promise<IStudentClass[]> => {
  try {
    const response = await get<IStudentClass[]>(
      `${Endpoints.StudentListInClass}${id}&searchterm=${searchTerm}`,
      searchSignal
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// get all students
export const getStudentInClass = async (
  classId: string,
  studentId: string
): Promise<IStudentClass[]> => {
  try {
    const response = await get<IStudentClass[]>(
      `${Endpoints.StudentDetailInClass}studentId=${studentId}&classId=${classId}`
    );
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 404) {
      return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// post class students
interface PostStudentClassProps {
  data: IStudentClass[];
}
interface IResponse {
  newData: IStudentClass[];
  message: string;
}
export const postStudentClass = async ({
  data,
}: PostStudentClassProps): Promise<IResponse> => {
  try {
    const response = await post<string>(Endpoints.StudentInClass, data);
    if (response.status === 200) {
      const newData: IStudentClass[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};
interface PutSingleStudentClassStatusProps {
  data: IStudentClassStatus[];
}
interface IStudentClassStatusResponse {
  newData: IStudentClassStatus[];
  message: string;
}
export const putStudentClassStatus = async ({
  data,
}: PutSingleStudentClassStatusProps): Promise<IStudentClassStatusResponse> => {
  try {
    const response = await put<string>(`${Endpoints.StudentClassStatus}`, data);
    if (response.status === 200) {
      const newData: IStudentClassStatus[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

interface DeleteSingleStudentInClassProps {
  id: string;
  classId: string;
}
export const deleteSingleStudentInClass = async ({
  id,
  classId,
}: DeleteSingleStudentInClassProps): Promise<IResponse> => {
  try {
    const response = await del<string>(
      `${Endpoints.StudentToClass}?studentID=${id}&classId=${classId}`
    );
    if (response.status === 200) {
      const newData: IStudentClass[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

// put one student
interface PutSingleStudentInClassProps {
  classId: string;
  studentId: string;
  data: IPartStudentClass;
}
interface IStudentClassPutResponse {
  newData: IPartStudentClass;
  message: string;
}
export const putSingleStudentInClass = async ({
  classId,
  studentId,
  data,
}: PutSingleStudentInClassProps): Promise<IStudentClassPutResponse> => {
  try {
    const response = await put<string>(
      `${Endpoints.StudentToClass}/student-in-class?studentID=${studentId}&classId=${classId}`,
      data
    );
    if (response.status === 200) {
      const newData: IPartStudentClass = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
    throw new Error("Failed to edit student information");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// post one student
interface PostSingleStudentInClassProps {
  data: IStudentClass;
}
interface IStudentClassResponse {
  newData: IStudentClass;
  message: string;
}
export const postSingleStudentInClass = async ({
  data,
}: PostSingleStudentInClassProps): Promise<IStudentClassResponse> => {
  try {
    const response = await post<string>(Endpoints.StudentInClass, data);
    if (response.status === 200) {
      const newData: IStudentClass = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
    throw new Error("Failed to post student to class");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
interface PostSingleStudentToClassProps {
  classId: string;
  studentId: string;
}
interface IResponse {
  newData: IStudentClass[];
  message: string;
}
export const postSingleStudentToClass = async ({
  classId,
  studentId,
}: PostSingleStudentToClassProps): Promise<IResponse> => {
  try {
    const response = await post<string>(
      `${Endpoints.StudentToClass}?studentId=${studentId}&classId=${classId}`,
      {}
    );
    if (response.status === 200) {
      const newData: IStudentClass[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};
