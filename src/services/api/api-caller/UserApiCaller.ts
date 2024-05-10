/**
 * This file contains TypeScript code for managing user data.
 *
 * It includes functions to retrieve all users, post users,
 * retrieve a single user by its ID or email, post a single user,
 * update a single user, and delete a single user.
 *
 * The code utilizes asynchronous functions with promises and makes HTTP requests
 * using the `get`, `post`, `put`, and `del` methods from an API module. It interfaces
 * with an `IUser` interface to maintain type safety. Additionally, error handling
 * is implemented to log and rethrow any encountered errors.
 */
import { Endpoints } from "../../../constants/Api";
import { IUser } from "../../../interfaces/user.interface";
import { get, post, del, patch } from "../api";

// get all users
export const getUsers = async (
  searchTerm?: string,
  searchSignal?: AbortSignal
): Promise<IUser[]> => {
  try {
    const response = await get<IUser[]>(
      `${Endpoints.UserSearch}${searchTerm}`,
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

// post users
interface PostUserProps {
  data: IUser[];
}
export const postUser = async ({ data }: PostUserProps): Promise<IUser[]> => {
  try {
    const response = await post<IUser[]>(Endpoints.User, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

interface GetUsersByIdProps {
  id: string;
}
// get a user by Id
export const getUsersById = async ({
  id,
}: GetUsersByIdProps): Promise<IUser[]> => {
  try {
    const response = await get<IUser[]>(`${Endpoints.User}${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};
interface GetUserByEmailProps {
  email: string;
}
// get user by Email
export const getUserByEmail = async ({
  email,
}: GetUserByEmailProps): Promise<IUser[]> => {
  try {
    const response = await get<IUser[]>(`${Endpoints.User}?Email=${email}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

interface PostSingleUserProps {
  data: IUser;
}

// post a user
interface IResponse {
  newData: IUser[];
  message: string;
}
export const postSingleUser = async ({
  data,
}: PostSingleUserProps): Promise<IResponse> => {
  try {
    const response = await post<string>(Endpoints.User, data);
    if (response.status === 200) {
      const newData: IUser[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

interface PutSingleUserProps {
  id: string;
  data: { path: string; value: string | boolean; op: string }[];
}

// put a user
export const patchSingleUser = async ({
  id,
  data,
}: PutSingleUserProps): Promise<IResponse> => {
  try {
    const response = await patch<string>(`${Endpoints.User}${id}`, data);
    if (response.status === 200) {
      const newData: IUser[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

interface DeleteSingleUserProps {
  id: string;
}
// delete single user
export const deleteSingleUser = async ({
  id,
}: DeleteSingleUserProps): Promise<IResponse> => {
  try {
    const response = await del<string>(`${Endpoints.User}${id}`);
    if (response.status === 200) {
      const newData: IUser[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};
