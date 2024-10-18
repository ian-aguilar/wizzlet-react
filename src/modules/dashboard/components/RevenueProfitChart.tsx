import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { RevenueProfitChartProps } from "../types";
import { getRevenueAndLabels } from "../helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueProfitChart: React.FC<RevenueProfitChartProps> = ({
  startDate,
  endDate,
  totalRevenue,
  data,
  selectedMarketplace,
}) => {
  useEffect(() => {
    const createCustomTooltip = () => {
      const tooltipEl = document.getElementById("chartjs-tooltip");
      if (!tooltipEl) {
        const tooltip = document.createElement("div");
        tooltip.id = "chartjs-tooltip";
        tooltip.innerHTML = "<table></table>";
        document.body.appendChild(tooltip);
      }
    };
    createCustomTooltip();
  }, []);

  // Dynamically generate chart data based on selected month or date range
  const getDynamicData = () => {
    const selectedMarketplaceIds =
      selectedMarketplace?.map((item) => Number(item?.value)) || [];
    const { revenues, labels } = getRevenueAndLabels(
      data,
      startDate?.toLocaleDateString("en-CA") as string,
      endDate?.toLocaleDateString("en-CA") as string,
      selectedMarketplaceIds.length > 0 ? selectedMarketplaceIds : undefined
    );

    const getGradient = (ctx, chartArea) => {
      const gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0.9, "rgba(9, 161, 122, 0.20)");
      gradient.addColorStop(0.1, "transparent");
      return gradient;
    };

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenues,
          borderColor: "#09A17A",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          pointBackgroundColor: "rgba(9, 161, 122, 1)",
          fill: true,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            // This case happens on initial chart load
            if (!chartArea) return;
            return getGradient(ctx, chartArea);
          },
        },
        // {
        //   label: "Profit",
        //   data: profitData,
        //   borderColor: "#6C778B",
        //   backgroundColor: "rgba(54, 162, 235,  0)",
        //   tension: 0.4,
        //   pointBackgroundColor: "#6C778B",
        //   fill: true,
        // },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
      tooltip: {
        enabled: true, // Disable the default tooltip
        // external: (context) => {
        //   const { chart, tooltip } = context;
        //   let tooltipEl = document.getElementById("chartjs-tooltip");

        //   // Create tooltip element if it doesn't exist
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement("div");
        //     tooltipEl.id = "chartjs-tooltip";
        //     tooltipEl.style.position = "absolute";
        //     tooltipEl.style.background = "white";
        //     tooltipEl.style.borderRadius = "4px";
        //     tooltipEl.style.pointerEvents = "none";
        //     tooltipEl.style.boxShadow = "0px 0px 12px rgba(0, 0, 0, 0.1)";
        //     tooltipEl.style.padding = "8px";
        //     document.body.appendChild(tooltipEl);
        //   }

        //   // Hide if no tooltip
        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = "0";
        //     return;
        //   }

        //   // Set content for the tooltip
        //   tooltipEl.innerHTML = `
        //     <div style="font-weight: bold;">${tooltip.body[0]?.lines[0]}</div>
        //     <div>Date: ${tooltip.dataPoints[0].label}</div>
        //   `;

        //   // Position tooltip near the data point
        //   const canvasRect = chart.canvas.getBoundingClientRect();
        //   tooltipEl.style.opacity = "1";
        //   tooltipEl.style.left = `${
        //     canvasRect.left + window.pageXOffset + tooltip.caretX
        //   }px`;
        //   tooltipEl.style.top = `${
        //     canvasRect.top + window.pageYOffset + tooltip.caretY
        //   }px`;
        //   tooltipEl.style.transform = "translate(-50%, -50%)"; // Center the tooltip
        // },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}K`, // Scale tick values for display
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between gap-4 flex-wrap">
        {/* <p className="font-bold text-base">Revenue & Profit</p> */}
        <p className="font-bold text-base">Revenue</p>
        <div className="flex gap-2 text-grayText">
          <div>
            Total Revenue:{" "}
            <span className="font-bold text-blackPrimary">${totalRevenue}</span>{" "}
          </div>
          {/* <div>
            Total Profit:{" "}
            <span className="font-bold text-blackPrimary">2,018.55</span>{" "}
          </div> */}
        </div>
      </div>
      <div>
        <Line
          data={getDynamicData()}
          options={options}
          className="w-full h-full   "
        />
      </div>
    </>
  );
};

export default RevenueProfitChart;
