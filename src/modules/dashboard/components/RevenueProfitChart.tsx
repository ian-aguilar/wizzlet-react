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
import { color } from "chart.js/helpers";
import { fill } from "lodash";

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
    const labels = [];
    const revenueData = [];
    const profitData = [];

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      labels.push(
        currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      revenueData.push(Math.floor(Math.random() * 20000) + 30000);
      profitData.push(Math.floor(Math.random() * 20000) + 25000);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    function getGradient(ctx, chartArea) {
      let gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );

      gradient.addColorStop(0.9, "rgba(9, 161, 122, 0.20)");
      gradient.addColorStop(0.1, "transparent");
      return gradient;
    }

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenueData,
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
        {
          label: "Profit",
          data: profitData,
          borderColor: "#6C778B",
          backgroundColor: "rgba(54, 162, 235,  0)",
          tension: 0.4,
          pointBackgroundColor: "#6C778B",
          fill: true,
        },
      ],
    };
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
        enabled: true,

        // external: (context: any) => {
        //   const { chart, tooltip } = context;
        //   const tooltipEl = document.getElementById("chartjs-tooltip");

        //   if (!tooltipEl) {
        //     return;
        //   }

        //   if (tooltip.opacity === 0) {
        //     tooltipEl.style.opacity = "0";
        //     return;
        //   }

        //   tooltipEl.innerHTML = `
        //     <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);">
        //       <div style="font-weight: bold;">${tooltip.body[0].lines[0]}</div>
        //       <div>Date: ${tooltip.dataPoints[0].label}</div>
        //     </div>
        //   `;

        //   const position = chart.canvas.getBoundingClientRect();
        //   tooltipEl.style.opacity = "1";
        //   tooltipEl.style.position = "absolute";
        //   // tooltipEl.style.left =
        //   //   position.left + window.pageXOffset + tooltip.caretX + "px";
        //   // tooltipEl.style.top =
        //   //   position.top + window.pageYOffset + tooltip.caretY + "px";
        //   tooltipEl.style.pointerEvents = "none";
        // },
      },
    },
    scales: {
      x: {
        display: true,
        // title: {
        //   display: true,
        //   text: "Time [µs]",
        //   font: { size: 12, weight: "bold" },
        // },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return `$${value / 1000}K`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between gap-4 flex-wrap">
        <p className="font-bold text-base">Revenue & Profit</p>
        <div className="flex gap-2 text-grayText">
          <div>
            Total Revenue:{" "}
            <span className="font-bold text-blackPrimary">2,018.55</span>{" "}
          </div>
          <div>
            Total Profit:{" "}
            <span className="font-bold text-blackPrimary">2,018.55</span>{" "}
          </div>
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
