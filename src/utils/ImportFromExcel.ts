import ImportStore from "../store/ImportStore";
import { getUserInfo } from "./JWTAuth";

const ImportFromExcel = () => {
  const {
    postStudentImport,
    postStudentClassImport,
    postStudentScoreImport,
    postUserImport,
    loading,
  } = ImportStore();

  const handleExcelStudent = async (file: File) => {
    postStudentImport(file);
    // window.location.reload();
  };

  const handleExcelStudentScore = async (file: File, classId?: string) => {
    const id = classId || "";
    postStudentScoreImport(file, id);
    // window.location.reload();
  };

  const handleExcelStudentClass = async (file: File) => {
    postStudentClassImport(file);
    // window.location.reload();
  };

  const handleExcelUser = async (file: File) => {
    const id = getUserInfo().uid;
    postUserImport(file, id);
    // window.location.reload();
  };

  return {
    handleExcelStudent,
    handleExcelStudentScore,
    handleExcelStudentClass,
    handleExcelUser,
    loading,
  };
};

export default ImportFromExcel;
