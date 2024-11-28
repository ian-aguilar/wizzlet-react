import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AdminRevenueProfitChartProps } from "../types";
import { getRevenueAndLabels } from "@/modules/dashboard/helper";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MarketplaceActivityChart: React.FC<AdminRevenueProfitChartProps> = ({
  startDate,
  endDate,
  data,
  selectedMarketplace,
}) => {
  const getDynamicData = () => {
    const selectedMarketplaceIds =
      selectedMarketplace?.map((item) => Number(item?.value)) || [];
    const { revenues, labels } = getRevenueAndLabels(
      data,
      startDate?.toLocaleDateString("en-CA") as string,
      endDate?.toLocaleDateString("en-CA") as string,
      selectedMarketplaceIds.length > 0 ? selectedMarketplaceIds : undefined
    );

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenues,
          backgroundColor: "black",
          borderWidth: 5,
          borderColor: "transparent",
          borderRadius: 10,
          barThickness: 35,
        },
        // {
        //   label: "Profit",
        //   data: [150, 530, 100, 150, 150, 401, 530],
        //   backgroundColor: "#09A17A",
        //   borderWidth: 5,
        //   borderRadius: 10,
        //   barThickness: 35,
        //   borderColor: "transparent",
        // },
      ],
    };
  };

  const options: any = {
    barPercentage: 0.8,
    categoryPercentage: 1.0,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
        text: "Marketplace Activity",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value}`,
        },
        grid: {
          color: "#d8dce4",
        },
        border: {
          dash: [6, 4],
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      <Bar
        data={getDynamicData()}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default MarketplaceActivityChart;
