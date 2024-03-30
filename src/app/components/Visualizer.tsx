"use client";
import React, { useState } from "react";
import CandleStickData from "../types/CandleStickData";
import Select from "./Select";
import CandleStickChart from "./CandleStickChart";
import { IntervalNumbers } from "../types/Stock";
import StockApi, { StockApi as Stock } from "../api/Stock";

type VisualizerProps = {
  data: CandleStickData[];
};

const Visualizer: React.FC<VisualizerProps> = ({ data }) => {
  const options = Stock.FILTER_OPTIONS.INTERVAL_MINUTES.map(
    (interval: number) => {
      return {
        label: `${interval} minutes`,
        value: interval,
      };
    }
  );
  const [chartData, setChartData] = useState<CandleStickData[]>(data);

  const changeInterval = async (interval: IntervalNumbers) => {
    const responseData = await StockApi.getIntraday(interval);
    setChartData(responseData);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Select
        options={options}
        placeholder="Select an interval (minutes)"
        onChange={changeInterval}
      />
      <CandleStickChart data={chartData} />
    </div>
  );
};

export default Visualizer;
