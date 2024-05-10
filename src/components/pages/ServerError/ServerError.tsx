import React from "react";
import { Button, Result } from "antd";

const ServerError: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Button href="/" type="primary">
        Back Home
      </Button>
    }
  />
);

export default ServerError;
