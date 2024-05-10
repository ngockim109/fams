import { useEffect } from "react";
import { Empty, Spin } from "antd";
import { useScoreStore } from "../../../store/ScoreStore";
import ScoreInClassesTable from "../ScoreInClassesTable/ScoreInClassesTable";
import EmptyDescription from "../../../constants/EmptyDescription";

interface ScoreInClassesOfStudentProps {
  attendeeID: string;
}
const ScoreInClassesOfStudent = ({
  attendeeID,
}: ScoreInClassesOfStudentProps) => {
  const { fetchAllScoreByStudentId, scoreLoading, studentScore } =
    useScoreStore();
  useEffect(() => {
    fetchAllScoreByStudentId(attendeeID);
  }, [fetchAllScoreByStudentId, attendeeID]);
  // error array
  if (scoreLoading || !studentScore) {
    return (
      <div className="spin-container">
        <Spin data-testid="loading-spinner" />
      </div>
    );
  }
  return studentScore && !scoreLoading && studentScore?.length === 0 ? (
    <Empty description={EmptyDescription.Score} />
  ) : (
    <ScoreInClassesTable scores={studentScore ?? []} loading={scoreLoading} />
  );
};

export default ScoreInClassesOfStudent;
