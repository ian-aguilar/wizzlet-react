import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { MarketplaceRevenue, RevenueProfitDonutChartProps } from "../types";
import { calculateMarketplaceRevenue } from "../helper";
import { capitalizeFirstLetter } from "@/modules/choose-marketplace/helper";
import {
  newestBoxStyle,
  pageLimitStyle,
} from "@/modules/import-products/constants";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RevenueProfitDonutChart: React.FC<RevenueProfitDonutChartProps> = ({
  connectedMarketplace,
  revenueData,
  selectedMarketplace,
}) => {
  //------------------------------State---------------------------------
  const [dataType, setDataType] = useState<string>("Revenue");
  const [marketplaceData, setMarketplaceData] = useState<MarketplaceRevenue[]>(
    []
  );
  const [chartData, setChartData] = useState<any>(null);

  const fetchDataByDateRange = () => {
    const selectedMarketplaceIds =
      selectedMarketplace?.map((item) => Number(item?.value)) || [];

    const { totalRevenue, names } = calculateMarketplaceRevenue(
      revenueData,
      connectedMarketplace,
      selectedMarketplaceIds.length > 0 ? selectedMarketplaceIds : undefined
    );

    const combinedData: MarketplaceRevenue[] = names.map((name, index) => ({
      name: capitalizeFirstLetter(name),
      value: totalRevenue[index],
    }));

    setMarketplaceData(combinedData);

    setChartData({
      labels: names,
      datasets: [
        {
          data: totalRevenue,
          backgroundColor: ["#E1E1E1", "#09A17A"],
          borderColor: ["#E1E1E1", "#09A17A"],
          borderWidth: 0,
          hoverBorderWidth: 7,
        },
      ],
    });
  };

  useEffect(() => {
    fetchDataByDateRange();
  }, [revenueData, connectedMarketplace, selectedMarketplace]);

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
        <p className="font-bold text-base pt-2">Marketplace Revenue & Profit</p>
        <div>
          <select
            className="text-black bg-white py-2 lg:px-2 border border-grayText focus:outline-none rounded-md   cursor-pointer"
            id="dataType"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            style={pageLimitStyle}
          >
            <option value="Revenue">Revenue</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full h-full">
        <div className="max-w-[195px] mx-auto">
          {chartData && revenueData.length > 0 ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <div className="text-center">No Data Found!</div>
          )}
        </div>
        <div className="text-center pt-6 text-grayText text-base">
          {marketplaceData?.map((item) => (
            <h4>
              {item?.name} Revenue:{" "}
              <span className="font-semibold text-blackPrimary">
                ${item?.value}
              </span>
            </h4>
          ))}
        </div>
        <div id="chartjs-tooltip" style={{ opacity: 0 }}></div>
      </div>
    </>
  );
};

export default RevenueProfitDonutChart;
