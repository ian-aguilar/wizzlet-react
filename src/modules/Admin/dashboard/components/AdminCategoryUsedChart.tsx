// CategoryUsedChart.tsx

import React from "react";
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
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CategoryUsedChart: React.FC = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Category Used",
        data: [10, 20, 15, 25, 30, 20, 35, 30, 40, 25, 30, 35], // Data points
        borderColor: "#1CC88A", // Line color
        backgroundColor: "rgba(28, 200, 138, 0.2)", // Area fill color
        borderWidth: 2,
        tension: 0, // Set to 0 for sharp lines
        fill: true, // Fills the area under the line
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
        text: "Category Used",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}m`, // Format y-axis ticks
        },
        title: {
          display: true,
          text: "Usage in meters",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CategoryUsedChart;
