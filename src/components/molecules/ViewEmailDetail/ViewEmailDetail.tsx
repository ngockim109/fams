import { useEffect, useState } from "react";
import { Switch, Collapse, Checkbox, Spin, Col, Card, Row } from "antd";
import type { CollapseProps } from "antd";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import "./ViewEmailDetail.scss";
import { IEmail } from "../../../interfaces/email.interface";
import { IModuleScore } from "../../../interfaces/module-score";
import useModuleScoreStore from "../../../store/ModuleScoreStore";

interface ViewEmailDetailProps {
  data: IEmail | null;
}
interface Item {
  label: string;
  value: string | number | boolean;
  key: string;
}

const ViewEmailDetail = ({ data }: ViewEmailDetailProps) => {
  const [isShowScore, setIsShowScore] = useState<boolean>(false);
  const { fetchModuleScores, moduleScore, loading } = useModuleScoreStore();

  useEffect(() => {
    if (data?.Type === "Score") {
      fetchModuleScores();
      setIsShowScore(true);
    }
  }, [data, fetchModuleScores]);

  const listLeftItems: Item[] = [
    {
      label: "Email name",
      value: data?.Name || "",
      key: "Name",
    },
    {
      label: "Description",
      value: data?.Description || "",
      key: "Description",
    },
    { label: "Categories", value: data?.Type || "", key: "Categories" },
    { label: "Apply to", value: data?.ApplyTo || "", key: "Apply to" },
  ];
  const listRightItems: Item[] = [
    { label: "Created on", value: data?.CreatedDate || "", key: "Created on" },
    { label: "Created by", value: data?.CreatedBy || "", key: "Created by" },
  ];

  const contentItems: CollapseProps["items"] = [
    {
      key: "Content",
      label: <div className="header-title">Content</div>,
      children: (
        <div className="collapse">
          <div className="item-collapse ">
            <div className="item-collapse-label">Subject</div>
            <div className="item-collapse-content">{data?.Subject}</div>
          </div>

          <div className="item-collapse ">
            <div className="item-collapse-label">Body</div>
            <div dangerouslySetInnerHTML={{ __html: data?.Content ?? "" }} />
          </div>
        </div>
      ),
    },
  ];

  const scoreItems: CollapseProps["items"] = [
    {
      key: "Score",
      label: <div className="header-title">Score</div>,
      children: (
        <div className="collapse score-module">
          <Spin spinning={loading}>
            <div className="template-col">
              <Col>
                <div className="card-item">
                  <Card
                    hoverable
                    className="template-score-card mb-2"
                    title={
                      <Row className="card-title">
                        <Col className="">Module Score</Col>
                      </Row>
                    }
                    bordered={false}
                  >
                    {moduleScore
                      ?.filter(
                        (module: IModuleScore) => module.ModuleName !== "Final"
                      )
                      .map((module: IModuleScore) => (
                        <div key={module.ModuleName} className="item">
                          <div>{module.ModuleName}</div>
                          <Checkbox
                            checked={data?.ModuleScore.includes(
                              module.ModuleName
                            )}
                            className="checkbox"
                          />
                        </div>
                      ))}
                  </Card>
                </div>
              </Col>

              <Col>
                <div className="card-item">
                  <Card
                    hoverable
                    className="template-score-card"
                    title={
                      <Row className="card-title">
                        <Col>Final Score</Col>
                      </Row>
                    }
                    bordered={false}
                  >
                    {moduleScore?.map(
                      (module: IModuleScore) =>
                        module.ModuleName === "Final" &&
                        module.AssignmentNameGroup?.map((score) => (
                          <div key={score.AssignmentName} className="item">
                            <div>{score.AssignmentName}</div>
                            <Checkbox
                              checked={data?.ModuleScore.includes(
                                score.AssignmentName
                              )}
                              className="checkbox"
                            />
                          </div>
                        ))
                    )}
                  </Card>
                </div>
              </Col>
            </div>
          </Spin>
        </div>
      ),
    },
  ];

  return (
    <div className="email-detail">
      <TableHeader
        title="Template details"
        isExport={false}
        isImport={false}
        isSearch={false}
        isHeaderBottom={false}
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <div className="email-detail-header">
        <div className="header-side">
          {listLeftItems.map((item) => (
            <div className="item" key={item.key}>
              <div className="item-label">{item.label}</div>
              <div className="item-content">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="header-side">
          {listRightItems.map((item) => (
            <div className="item" key={item.key}>
              <div className="item-label">{item.label}</div>
              <div className="item-content">{item.value}</div>
            </div>
          ))}
          <div className="item">
            <div className="item-label">Active</div>
            <div className="item-content-switch">
              <Switch value={data?.Status === "Active"} />
            </div>
          </div>
        </div>
        <hr /> <hr />
      </div>
      {[contentItems].map((prop) => (
        <div className="item-detail" key={prop[0].key}>
          <Collapse items={prop} defaultActiveKey="Content" />
        </div>
      ))}
      {isShowScore && (
        <div className="item-detail">
          <Collapse items={scoreItems} defaultActiveKey="Score" />
        </div>
      )}
    </div>
  );
};

export default ViewEmailDetail;
