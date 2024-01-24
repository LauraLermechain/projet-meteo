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
  console.log(selectedProbe);
  console.log("selectedprobe", selectedProbe.id_sonde);
  useEffect(() => {
    // Remplacez 'YOUR_API_ENDPOINT' par l'URL réel de votre API
    fetch(
      selectedProbe.nom === "ALL_PROBE"
        ? `${API_BASE_URL}/releves`
        : `${API_BASE_URL}/releves/${selectedProbe.id_sonde}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Assurez-vous que la structure des données de l'API correspond à ce que votre graphique attend
        setApiData(data);
      })
      .catch((error) => console.error("Error fetching API data:", error));
  }, [selectedProbe]); // Le tableau vide assure que le code s'exécute une seule fois après le montage du composant

  return (
    <LineChart width={400} height={400} data={apiData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date_time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={selectedParam} stroke="teal" />
    </LineChart>
  );
};
