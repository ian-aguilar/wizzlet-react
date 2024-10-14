import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { divide } from "lodash";

interface RevenueProfitDonutChartProps {
  startDate: Date;
  endDate: Date;
}

const RevenueProfitDonutChart: React.FC<RevenueProfitDonutChartProps> = ({
  startDate,
  endDate,
}) => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const [ebayProfit, setEbayProfit] = useState<number>(55238); // Initial profit for eBay
  const [amazonProfit, setAmazonProfit] = useState<number>(55238); // Initial profit for Amazon

  // Mock function to fetch data based on date range
  const fetchDataByDateRange = (start: Date, end: Date) => {
    // Implement your logic to fetch or calculate profits based on date range
    setEbayProfit(Math.floor(Math.random() * 100000));
    setAmazonProfit(Math.floor(Math.random() * 100000));
  };

  useEffect(() => {
    // Fetch new data whenever startDate or endDate changes
    fetchDataByDateRange(startDate, endDate);
  }, [startDate, endDate]);

  const data = {
    labels: ["eBay", "Amazon"],
    datasets: [
      {
        data: [ebayProfit, amazonProfit],
        backgroundColor: ["#E1E1E1", "#09A17A"], // Adjust colors as needed
        borderColor: ["#E1E1E130", "#09A17A30"],
        borderWidth: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            size: 16,
            family: "Jost",
          },
        },
      },

      // title: {
      //   display: true,
      //   text: "Revenue & Profit",
      // },
      tooltip: {
        enabled: false, // Disable default tooltips
        // external: (context: any) => {
        //   const { chart, tooltip } = context;
        //   let tooltipEl = document.getElementById("chartjs-tooltip");

        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement("div");
        //     tooltipEl.id = "chartjs-tooltip";
        //     tooltipEl.style.opacity = "0";
        //     tooltipEl.style.position = "absolute";
        //     tooltipEl.style.background = "#fff";
        //     tooltipEl.style.border = "1px solid #ccc";
        //     tooltipEl.style.padding = "8px";
        //     tooltipEl.style.borderRadius = "4px";
        //     tooltipEl.style.pointerEvents = "none";
        //     tooltipEl.style.zIndex = "1000";
        //     document.body.appendChild(tooltipEl);
        //   }

        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = "1";
        //     return;
        //   }

        //   if (tooltip.body) {
        //     const bodyLines = tooltip.body.map((b: any) => b.lines);
        //     const title = tooltip.title || [];

        //     tooltipEl.innerHTML = `
        //       <div style="font-weight: bold;">${title[0]}</div>
        //       <div>Profit: $${bodyLines[0]}</div>
        //     `;
        //   }

        //   const position = chart.canvas.getBoundingClientRect();

        //   tooltipEl.style.opacity = "1";
        //   // tooltipEl.style.left =
        //   //   position.left + window.pageXOffset + tooltip.caretX + "px";
        //   // tooltipEl.style.top =
        //   //   position.top + window.pageYOffset + tooltip.caretY + "px";
        // },
      },
    },
    cutout: "70%",
    radius: "80%",
  };

  return (
    <>
      <div className="flex gap-4 justify-between">
        <p className="font-bold text-base">Marketplace Revenue & Profit</p>
        <div>
          <select
            className="text-black bg-white py-2 lg:px-2 border border-grayText focus:outline-none rounded-md -my-2 cursor-pointer "
            id="month-select"
            // value={}
            // onChange={}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const monthName = new Date(0, i).toLocaleString("en-US", {
                month: "long",
              });
              return (
                <option key={i} value={monthName}>
                  {monthName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full h-full  ">
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Doughnut data={data} options={options} />
          <div className="text-center pt-6 text-grayText text-base">
            <h4>
              eBay Profit:{" "}
              <span className="font-semibold text-blackPrimary">
                ${ebayProfit}
              </span>
            </h4>
            <h4>
              Amazon Profit:{" "}
              <span className="font-semibold text-blackPrimary">
                {" "}
                ${amazonProfit}
              </span>
            </h4>
          </div>
        </div>

        <div id="chartjs-tooltip" style={{ opacity: 0 }}></div>
      </div>
    </>
  );
};

export default RevenueProfitDonutChart;
