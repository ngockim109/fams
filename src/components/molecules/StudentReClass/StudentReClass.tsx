import { IClass } from "../../../interfaces/class.interface";
import "./StudentReClass.scss";

interface StudentReClassProps {
  classInfo: IClass | null;
}

const StudentReClass = ({ classInfo }: StudentReClassProps) => (
  <div className="re-class-modal">
    <div className="re-class-title subtitle1-bold">Class Information</div>
    <div className="item">
      <div className="item-title subtitle2">Class name</div>
      <div className="item-content">{classInfo?.ClassName}</div>
    </div>
    <div className="item">
      <div className="item-title subtitle2">Class code</div>
      <div className="item-content">{classInfo?.Id} </div>
    </div>
    <div className="item">
      <div className="item-title subtitle2">Class time</div>
      <div className="item-content">
        {classInfo?.StartDate}
        <strong>{" -> "}</strong>
        {classInfo?.EndDate}
      </div>
    </div>
  </div>
);

export default StudentReClass;
