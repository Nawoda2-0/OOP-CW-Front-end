import React, { useState, useEffect, useRef } from "react";
import "./ConsoleLogs.css";

const ConsoleLogs = () => {
  const [logs, setLogs] = useState([]);
  const logsContainerRef = useRef(null);  // Reference to the logs container

  useEffect(() => {
    let logSocket;
  
    const connectWebSocket = () => {
      logSocket = new WebSocket("ws://localhost:8080/log-updates");
  
      logSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received WebSocket message:", data); // Debugging log
  
        if (data.type && data.message) {
          setLogs((prevLogs) =>
            [...prevLogs, { type: data.type, message: data.message }].slice(-50)
          );
        } else {
          console.error("Unexpected data format:", data); // Debug unexpected data
        }
      };
  
      logSocket.onclose = () => {
        console.error("Log WebSocket closed. Reconnecting...");
        setTimeout(connectWebSocket, 1000);
      };
    };
  
    connectWebSocket();
  
    return () => {
      if (logSocket) logSocket.close();
    };
  }, []);
  
  useEffect(() => {
    if (logsContainerRef.current) {
      console.log("Logs container found:", logsContainerRef.current);
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);
  

  return (
    <div className="console-logs">
      <div className="logflex">
          <div><h3>Console Logs</h3></div>
          <div className="circleLog1"></div>
          <div className="circleLog2"></div>
          <div className="circleLog3"></div>
      </div>
      <div className="logs-container" ref={logsContainerRef}>
        {logs.map((log, index) => (
          <p
            key={index}
            className={`log-entry ${
              log.type === "Vendor"
                ? "vendor-log"
                : log.type === "Customer"
                ? "customer-log"
                : "waiting-log"
            }`}
          >
            {log.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ConsoleLogs;
