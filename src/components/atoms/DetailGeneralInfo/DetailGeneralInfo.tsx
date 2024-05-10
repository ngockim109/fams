/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./DetailGeneralInfo.scss";

interface StudentDetailGeneralInfoProps {
  infos: Array<{
    key: string;
    children: Array<{
      key: string;
      children: Array<{
        key: string;
        name: any;
      }>;
    }>;
  }>;
}

const DetailGeneralInfo: React.FC<StudentDetailGeneralInfoProps> = ({
  infos,
}) => (
  <div data-testid="general-info-content" className="student-detail-container">
    {/* General Information content */}
    <div className="info-container">
      {infos?.map((info) => (
        <div
          key={info.key}
          data-testid={`info-container-${info.key}`}
          className={`info-container-${info.key}`}
        >
          {info.children.map((child) => (
            <div
              key={child.key}
              data-testid={`column-${child.key}`}
              className={`column-${child.key}`}
            >
              {child.children.map((item) => (
                <div key={item.key} className="info-item">
                  {item.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default DetailGeneralInfo;
