import React, { useState } from "react";
import { Button, Grid, Flex, useBreakpointValue } from "@chakra-ui/react";
import { ProbeMenu, ProbeTags } from "./ProbeTag.tsx";

export default function ActionSection() {
  const [selectedProbe, setSelectedProbe] = useState<string>("ALL_PROBE");
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  return (
    <Grid templateColumns="repeat(2, 1fr)">
      {isLargeScreen ? (
        <ProbeTags
          data={[
            {
              id: "0",
              name: "ALL_PROBE",
              temperature: 25.5,
              humidity: 50,
              pression: 1015,
              date_time: new Date("2022-01-23T12:00:00Z"),
            },
            {
              id: "1",
              name: "Sonde 1",
              temperature: 25.5,
              humidity: 50,
              pression: 1015,
              date_time: new Date("2022-01-23T12:00:00Z"),
            },
            {
              id: "2",
              name: "Sonde 2",
              temperature: 22.3,
              humidity: 60,
              pression: 1010,
              date_time: new Date("2022-01-23T13:30:00Z"),
            },
          ]}
          selectedProbe={selectedProbe}
          setSelectedProbe={setSelectedProbe}
        />
      ) : (
        <ProbeMenu
          data={[
            {
              id: "0",
              name: "ALL_PROBE",
              temperature: 25.5,
              humidity: 50,
              pression: 1015,
              date_time: new Date("2022-01-23T12:00:00Z"),
            },
            {
              id: "1",
              name: "Sonde 1",
              temperature: 25.5,
              humidity: 50,
              pression: 1015,
              date_time: new Date("2022-01-23T12:00:00Z"),
            },
            {
              id: "2",
              name: "Sonde 2",
              temperature: 22.3,
              humidity: 60,
              pression: 1010,
              date_time: new Date("2022-01-23T13:30:00Z"),
            },
          ]}
          selectedProbe={selectedProbe}
          setSelectedProbe={setSelectedProbe}
        />
      )}
      <Flex justify={{ base: "center ", md: "flex-end" }} align="center" px={5}>
        <Button color="white" bg="teal.600" mx={2} rounded="lg" maxW={300}>
          {isLargeScreen ? "Ajouter une sonde" : "+"}
        </Button>
        <Button color="white" bg="teal.600" rounded="lg" maxW={300}>
          {isLargeScreen ? "Supprimer une sonde" : "-"}
        </Button>
      </Flex>
    </Grid>
  );
}
