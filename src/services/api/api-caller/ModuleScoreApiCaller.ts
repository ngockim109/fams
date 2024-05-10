/**
 * This file contains TypeScript code for managing module scores.
 *
 * It includes a function to retrieve all module scores.
 * The code utilizes an asynchronous function with promises and makes an HTTP request
 * using the `get` method from an API module. It interfaces with an `IModuleScore` interface
 * to maintain type safety. Additionally, error handling is implemented to log and rethrow any encountered errors.
 */

import { IModuleScore } from "../../../interfaces/module-score";
import { Endpoints } from "../../../constants/Api";
import { get } from "../moduleScoreApi";

// get all modules score
const getModuleScores = async (): Promise<IModuleScore[]> => {
  try {
    const response = await get<IModuleScore[]>(Endpoints.ModuleScore);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};

export default getModuleScores;
