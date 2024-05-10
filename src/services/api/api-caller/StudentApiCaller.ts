/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This file contains TypeScript code for managing student data.
 *
 * It includes functions to retrieve all students, post students,
 * retrieve a single student by its ID, post a single student,
 * update a single student, and delete a single student.
 *
 * The code utilizes asynchronous functions with promises and makes HTTP requests
 * using the `get`, `post`, `put`, and `del` methods from an API module. It interfaces
 * with an `IStudent` interface to maintain type safety. Additionally, error handling
 * is implemented to log and rethrow any encountered errors.
 */
import { del, get, post, put } from "../api";
import { IStudent } from "../../../interfaces/student.interface";
import { Endpoints } from "../../../constants/Api";

// get all students
export const getStudents = async (
  searchTerm: string,
  searchSignal?: AbortSignal
): Promise<IStudent[]> => {
  try {
    const response = await get<IStudent[]>(
      `${Endpoints.StudentSearch}${searchTerm}`,
      searchSignal
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error === 404) {
      return [];
    }
    throw error;
  }
  return [];
};

// post students
interface PostStudentProps {
  data: IStudent[];
}
export const postStudent = async ({
  data,
}: PostStudentProps): Promise<IResponse> => {
  try {
    const response = await post<any>(Endpoints.Student, data);
    if (response.status === 200) {
      // const newData: IStudent[] = response.config.data;
      const newData: IStudent[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

// get one student
interface GetStudentByIDProps {
  id: string;
}
export const getStudentByID = async ({
  id,
}: GetStudentByIDProps): Promise<IStudent[]> => {
  try {
    if (id && id !== "") {
      const response = await get<IStudent[]>(`${Endpoints.Student}${id}`);
      if (response.status === 200) {
        return response.data;
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// post one student
interface PostSingleStudentProps {
  data: IStudent;
}
interface IResponse {
  newData: IStudent[];
  message: string;
}

export const postSingleStudent = async ({
  data,
}: PostSingleStudentProps): Promise<IResponse> => {
  try {
    const response = await post<any>(Endpoints.Student, data);
    if (response.status === 200) {
      const newData: IStudent[] = response.data.StudentDTO;
      const message: string = response.data.Message;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};
// put one student
interface PutSingleStudentProps {
  id: string;
  data: IStudent;
}
export const putSingleStudent = async ({
  id,
  data,
}: PutSingleStudentProps): Promise<IResponse> => {
  try {
    const response = await put<string>(`${Endpoints.Student}${id}`, data);
    if (response.status === 200) {
      const newData: IStudent[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

// Delete one student
interface DeleteSingleStudentProps {
  id: string;
}
export const deleteSingleStudent = async ({
  id,
}: DeleteSingleStudentProps): Promise<IResponse> => {
  try {
    const response = await del<string>(`${Endpoints.Student}${id}`);
    if (response.status === 200) {
      const newData: IStudent[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};
