import { useState } from "react";
import { Chart } from "react-google-charts";
import Tooltip from "../components/tooltip";

const GeoChart = () => {
  const data = [
    ["Country", "Popularity"],
    ["United States", 70],
    ["Brazil", 30],
    ["Canada", 20],
    ["France", 20],
    ["Germany", 20],
    ["United Kingdom", 20],
    ["India", 10],
    ["China", 5],
    ["Russia", 5],
    ["Australia", 5],
  ];

  const options = {
    colorAxis: {
      colors: ["#FFC702", "#09A17A"], // Yellow to Green
    },
    backgroundColor: "#f5f5f5",
    datalessRegionColor: "#f8f8f8",
    defaultColor: "#f5f5f5",
  };

  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseOver = (event, country) => {
    const { clientX, clientY } = event;
    setTooltipContent(`Country: ${country}`);
    setTooltipPosition({ x: clientX + 10, y: clientY + 10 });
    setTooltipVisible(true);
  };

  const handleMouseOut = () => {
    setTooltipVisible(false);
  };

  const handleSelect = (chartWrapper) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;

    const selectedItem = selection[0];
    const country = data[selectedItem.row + 1][0]; // +1 to skip header row
    alert(`You selected: ${country}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => handleSelect(chartWrapper),
          },
          {
            eventName: "onmouseover",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const selectedItem = selection[0];
              const country = data[selectedItem.row + 1][0]; // +1 to skip header row
              handleMouseOver(event, country);
            },
          },
          {
            eventName: "onmouseout",
            callback: () => handleMouseOut(),
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      <Tooltip
        content={tooltipContent}
        position={tooltipPosition}
        visible={tooltipVisible}
      />
    </div>
  );
};

export default GeoChart;
