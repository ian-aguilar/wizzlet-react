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

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenueData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          fill: true,
        },
        {
          label: "Profit",
          data: profitData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
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
      },
      title: {
        display: true,
        text: "Revenue & Profit",
      },
      tooltip: {
        enabled: false,
        external: (context: any) => {
          const { chart, tooltip } = context;
          const tooltipEl = document.getElementById("chartjs-tooltip");

          if (!tooltipEl) {
            return;
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          tooltipEl.innerHTML = `
            <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);">
              <div style="font-weight: bold;">${tooltip.body[0].lines[0]}</div>
              <div>Date: ${tooltip.dataPoints[0].label}</div>
            </div>
          `;

          const position = chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = "1";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltip.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltip.caretY + "px";
          tooltipEl.style.pointerEvents = "none";
        },
      },
    },
    scales: {
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
    <div>
      <Line data={getDynamicData()} options={options} />
    </div>
  );
};

export default RevenueProfitChart;
