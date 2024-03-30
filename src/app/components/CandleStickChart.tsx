"use client";

import React, { useRef, useEffect, useState, use } from "react";
import { timeFormat, timeParse } from "d3-time-format";
import {
  ChartCanvas,
  Chart,
  XAxis,
  YAxis,
  CandlestickSeries,
  last,
  discontinuousTimeScaleProvider,
  MouseCoordinateX,
  MouseCoordinateY,
  HoverTooltip,
} from "react-financial-charts";
import useWindowDimensions from "../hooks/WindowDimensions";
import CandleStickData from "../types/CandleStickData";
import { format } from "date-fns";
import { TooltipParams } from "../types/interfaces";

type CandlestickChartProps = {
  data: CandleStickData[];
};

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [xExtents, setXExtents] = useState<number[]>();
  const xScale = useRef<any>();
  const xAccessor = useRef<(data: any) => number>();
  const displayXAccessor = useRef<(data: any) => number>();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const transformedData = data.map((d) => ({
      date: new Date(d.date),
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => {
        return d?.date;
      }
    );
    const scale = xScaleProvider(transformedData);

    const start = scale.xAccessor(last(scale.data));
    const end = scale.xAccessor(scale.data[0]);
    xAccessor.current = scale.xAccessor;
    xScale.current = scale.xScale;
    displayXAccessor.current = scale.displayXAccessor;

    setChartData(scale.data);
    setXExtents([start, end]);
  }, [data]);
  useEffect(() => {
    if (chartData == null || xExtents == null) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [chartData, xExtents]);

  const { height, width } = useWindowDimensions();

  return (
    display && (
      <ChartCanvas
        height={height * 0.8}
        ratio={3}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        data={chartData}
        seriesName="CandleStickChart"
        xScale={xScale.current}
        xAccessor={xAccessor.current}
        displayXAccessor={displayXAccessor.current}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <MouseCoordinateX
            at="top"
            orient="top"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={(value: number) => {
              return format(value, ".2f");
            }}
          />
          <HoverTooltip
            yAccessor={(d) => d.close}
            fontFill="#000000"
            fontFamily={"inherit"}
            tooltip={{
              content: (data: any) => {
                return {
                  x: data.date.toString(),
                  y: [
                    {
                      label: "Open",
                      value: data.open,
                      stroke: "green",
                    },
                    {
                      label: "Close",
                      value: data.close,
                      stroke: "red", // Optional: Customize the stroke color
                    },
                    // Include more data as needed
                  ],
                };
              },
            }}
            fontSize={15}
          />
          <CandlestickSeries />
        </Chart>
      </ChartCanvas>
    )
  );
};

export default CandlestickChart;
