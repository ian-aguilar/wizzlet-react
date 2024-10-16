import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CategoriesProgressProps } from "../types";

const CategoriesProgress: React.FC<CategoriesProgressProps> = ({
  categoryPercentage,
  subCategoryPercentage,
  categoriesUsed,
  subCategoriesUsed,
}) => {
  return (
    <>
      <div className="headerText flex justify-between pb-14 items-center">
        <h3 className="text-xl font-medium text-blackPrimary ">Categories</h3>
      </div>
      <div className="categories-progress-container flex gap-14 px-10 pb-5 mb-5 border-b border-grayLightBody/30  ">
        {/* Categories Used */}
        <div className="category-item" style={{ textAlign: "center" }}>
          <div className="w-full h-auto max-w-[80%] mx-auto">
            <CircularProgressbar
              value={categoryPercentage}
              text={`${categoryPercentage}%`}
              styles={buildStyles({
                pathColor: "#09A17A",
                textColor: "#333",
                trailColor: "#D8DCE4",
                backgroundColor: "#00b894",
              })}
            />
          </div>
          <div className="category-info text-base font-medium pt-4">
            <p className=" text-grayText">Categories Used</p>
            <h3 className="text-blackPrimary font-semibold">
              {categoriesUsed.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Sub Categories Used */}
        <div className="category-item" style={{ textAlign: "center" }}>
          <div className="w-full h-auto  max-w-[80%] mx-auto">
            <CircularProgressbar
              value={subCategoryPercentage}
              text={`${subCategoryPercentage}%`}
              styles={buildStyles({
                pathColor: "#09A17A",
                textColor: "#333",
                trailColor: "#D8DCE4",
                backgroundColor: "#00b894",
              })}
            />
          </div>
          <div className="category-info  text-base font-medium pt-4">
            <p className=" text-grayText">Sub Categories Used</p>
            <h3 className="text-blackPrimary font-semibold">
              {subCategoriesUsed.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesProgress;
