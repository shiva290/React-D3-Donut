import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const data = [
  { city: "Delhi", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) },
  { city: "Mumbai", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) },
  { city: "Kolkata", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) },
  { city: "Chennai", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) },
  { city: "Pune", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) },
  { city: "Bengaluru", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) },
  { city: "Hyderabad", value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) }
];

const DonutChart = () => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    const svg = d3.select("#donut-chart");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radius = Math.min(width, height) / 2;
    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().sort(null).value(d => d.value);
    const path = d3.arc().outerRadius(radius - 10).innerRadius(radius - 70);
    const label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

    const arc = g
      .selectAll(".arc")
      .data(pie(chartData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc.append("path")
      .attr("d", path)
      .attr("fill", d => color(d.data.city));

    arc.append("text")
      .attr("transform", d => `translate(${label.centroid(d)})`)
      .attr("dy", "0.35em")
      .text(d => d.data.city);
  }, [chartData]);

  const handleRandomize = () => {
    setChartData(
      data.map(city => ({
        city: city.city,
        value: Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
      }))
    );
  };

  return (
    <>
      <button onClick={handleRandomize}>Randomize Data</button>
      <svg id="donut-chart" width={500} height={500} />
    </>
);
};

export default DonutChart;



