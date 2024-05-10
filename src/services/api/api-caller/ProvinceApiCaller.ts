/**
 * This file contains TypeScript code for retrieving province data.
 *
 * It includes a function to retrieve all provinces.
 * The code utilizes an asynchronous function with promises and makes an HTTP request
 * using the `get` method from an API module. It interfaces with an `IProvince` interface
 * to maintain type safety. Additionally, error handling is implemented to log and rethrow any encountered errors.
 */
import get from "../provinceApi";
import { IProvince } from "../../../interfaces/province.interface";
import { Endpoints } from "../../../constants/Api";

// get all province
const getLocationProvinces = async (): Promise<IProvince[]> => {
  try {
    const response = await get<IProvince[]>(Endpoints.Province);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return [];
};
export default getLocationProvinces;
