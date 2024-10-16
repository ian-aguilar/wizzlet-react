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
    <>
      <div className="TitleHolder pb-9">
        <h3 className="font-medium text-xl text-blackPrimary ">
          Today’s Users
        </h3>
      </div>
      <div className="progress-container flex gap-10 w-full   items-center">
        <div className="max-w-[190px]">
          <CircularProgressbar
            value={percentage}
            maxValue={totalUsers}
            text={`${totalUsers}`}
            styles={buildStyles({
              pathColor: "#09A17A",
              textColor: "#333",
              trailColor: "#D8DCE4",
              backgroundColor: "#00b894",
            })}
          />
        </div>
        <div className="user-stats w-full ">
          <div className="flex gap-4 font-medium text-grayText pt-6 ">
            <div className="max-w-[12px] rounded-full  bg-[#D8DCE4] w-full ">
              &nbsp;
            </div>
            <div>
              <span>Online</span>
              <div>
                {" "}
                <span className="text-blackPrimary text-2xl ">
                  {" "}
                  {onlineUsers}
                </span>{" "}
                Users
              </div>
            </div>
          </div>
          <div className="flex gap-4 font-medium text-grayText pt-6 ">
            <div className="max-w-[12px] rounded-full  bg-greenPrimary w-full ">
              &nbsp;
            </div>
            <div>
              <span>Online</span>
              <div>
                {" "}
                <span className="text-blackPrimary text-2xl ">
                  {" "}
                  {offlineUsers}
                </span>{" "}
                Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProgressComponent;
