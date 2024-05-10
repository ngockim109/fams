/**
 * This file contains TypeScript code for managing class data.
 *
 * It includes functions to retrieve all classes, retrieve a class by its ID,
 * update a class by its ID, and retrieve classes by their name.
 * The code utilizes asynchronous functions with promises
 * and makes HTTP requests using the `get` and `put` methods from an API module.
 * It interfaces with an `IClass` interface to maintain type safety.
 * Additionally, error handling is implemented to log and rethrow any encountered errors.
 */
import { get, put } from "../api";
import { IClass } from "../../../interfaces/class.interface";
import { Endpoints } from "../../../constants/Api";

// get all class
export const getClass = async (): Promise<IClass[]> => {
  try {
    const response = await get<IClass[]>(Endpoints.Class);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// get class by id
interface GetClassByIDProps {
  id: string;
}
export const getClassByID = async ({
  id,
}: GetClassByIDProps): Promise<IClass | null> => {
  try {
    const response = await get<IClass>(`${Endpoints.Class}${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return null;
};

// put class by id
interface PutSingleClassProps {
  id: string;
  classdata: IClass;
}
export const putClassByID = async ({
  id,
  classdata,
}: PutSingleClassProps): Promise<IClass[]> => {
  try {
    const response = await put<IClass[]>(`${Endpoints.Class}${id}`, classdata);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// get class by status
type GetClassesByNameProps = {
  className: string;
  studentId: string;
};
export const getClassesByName = async ({
  className,
  studentId,
}: GetClassesByNameProps): Promise<IClass[]> => {
  try {
    const response = await get<IClass[]>(
      `${Endpoints.ReservedStudent}${studentId}/${className}`
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
