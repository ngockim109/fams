import { IDashboard } from "../../../interfaces/dashboard.interface";
import { get } from "../dashboardApi";

const GetAllDataDashboard = async (): Promise<IDashboard | null> => {
  try {
    const response = await get<IDashboard>(`dashboard/1`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return null;
};
export default GetAllDataDashboard;
