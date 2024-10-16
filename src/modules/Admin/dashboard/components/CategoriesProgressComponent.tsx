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
    <div
      className="categories-progress-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "400px",
        margin: "0 auto",
      }}>
      {/* Categories Used */}
      <div className="category-item" style={{ textAlign: "center" }}>
        <div style={{ width: "100px", margin: "0 auto" }}>
          <CircularProgressbar
            value={categoryPercentage}
            text={`${categoryPercentage}%`}
            styles={buildStyles({
              pathColor: "#00b894",
              textColor: "#333",
              trailColor: "#dfe6e9",
              backgroundColor: "#00b894",
            })}
          />
        </div>
        <div className="category-info">
          <p style={{ marginTop: "10px", color: "#636e72" }}>Categories Used</p>
          <h3 style={{ margin: "5px 0" }}>{categoriesUsed.toLocaleString()}</h3>
        </div>
      </div>

      {/* Sub Categories Used */}
      <div className="category-item" style={{ textAlign: "center" }}>
        <div style={{ width: "100px", margin: "0 auto" }}>
          <CircularProgressbar
            value={subCategoryPercentage}
            text={`${subCategoryPercentage}%`}
            styles={buildStyles({
              pathColor: "#00b894",
              textColor: "#333",
              trailColor: "#dfe6e9",
              backgroundColor: "#00b894",
            })}
          />
        </div>
        <div className="category-info">
          <p style={{ marginTop: "10px", color: "#636e72" }}>
            Sub Categories Used
          </p>
          <h3 style={{ margin: "5px 0" }}>
            {subCategoriesUsed.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoriesProgress;
