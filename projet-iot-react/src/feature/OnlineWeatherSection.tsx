import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { WeatherData } from "./CardsSection";
import { Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudMeatball,
  faCloudRain,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

export const OnlineWeatherSection = ({ selectedProbe }) => {
  const [apiData, setApiData] = useState<WeatherData[]>([]);
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
    }, 1000);
    return () => clearInterval(intervalId);
  }, [selectedProbe]);
  const lastApiData = apiData.length > 0 ? apiData[apiData.length - 1] : null;

  function calculMeteo(temperature, humidite) {
    if (temperature > 23 && humidite < 60) {
      return <FontAwesomeIcon icon={faSun} />;
    } else if (temperature > 5 && humidite > 80) {
      return <FontAwesomeIcon icon={faCloudRain} />;
    } else if (temperature < 5 && humidite > 80) {
      return <FontAwesomeIcon icon={faCloudMeatball} />;
    } else {
      return <FontAwesomeIcon icon={faCloud} />;
    }
  }

  return (
    <Box color={selectedProbe.active ? "green" : "red"} display="flex">
      <Text px={5}>{selectedProbe.active ? "Connectée" : "Déconnectée"}</Text>
      {calculMeteo(lastApiData?.temperature, lastApiData?.humidite)}
    </Box>
  );
};
