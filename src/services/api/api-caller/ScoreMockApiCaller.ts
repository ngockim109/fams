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
import { get, put } from "../mockScoreApi";
import { IScore } from "../../../interfaces/score.interface";
import { Endpoints } from "../../../constants/Api";

interface IResponse {
  newData: IScore[];
  message: string;
}
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
