import React, { useRef, useEffect } from 'react';
import {CandleStickData} from '../types'
import * as d3 from 'd3';


type CandlestickChartProps = {
  data: CandleStickData[];
};

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear SVG content before drawing

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.low)!, d3.max(data, d => d.high)!])
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
       .attr("fill", "none")
       .attr("stroke", "#000")
       .selectAll("rect")
       .data(data)
       .join("rect")
       .attr("x", d => x(d.date)!)
       .attr("y", d => y(Math.max(d.open, d.close)))
       .attr("height", d => Math.abs(y(d.open) - y(d.close)))
       .attr("width", x.bandwidth())
       .attr("stroke", d => d.open > d.close ? "red" : "green");

    // Draw axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].date).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data]); // Redraw chart if data changes

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default CandlestickChart;
