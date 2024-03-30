import { useEffect, useState } from "react";
import CandleStickChart from "./components/CandleStickChart";
import CandleStickData from "./types/CandleStickData";
import StockApi from "./api/Stock";
import Select from "./components/Select";
import Visualizer from "./components/Visualizer";
import CalmBackground from "./components/CalmBackground";
export default async function Home() {
  const data = await StockApi.getIntraday();

  return (
    <main className="p-8">
      <CalmBackground />
      <Visualizer data={data} />
    </main>
  );
}
