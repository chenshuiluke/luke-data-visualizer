import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import CandleStickData from "../types/CandleStickData";

type CandlestickChartProps = {
  data: CandleStickData[];
};

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 80 * data.length;
  const height = 500;
  useEffect(() => {
    if (!data || data.length === 0) return;
    console.log("@@@ data", data);
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear SVG content before drawing

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.low)!, d3.max(data, (d) => d.high)!])
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.date)!)
      .attr("y", (d) => y(Math.max(d.open, d.close)))
      .attr("height", (d) => Math.abs(y(d.open) - y(d.close)))
      .attr("width", x.bandwidth())
      .attr("stroke", (d) => (d.open > d.close ? "red" : "green"));

    // Draw axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((domainValue: any, i: number) => {
            return data[i].date;
          })
          .tickSizeOuter(0)
      );

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]); // Redraw chart if data changes

  return (
    <div
      style={{
        width: "100vw",
        overflowX: "scroll",
      }}
    >
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
};

export default CandlestickChart;
