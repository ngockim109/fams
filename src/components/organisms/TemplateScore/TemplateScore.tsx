/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Form, Checkbox, Col, Spin, Divider, Card, Row } from "antd";
import TableHeader from "../TableHeader/TableHeader";
import useModuleScoreStore from "../../../store/ModuleScoreStore";
import "./TemplateScore.scss";

interface TemplateScoreProps {
  onModuleScoresChange: (ModuleScores: string[]) => void;
  moduleScores: string[];
}

const TemplateScore: React.FC<TemplateScoreProps> = ({
  onModuleScoresChange,
  moduleScores,
}) => {
  const formItemLayout = {
    labelCol: {
      lg: { span: 13 },
      md: { span: 10 },
      sm: { span: 10 },
      xs: { span: 12 },
    },
  };

  const colTitleLayout = {
    lg: { span: 13 },
    md: { span: 10 },
    sm: { span: 10 },
    xs: { span: 12 },
  };

  const colLayout = {
    lg: { span: 11 },
    md: { span: 24 },
    sm: { span: 24 },
    xs: { span: 24 },
  };

  const { fetchModuleScores, moduleScore, loading } = useModuleScoreStore();
  const [selectedModuleScores, setSelectedModuleScores] = useState<string[]>(
    []
  );

  // Use store
  useEffect(() => {
    fetchModuleScores();
  }, []);

  useEffect(() => {
    setSelectedModuleScores(moduleScores);
  }, [moduleScores]);

  // Handle module scores to array
  const handleModuleScoreChange = (scoreName: string) => {
    setSelectedModuleScores((prevScores: string[]) => {
      const newScores = prevScores.includes(scoreName)
        ? prevScores.filter((score: string) => score !== scoreName)
        : [...prevScores, scoreName];

      // Call onModuleScoresChange with the latest scores
      onModuleScoresChange(newScores);
      return newScores;
    });
  };

  return (
    <div>
      <TableHeader
        isHeaderBottom={false}
        title="Scores"
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <div className="mt-2">
        <div className="template-module-score">
          <h2>Choose module scores you want to send</h2>
        </div>
        <Divider />
      </div>
      <Spin spinning={loading}>
        <div className="template-score-col">
          <Col {...colLayout}>
            <Card
              hoverable
              className="template-score-card mb-2"
              title={
                <Row>
                  <Col {...colTitleLayout}>Module Score</Col>
                  <Col>{/* <Checkbox>Apply all</Checkbox> */}</Col>
                </Row>
              }
              bordered={false}
            >
              {moduleScore
                ?.filter((module) => module.ModuleName !== "Final")
                .map((module) => (
                  <Form.Item
                    {...formItemLayout}
                    key={module.ModuleName}
                    label={module.ModuleName}
                    valuePropName="checked"
                  >
                    <Checkbox
                      onChange={() =>
                        handleModuleScoreChange(module.ModuleName)
                      }
                      checked={selectedModuleScores.includes(module.ModuleName)}
                    />
                  </Form.Item>
                ))}
            </Card>
          </Col>

          <Col {...colLayout}>
            <Card
              hoverable
              className="template-score-card"
              title={
                <Row>
                  <Col {...colTitleLayout}>Final Score</Col>
                  <Col>{/* <Checkbox>Apply all</Checkbox> */}</Col>
                </Row>
              }
              bordered={false}
            >
              {moduleScore?.map(
                (module) =>
                  module.ModuleName === "Final" &&
                  module.AssignmentNameGroup?.map((score) => (
                    <Form.Item
                      {...formItemLayout}
                      key={score.AssignmentName}
                      label={score.AssignmentName}
                      valuePropName="checked"
                    >
                      <Checkbox
                        onChange={() =>
                          handleModuleScoreChange(score.AssignmentName)
                        }
                        checked={selectedModuleScores.includes(
                          score.AssignmentName
                        )}
                      />
                    </Form.Item>
                  ))
              )}
            </Card>
          </Col>
        </div>
      </Spin>
    </div>
  );
};

export default TemplateScore;
