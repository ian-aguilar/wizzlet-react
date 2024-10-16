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
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: [20000, 30000, 25000, 35000, 40000, 45000, 30000],
        backgroundColor: "#1CC88A",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
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
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} width={800} height={400} />
    </div>
  );
};

export default MarketplaceActivityChart;
