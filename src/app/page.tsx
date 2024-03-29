import { useEffect, useState } from "react";
import CandleStickChart from "./components/CandleStickChart";
import CandleStickData from "./types/CandleStickData";
import StockApi from "./api/Stock";
export default async function Home() {
  const data = await StockApi.getIntraday();
  // const data: CandleStickData[] = [
  //   { date: "2024-02-27", open: 181, close: 169, high: 182, low: 164 },
  //   { date: "2024-02-28", open: 131, close: 123, high: 134, low: 121 },
  //   { date: "2024-02-29", open: 186, close: 194, high: 203, low: 184 },
  //   { date: "2024-03-01", open: 175, close: 173, high: 176, low: 172 },
  //   { date: "2024-03-02", open: 111, close: 102, high: 115, low: 93 },
  //   { date: "2024-03-03", open: 177, close: 162, high: 186, low: 158 },
  //   { date: "2024-03-04", open: 191, close: 196, high: 205, low: 184 },
  //   { date: "2024-03-05", open: 128, close: 127, high: 138, low: 122 },
  //   { date: "2024-03-06", open: 100, close: 109, high: 112, low: 93 },
  //   { date: "2024-03-07", open: 143, close: 136, high: 146, low: 132 },
  //   { date: "2024-03-08", open: 197, close: 192, high: 199, low: 190 },
  //   { date: "2024-03-09", open: 148, close: 136, high: 154, low: 130 },
  //   { date: "2024-03-10", open: 177, close: 170, high: 178, low: 162 },
  //   { date: "2024-03-11", open: 168, close: 156, high: 175, low: 154 },
  //   { date: "2024-03-12", open: 170, close: 164, high: 180, low: 158 },
  //   { date: "2024-03-13", open: 173, close: 164, high: 175, low: 163 },
  //   { date: "2024-03-14", open: 184, close: 176, high: 189, low: 174 },
  //   { date: "2024-03-15", open: 129, close: 141, high: 143, low: 122 },
  //   { date: "2024-03-16", open: 135, close: 134, high: 141, low: 131 },
  //   { date: "2024-03-17", open: 147, close: 143, high: 151, low: 138 },
  //   { date: "2024-03-18", open: 189, close: 203, high: 205, low: 179 },
  //   { date: "2024-03-19", open: 181, close: 171, high: 190, low: 167 },
  //   { date: "2024-03-20", open: 120, close: 119, high: 127, low: 114 },
  //   { date: "2024-03-21", open: 181, close: 188, high: 197, low: 177 },
  //   { date: "2024-03-22", open: 187, close: 182, high: 188, low: 178 },
  //   { date: "2024-03-23", open: 104, close: 114, high: 120, low: 97 },
  //   { date: "2024-03-24", open: 134, close: 121, high: 138, low: 111 },
  // ];
  return (
    <main>
      <CandleStickChart data={data} />
    </main>
  );
}
