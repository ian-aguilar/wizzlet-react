import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

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
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      {/* Dropdown to switch between Profit and Revenue */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="dataType">Select Data: </label>
        <select
          id="dataType"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}>
          <option value="Profit">Profit</option>
          <option value="Revenue">Revenue</option>
        </select>
      </div>

      {/* Doughnut Chart */}
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
        <div style={{ textAlign: "center" }}>
          <h4>
            eBay {dataType}: ${dataType === "Profit" ? ebayProfit : ebayRevenue}
          </h4>
          <h4>
            Amazon {dataType}: $
            {dataType === "Profit" ? amazonProfit : amazonRevenue}
          </h4>
        </div>
      </div>

      <div id="chartjs-tooltip" style={{ opacity: 0 }}></div>
    </div>
  );
};

export default RevenueProfitDonutChart;
