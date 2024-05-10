import { MdOutlineEmail } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import "./TemplateDashboard.scss";
import { SiGoogleclassroom } from "react-icons/si";
import { FiUser } from "react-icons/fi";
import { Spin } from "antd";
import { useEffect } from "react";
import DashboardTag from "../../atoms/DashboardTag/DashboardTag";
import Sizes from "../../../constants/Sizes";
import TableRanking from "../../molecules/TableRanking/TableRanking";
import StudentChart from "../../molecules/StudentChart/StudentChart";
import GenderChart from "../../molecules/GenderChart/GenderChart";
import ResultChart from "../../molecules/ResultChart/ResultChart";
import EmailChart from "../../molecules/EmailChart/EmailChart";
import useDashboardStore from "../../../store/DashboardStore";
import StatusStudentChart from "../../molecules/StatusStudentChart/StatusStudentChart";

const TemplateDashboard = () => {
  const { dashboard, fetchDashboard, loading } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);
  if (loading || !dashboard) {
    return (
      <div data-testid="loading-spinner" className="centered">
        <Spin />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="title-tag-group heading-h4">
        <div className="bottom-tag">Overview</div>
      </div>
      <div className="dashboard-header">
        {/* <div className="wrapper-tag-first" /> */}
        <div className="wrapper-group-tag">
          <div className="wrapper-tag">
            <DashboardTag
              title="user"
              content={dashboard?.TotalUser ?? 0}
              unit="persons"
              icon={<FiUser size={Sizes.LgMedium} />}
            />
          </div>
          <div className="wrapper-tag">
            <DashboardTag
              title="class"
              content={dashboard?.TotalClass ?? 0}
              unit="classes"
              icon={<SiGoogleclassroom size={Sizes.LgMedium} />}
            />
          </div>
          <div className="wrapper-tag">
            <DashboardTag
              title="student"
              content={dashboard?.TotalStudent ?? 0}
              unit="persons"
              icon={<PiStudentLight size={Sizes.LgMedium} />}
            />
          </div>
          <div className="wrapper-tag">
            <DashboardTag
              title="Email template"
              content={dashboard?.TotalEmailTemplate ?? 0}
              unit="emails"
              icon={<MdOutlineEmail size={Sizes.LgMedium} />}
            />
          </div>
        </div>
        <StudentChart dashboard={dashboard} />
        <div className="wrapper-table-ranking">
          <TableRanking dashboard={dashboard} />
        </div>
      </div>
      <div className="middle-dashboard">
        <div className="wrapper-pie-chart">
          <div className="pie-chart gender-chart">
            <div className="title-header">Gender</div>
            <div className="wrapper-gender">
              <GenderChart
                totalMale={dashboard?.TotalStudentMale ?? 0}
                totalStudent={dashboard?.TotalStudent ?? 0}
              />
            </div>
          </div>
          <div className="pie-chart gender-chart">
            <div className="title-header">Status</div>
            <div className="wrapper-gender">
              <StatusStudentChart
                totalStudent={dashboard?.TotalStudent ?? 0}
                totalStudentReserve={dashboard?.TotalStudentReserve ?? 0}
                totalStudentDropOut={dashboard?.TotalStudentDropOut ?? 0}
                totalStudentFinished={dashboard?.TotalStudentFinished ?? 0}
              />
            </div>
          </div>
          <div className="pie-chart gender-chart">
            <div className="title-header">Result</div>
            <div className="wrapper-gender">
              <ResultChart
                totalPass={dashboard?.TotalStudentPass ?? 0}
                totalFail={dashboard?.TotalStudentFail ?? 0}
              />
            </div>
          </div>
          <div className="pie-chart ">
            <div className="title-header">Email Template</div>
            <div className="wrapper-gender">
              <EmailChart
                totalEmailTemplate={dashboard?.TotalEmailTemplate ?? 0}
                totalEmailReserve={dashboard?.TotalEmailReserve ?? 0}
                totalEmailRemind={dashboard?.TotalEmailRemind ?? 0}
                totalEmailNotice={dashboard?.TotalEmailNotice ?? 0}
                totalEmailScore={dashboard?.TotalEmailScore ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDashboard;
