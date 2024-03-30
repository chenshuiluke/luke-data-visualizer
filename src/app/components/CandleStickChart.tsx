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
  CurrentCoordinate,
  BarSeries,
  EdgeIndicator,
  OHLCTooltip,
  ZoomButtons,
  ema,
  Label,
  MouseCoordinateXV2,
  CrossHairCursor,
  lastVisibleItemBasedZoomAnchor,
} from "react-financial-charts";
import useWindowDimensions from "../hooks/WindowDimensions";
import CandleStickData from "../types/CandleStickData";
import { format } from "d3-format";
import { TooltipParams } from "../types/interfaces";

type CandlestickChartProps = {
  data: CandleStickData[];
};

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: { ema12: any }, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: { ema12: any }) => d.ema12);

  const transformedData = data.map((d) => ({
    date: d.date,
    open: d.open,
    high: d.high,
    low: d.low,
    close: d.close,
  }));
  ema12(transformedData);
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => {
      return new Date(d?.date);
    }
  );
  const scale = xScaleProvider(transformedData);

  const start = scale.xAccessor(last(scale.data));
  const end = scale.xAccessor(scale.data[0]);

  const { height, width } = useWindowDimensions();
  const [yAxisLabelX, yAxisLabelY] = [-40, (height - 200) / 2];

  return (
    <>
      <ChartCanvas
        height={height * 0.8}
        useCrossHairStyleCursor={true}
        ratio={1}
        width={width}
        margin={{ left: 100, right: 100, top: 100, bottom: 50 }}
        data={scale.data}
        seriesName="CandleStickChart"
        xScale={scale.xScale}
        xAccessor={scale.xAccessor}
        displayXAccessor={scale.displayXAccessor}
        xExtents={[start, end]}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Label
          x={(width - 200) / 2}
          y={30}
          fontSize={30}
          fillStyle={"#000000"}
          text="Intraday Time Series"
        />
        <Label
          x={yAxisLabelX}
          y={yAxisLabelY}
          rotate={-90}
          fontSize={12}
          text="Price"
          fillStyle={"#000000"}
        />
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis
            showGridLines
            gridLinesStrokeStyle="#e0e3eb"
            axisAt="bottom"
            orient="bottom"
          />
          <YAxis
            showGridLines
            gridLinesStrokeStyle="#e0e3eb"
            axisAt="left"
            orient="left"
          />

          <CandlestickSeries />
          <OHLCTooltip origin={[0, 0]} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
            fill="#000000"
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
            fill="#000000"
          />
          <HoverTooltip
            yAccessor={(d) => d.close}
            fontFill="#000000"
            fontFamily={"inherit"}
            tooltip={{
              content: (data: any) => {
                return {
                  x: data?.currentItem?.date,
                  y: [
                    {
                      label: "Open",
                      value: data?.currentItem?.open,
                      stroke: "green",
                    },
                    {
                      label: "Close",
                      value: data?.currentItem?.close,
                      stroke: "red",
                    },
                  ],
                };
              },
            }}
            fontSize={15}
          />
          <ZoomButtons />
          <CrossHairCursor />
        </Chart>
      </ChartCanvas>
    </>
  );
};

export default CandlestickChart;
