import React from "react";
import { Tooltip } from "antd";
import "./Badge.scss";

interface BadgeProps {
  color: string;
  tooltip: string;
}

const Badge: React.FC<BadgeProps> = ({ color, tooltip }) => (
  <Tooltip title={tooltip}>
    <div
      style={{
        backgroundColor: color,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        position: "absolute",
        top: "10px",
        right: "10px",
      }}
      data-testid="badge"
    />
  </Tooltip>
);

export default Badge;
