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
  ChartOptions,
  ChartData,
  ScriptableContext,
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
  const getDynamicData = (): ChartData<"line"> => {
    const selectedMarketplaceIds =
      selectedMarketplace?.map((item) => Number(item?.value)) || [];
    const { revenues, labels } = getRevenueAndLabels(
      data,
      startDate?.toLocaleDateString("en-CA") as string,
      endDate?.toLocaleDateString("en-CA") as string,
      selectedMarketplaceIds.length > 0 ? selectedMarketplaceIds : undefined
    );

    const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
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
          tension: 0.4,
          pointBackgroundColor: "rgba(9, 161, 122, 1)",
          fill: true,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) return;
            return getGradient(ctx, chartArea);
          },
        },
      ],
    };
  };

  const options: ChartOptions<"line"> = {
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
        enabled: true,
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
        <p className="font-bold text-base">Revenue</p>
        <div className="flex gap-2 text-grayText">
          <div>
            Total Revenue:{" "}
            <span className="font-bold text-blackPrimary">${totalRevenue}</span>{" "}
          </div>
        </div>
      </div>
      <div>
        <Line
          data={getDynamicData()}
          options={options}
          className="w-full h-full"
        />
      </div>
    </>
  );
};

export default RevenueProfitChart;
