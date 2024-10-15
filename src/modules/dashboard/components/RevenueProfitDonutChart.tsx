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

  const [dataType, setDataType] = useState<string>("Profit"); // State for dropdown
  const [ebayProfit, setEbayProfit] = useState<number>(55238); // Initial profit for eBay
  const [amazonProfit, setAmazonProfit] = useState<number>(55238); // Initial profit for Amazon
  const [ebayRevenue, setEbayRevenue] = useState<number>(120000); // Initial revenue for eBay
  const [amazonRevenue, setAmazonRevenue] = useState<number>(135000); // Initial revenue for Amazon

  // Mock function to fetch data based on date range and data type (Profit or Revenue)
  const fetchDataByDateRange = (start: Date, end: Date, type: string) => {
    // Logic to fetch or calculate profits/revenue based on date range and type
    if (type === "Profit") {
      setEbayProfit(Math.floor(Math.random() * 100000));
      setAmazonProfit(Math.floor(Math.random() * 100000));
    } else if (type === "Revenue") {
      setEbayRevenue(Math.floor(Math.random() * 200000));
      setAmazonRevenue(Math.floor(Math.random() * 200000));
    }
  };

  useEffect(() => {
    // Fetch new data whenever startDate, endDate, or dataType changes
    fetchDataByDateRange(startDate, endDate, dataType);
  }, [startDate, endDate, dataType]);

  // Data for the Doughnut chart based on the selected dataType
  const data = {
    labels: ["eBay", "Amazon"],
    datasets: [
      {
        data:
          dataType === "Profit"
            ? [ebayProfit, amazonProfit]
            : [ebayRevenue, amazonRevenue],
        backgroundColor: ["#E1E1E1", "#34B2A0"], // Adjust colors as needed
        borderWidth: 0,
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
      tooltip: {
        enabled: true,
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
            id="dataType"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}>
            <option value="Profit">Profit</option>
            <option value="Revenue">Revenue</option>
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
