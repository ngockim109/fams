/**
 * This file contains TypeScript code for managing activity logs.
 *
 * It includes functions to retrieve activity logs, both all logs and logs specific to a particular student ID,
 * as well as a function to post a new activity log. The code utilizes asynchronous functions with promises
 * and makes HTTP requests using the `get` and `post` methods from an API module. It interfaces with an `IActivityLog`
 * interface to maintain type safety. Additionally, error handling is implemented to log and rethrow any encountered errors.
 * */
import { Endpoints } from "../../../constants/Api";
import { IActivityLog } from "../../../interfaces/activity-log.interface";
import { get, post } from "../api";

// Function to retrieve all activity logs
export const getActivityLogs = async (): Promise<IActivityLog[]> => {
  try {
    const response = await get<IActivityLog[]>(Endpoints.Email);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// Interface defining properties for retrieving activity logs by student ID
interface GetActivityLogsByStudentIDProps {
  id: string;
}

// Function to retrieve activity logs filtered by student ID
export const getActivityLogsByStudentID = async ({
  id,
}: GetActivityLogsByStudentIDProps): Promise<IActivityLog[]> => {
  try {
    const response = await get<IActivityLog[]>(`${Endpoints.Email}${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// Interface defining properties for posting an activity log
interface PostAnActivityLog {
  data: IActivityLog;
}

// Function to post a new activity log
export const postAnActivityLog = async ({
  data,
}: PostAnActivityLog): Promise<string> => {
  try {
    const response = await post<string>(`${Endpoints.Email}send-email`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "";
};

interface PostActivityLogByClassProps {
  data: IActivityLog;
  classId: string;
}
export const postActivityLogByClass = async ({
  data,
  classId,
}: PostActivityLogByClassProps): Promise<string> => {
  try {
    const response = await post<string>(
      `${Endpoints.EmailSendToClass}?classId=${classId}`,
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

export const postAnActivityLogForTrainer = async ({
  data,
}: PostAnActivityLog): Promise<IActivityLog[]> => {
  try {
    const response = await post<IActivityLog[]>(
      `${Endpoints.Email}send-email-to-trainer`,
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

export const postAnScoreEmail = async ({
  data,
}: PostAnActivityLog): Promise<IActivityLog[]> => {
  try {
    const response = await post<IActivityLog[]>(
      `${Endpoints.Email}send-score-email`,
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
