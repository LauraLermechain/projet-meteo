import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { API_BASE_URL } from "../config.js";

export const WeatherGraph = ({ selectedProbe, selectedParam }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        selectedProbe.nom === "ALL_PROBE"
          ? `${API_BASE_URL}/releves`
          : `${API_BASE_URL}/releves/${selectedProbe.id_sonde}`
      );
      const result = await response.json();
      setApiData(result);
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [selectedProbe]);
  const dataSlice = apiData.slice(-100);
  return (
    <LineChart
      width={1200}
      height={500}
      data={selectedProbe.nom === "ALL_PROBE" ? apiData : dataSlice}
    >
      <XAxis dataKey="none" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={selectedParam}
        stroke="teal"
        dot={selectedProbe.nom !== "ALL_PROBE"}
        strokeWidth={2}
      />
    </LineChart>
  );
};
