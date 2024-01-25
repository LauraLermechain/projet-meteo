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
  return (
    <LineChart width={900} height={500} data={apiData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date_time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={selectedParam} stroke="teal" />
    </LineChart>
  );
};
