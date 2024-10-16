import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProgressComponentProps } from "../types";

const UserProgressComponent: React.FC<ProgressComponentProps> = ({
  totalUsers,
  onlineUsers,
  offlineUsers,
}) => {
  const percentage = (onlineUsers / totalUsers) * 100;

  return (
    <div
      className="progress-container"
      style={{ width: "200px", textAlign: "center" }}>
      <div style={{ width: "100px", margin: "0 auto" }}>
        <CircularProgressbar
          value={percentage}
          maxValue={totalUsers}
          text={`${totalUsers}`}
          styles={buildStyles({
            pathColor: "#00b894",
            textColor: "#333",
            trailColor: "#dfe6e9",
            backgroundColor: "#00b894",
          })}
        />
      </div>
      <div className="user-stats" style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}>
          <span style={{ color: "#00b894" }}>Online</span>
          <span>{onlineUsers} Users</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}>
          <span style={{ color: "#636e72" }}>Offline</span>
          <span>{offlineUsers} Users</span>
        </div>
      </div>
    </div>
  );
};

export default UserProgressComponent;
