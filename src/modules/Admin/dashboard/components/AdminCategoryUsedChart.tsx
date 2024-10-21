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
  ChartOptions,
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
        borderColor: "#09A17A", // Line color
        backgroundColor: "#09A17A", // Area fill color
        borderWidth: 2,
        tension: 0, // Set to 0 for sharp lines
        fill: false, // Fills the area under the line
      },
    ],
  };

  // Explicitly typing the options object
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Category Used",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}m`, // Format y-axis ticks
        },
        title: {
          display: true,
          text: "Usage in meters",
        },
        grid: {
          color: "#d8dce4",
        },
        border: {
          dash: [6, 4],
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default CategoryUsedChart;
