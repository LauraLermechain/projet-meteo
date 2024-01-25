import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
export interface WeatherData {
  date_time: Date;
  humidite: number;
  pression: number;
  temperature: number;
}
export const CardsSection = ({ selectedProbe }) => {
  const [apiData, setApiData] = useState<WeatherData[]>([]);
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

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
    console.log(selectedProbe.id_sonde);
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [selectedProbe]);
  const lastApiData = apiData.length > 0 ? apiData[apiData.length - 1] : null;
  return (
    <SimpleGrid
      spacing={4}
      templateColumns={isLargeScreen ? "1fr " : "1fr 1fr 1fr"}
    >
      <Card
        w={isLargeScreen ? 80 : 52}
        h={isLargeScreen ? 44 : 24}
        alignItems="center"
      >
        <CardHeader>
          <Heading size={isLargeScreen ? "lg" : "sm"}>Température</Heading>
        </CardHeader>
        <CardBody>
          <Text>{lastApiData ? lastApiData?.temperature : "-"}</Text>
        </CardBody>
      </Card>
      <Card
        w={isLargeScreen ? 80 : 52}
        h={isLargeScreen ? 44 : 24}
        alignItems="center"
      >
        <CardHeader>
          <Heading size={isLargeScreen ? "lg" : "sm"}> Pression</Heading>
        </CardHeader>
        <CardBody>
          <Text>{lastApiData ? lastApiData?.pression : "-"}</Text>
        </CardBody>
      </Card>
      <Card
        w={isLargeScreen ? 80 : 52}
        h={isLargeScreen ? 44 : 24}
        alignItems="center"
      >
        <CardHeader>
          <Heading size={isLargeScreen ? "lg" : "sm"}> Humidité</Heading>
        </CardHeader>
        <CardBody>
          <Text>{lastApiData ? lastApiData?.humidite : "-"}</Text>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};
