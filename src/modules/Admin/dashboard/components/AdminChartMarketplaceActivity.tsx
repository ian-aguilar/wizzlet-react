// MarketplaceActivityChart.tsx

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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MarketplaceActivityChart: React.FC = () => {
  const data = {
    labels: [
      "17 Sun",
      "18 Mon",
      "19 Tue",
      "20 Wed",
      "21 Thu",
      "22 Fri",
      "23 Sat",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [30000, 20000, 15000, 40000, 30000, 50000, 25000],
        backgroundColor: "black",
        borderWidth: 5,
        borderColor: "transparent",
        borderRadius: 10,
        barThickness: 35,
      },
      {
        label: "Profit",
        data: [20000, 30000, 25000, 35000, 40000, 45000, 30000],
        backgroundColor: "#09A17A",
        borderWidth: 5,
        borderRadius: 10,
        barThickness: 35,
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    barPercentage: 0.8,
    // barThickness: 60,
    // maxBarThickness: 60,
    categoryPercentage: 1.0,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Marketplace Activity",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value}`, // Format y-axis ticks as currency
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
      <div className="flex justify-between gap-4 pb-6 items-center">
        <h3 className="text-xl font-medium text-blackPrimary">
          Marketplace Activity
        </h3>
      </div>
      <Bar data={data} options={options} className="w-full h-full" />
    </div>
  );
};

export default MarketplaceActivityChart;
