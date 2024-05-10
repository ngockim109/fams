/**
 * This file contains TypeScript code for managing student scores.
 *
 * It includes functions to retrieve all scores of all students, post scores,
 * retrieve all scores of a single student, post new scores of a student,
 * and update scores of a student.
 *
 * The code utilizes asynchronous functions with promises and makes HTTP requests
 * using the `get`, `post`, and `put` methods from an API module. It interfaces
 * with an `IScore` interface to maintain type safety. Additionally, error handling
 * is implemented to log and rethrow any encountered errors.
 */
import { get, post, put } from "../api";
import { IScore } from "../../../interfaces/score.interface";
import { Endpoints } from "../../../constants/Api";
import { IStudentScore } from "../../../interfaces/student-score.interface";
import { IModuleAssignmentScore } from "../../../interfaces/module-assignment-score.interface";

// get all scores of all students
export const getScores = async (
  id: string,
  searchTerm?: string,
  searchSignal?: AbortSignal
): Promise<IScore[]> => {
  try {
    const response = await get<IScore[]>(
      `${Endpoints.ScoreInClass}${id}&searchTerm=${searchTerm}`,
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
// get all scores of all students
export const getScoresOfStudentInClass = async (
  classId: string,
  studentId: string
): Promise<IModuleAssignmentScore[]> => {
  try {
    const response = await get<IModuleAssignmentScore[]>(
      `${Endpoints.ScoreOfStudentInClass}classId=${classId}&studentId=${studentId}`
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
// get all scores of 1 students
export const getScoresByStudentId = async (
  id: string
): Promise<IStudentScore[]> => {
  try {
    const response = await get<IStudentScore[]>(Endpoints.ScoreAllClass + id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

// post scores
interface PostScoreProps {
  data: IScore[];
}
interface IResponse {
  newData: IScore[];
  message: string;
}
export const postScore = async ({
  data,
}: PostScoreProps): Promise<IResponse> => {
  try {
    const response = await post<string>(Endpoints.Score, data);
    if (response.status === 200) {
      const newData: IScore[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

// get all scores of 1 students
interface GetScoreByIDProps {
  id: string;
  classId: string;
}
export const getScoreByID = async ({
  id,
  classId,
}: GetScoreByIDProps): Promise<IScore[]> => {
  try {
    const response = await get<IScore[]>(
      `${Endpoints.ScoreOfStudentInClass}studentId=${id}&classId=${classId}`
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

// post new scores of student
interface PostStudentScoreProps {
  data: IScore;
}
export const postStudentScore = async ({
  data,
}: PostStudentScoreProps): Promise<IResponse> => {
  try {
    const response = await post<string>(Endpoints.Score, data);
    if (response.status === 200) {
      const newData: IScore[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};

interface PutScoreProps {
  data: IScore;
  id: string;
}
export const putScore = async ({
  data,
  id,
}: PutScoreProps): Promise<IResponse> => {
  try {
    const response = await put<string>(`${Endpoints.Score}${id}`, data);
    if (response.status === 200) {
      const newData: IScore[] = response.config.data;
      const message: string = response.data;
      return { newData, message };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { newData: [], message: "" };
};
