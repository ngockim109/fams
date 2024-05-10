/**
 * This file contains TypeScript code for managing reserved students.
 *
 * It includes functions to retrieve all reserved students, post reserved students,
 * retrieve a reserved student by its ID, and update a reserved student.
 *
 * The code utilizes asynchronous functions with promises and makes HTTP requests
 * using the `get`, `post`, and `put` methods from an API module. It interfaces
 * with an `IReservedStudent` interface to maintain type safety. Additionally,
 * error handling is implemented to log and rethrow any encountered errors.
 */
import { post, get, put } from "../api";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import { Endpoints } from "../../../constants/Api";

// get all reserved students
export const getReservedStudent = async (
  searchTerm?: string,
  searchSignal?: AbortSignal
): Promise<IReservedStudent[]> => {
  try {
    const response = await get<IReservedStudent[]>(
      `${Endpoints.ReservedStudentSearch}${searchTerm}`,
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

// post reserved students
interface PostReservedStudentProps {
  data: IReservedStudent[];
}
export const postReservedStudent = async ({
  data,
}: PostReservedStudentProps): Promise<IReservedStudent[]> => {
  try {
    const response = await post<IReservedStudent[]>(
      Endpoints.ReservedStudent,
      data
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

// get reserved student by id
interface GetReservedStudentByIDProps {
  id: string;
}
export const getReservedStudentByID = async ({
  id,
}: GetReservedStudentByIDProps): Promise<IReservedStudent[]> => {
  try {
    if (id && id !== "") {
      const response = await get<IReservedStudent[]>(
        `${Endpoints.ReservedStudentInformation}${id}`
      );
      if (response.status === 200) {
        return response.data;
      }
    }
    throw new Error("Failed to fetch reserved student.");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// post new reserved student
interface PostReservedStudentByIDProps {
  data: IReservedStudent;
}
export const postReservedStudentByID = async ({
  data,
}: PostReservedStudentByIDProps): Promise<string> => {
  try {
    const response = await post<string>(Endpoints.ReservedStudent, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};
interface PutSingleReservedStudentProps {
  id: string;
  data: IReservedStudent;
}
// put single reserve student
export const putSingleReserveStudent = async ({
  id,
  data,
}: PutSingleReservedStudentProps): Promise<string> => {
  try {
    const response = await put<string>(
      `${Endpoints.ReservedStudent}${id}`,
      data
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

interface GetAllClassReservedStudentByIDProps {
  id: string;
}
export const getAllClassReservedStudentByID = async ({
  id,
}: GetAllClassReservedStudentByIDProps): Promise<IReservedStudent[]> => {
  try {
    if (id && id !== "") {
      const response = await get<IReservedStudent[]>(
        `${Endpoints.ReservedStudentInformation}${id}`
      );
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

interface PutSingleReservedStudentInClassProps {
  id: string;
  oldClassId: string;
  data: Pick<IReservedStudent, "ClassId" | "Status">;
}
export const putSingleReserveStudentInClass = async ({
  id,
  oldClassId,
  data,
}: PutSingleReservedStudentInClassProps): Promise<string> => {
  try {
    const response = await put<string>(
      `${Endpoints.ReservedStudent}${id}/${oldClassId}`,
      data
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
