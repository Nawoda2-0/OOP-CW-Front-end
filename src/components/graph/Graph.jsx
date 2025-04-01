import React, { useState, useEffect } from "react";
import "./Graph.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import ConsoleLogs from "../consoleMsg/ConsoleLogs";

const Graph = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);
  const [index, setIndex] = useState(0); // Track time/index for x-axis

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket("ws://localhost:8080/ticket-updates");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // Update state with new data, keeping previous data
        setMaxTicketCapacity(data.maxTicketCapacity);

        setDataPoints((prevDataPoints) => [
          ...prevDataPoints,
          {
            time: index, // Increment time by 1 second for each new data point
            maxTicketArraySize: data.maxTicketArraySize,
            totalTicketArraySize: data.totalTicketArraySize,
          },
        ]);

        // Increment the index for x-axis (time)
        setIndex((prevIndex) => prevIndex + 1);
      };

      socket.onclose = () => {
        console.error("WebSocket closed. Reconnecting...");
        // setTimeout(connectWebSocket, 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, [index]);

  // Prepare data for the chart
  const dataset = dataPoints.map((point) => ({
    time: point.time, // Using index for time
    maxTicketArraySize: point.maxTicketArraySize,
    totalTicketArraySize: point.totalTicketArraySize,
  }));

  const series = [
    { type: "line", dataKey: "maxTicketArraySize", color: "rgba(87, 115, 153, 0.9)", area: true,fill: "rgba(87, 115, 153, 0.3)", }, // Blue line for maxTicketArraySize
    { type: "line", dataKey: "totalTicketArraySize", color: "rgba(68, 175, 105, 0.9)", area: true,  fill: "rgba(68, 175, 105, 0.3)", }, // Green line for totalTicketArraySize
  ];

  return (
    <div className="row graphRow">
      <h3 className="realData">Real Time Data</h3>
      <div className="graph col-xxl-7">
        <Stack sx={{ width: "100%" }}>
          <Typography variant="h6" align="center" gutterBottom>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#577399",
                }}
              ></span>{" "}
              <div style={{color : "#242424", fontSize : "16px"}}>Ticket production</div>
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                marginLeft: "20px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#44af69",
                }}
              ></span>{" "}
              <div style={{color : "#242424", fontSize : "16px"}}>Ticket Pool Size</div>
            </span>
          </Typography>
          <Box sx={{ width: "100%" }}>
            <ResponsiveChartContainer
              series={series}
              xAxis={[
                {
                  scaleType: "linear", // Use linear scale to keep increasing time
                  dataKey: "time", // Use index for time
                  label: "Time (Seconds)",
                  tickFormat: (value) => `${value}`, // Display time as seconds
                },
              ]}
              yAxis={[
                {
                  id: "leftAxis",
                  labelFormatter: (value) => `${value}`, // Display values without percentage
                  min: 0,
                  max: maxTicketCapacity > 0 ? maxTicketCapacity : 100, // Dynamically set max to maxTicketCapacity or default to 100
                },
              ]}
              dataset={dataset}
              height={400}
            >
              <ChartsGrid horizontal />
              <LinePlot />
              <ChartsXAxis />
              <ChartsYAxis axisId="leftAxis" label="Values" />
              <ChartsTooltip />
            </ResponsiveChartContainer>
          </Box>
        </Stack>
      </div>
      <div className="graph col-xxl-4 consoleCard">
        <ConsoleLogs/>
      </div>
    </div>
  );
};

export default Graph;
