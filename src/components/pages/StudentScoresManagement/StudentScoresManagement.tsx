import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useScoreStore } from "../../../store/ScoreStore";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import ScoresTable from "../../templates/ScoresTable/ScoresTable";
import ImportFromExcel from "../../../utils/ImportFromExcel";
import ExcelTemplates from "../../../constants/ExcelTemplates";
import { getUserInfo } from "../../../utils/JWTAuth";

interface StudentScoresManagementProps {}

const StudentScoresManagement: React.FC<StudentScoresManagementProps> = () => {
  const { id } = useParams();
  const { handleExcelStudentScore } = ImportFromExcel();
  const { fetchScore, score, scoreLoading } = useScoreStore();
  const [isExport, setIsExport] = useState<boolean>(false);
  const [searchSignal, setSearchSignal] = useState<AbortSignal | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const exportData = useCallback(() => {
    setIsExport(true);
  }, []);

  const completedExport = useCallback(() => {
    setIsExport(false);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    fetchScore(id ?? "", searchTerm, searchSignal);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id, fetchScore, searchTerm, searchSignal]);

  return (
    <div className="table-container">
      <TableHeader
        title="Score List"
        href={ExcelTemplates.StudentScore}
        fileDownload="Student Score Import Template"
        excelUpload={handleExcelStudentScore}
        importId={id}
        exportData={exportData}
        setSearchSignal={setSearchSignal}
        setSearchTerm={setSearchTerm}
        isImport={getUserInfo().role === "Admin"}
      />
      <div className="table-container__content">
        <ScoresTable
          scores={score ?? []}
          loading={scoreLoading}
          isExport={isExport}
          completedExport={completedExport}
          classId={id ?? ""}
        />
      </div>
    </div>
  );
};

export default StudentScoresManagement;
