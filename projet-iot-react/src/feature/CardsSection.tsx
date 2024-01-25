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
interface WeatherData {
  date_time: string;
  humidite: number;
  pression: number;
  temperature: number; // Ajoutez la propriété temperature
  // Ajoutez d'autres propriétés si nécessaire
}
export const CardsSection = ({ probeData, selectedProbe }) => {
  const [apiData, setApiData] = useState<WeatherData[]>([]);
  const isLargeScreen = useBreakpointValue({ base: false, md: true });

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
  }, [selectedProbe, apiData]);
  const lastApiData = apiData.length > 0 ? apiData[apiData.length - 1] : null;
  return (
    <SimpleGrid
      spacing={4}
      templateColumns={isLargeScreen ? "1fr " : "1fr 1fr 1fr"}
    >
      <Card>
        <CardHeader>
          <Heading size={isLargeScreen ? "md" : "sm"}> Température</Heading>
        </CardHeader>
        <CardBody>
          <Text>{lastApiData?.temperature}</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading size={isLargeScreen ? "md" : "sm"}> Pression</Heading>
        </CardHeader>
        <CardBody>
          <Text>{lastApiData?.pression}</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading size={isLargeScreen ? "md" : "sm"}> Humidité</Heading>
        </CardHeader>
        <CardBody>
          <Text>{lastApiData?.humidite}</Text>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};
