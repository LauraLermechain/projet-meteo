import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  useBreakpointValue,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { ProbeMenu, ProbeProps, ProbeTags } from "./ProbeTag.tsx";
import { AddProbeModal, DeleteProbeModal } from "./Modals.tsx";
import { API_BASE_URL } from "../config.js";
import { WeatherGraph } from "./Graphs.tsx";
import { ParamsMenu, ParamsTags } from "./ParamsTag.tsx";
import { CardsSection } from "./CardsSection.tsx";
import { OnlineWeatherSection } from "./OnlineWeatherSection.tsx";

export default function ActionSection() {
  const [selectedProbe, setSelectedProbe] = useState<ProbeProps>({
    id_sonde: 0,
    nom: "ALL_PROBE",
    active: true,
  });
  const [selectedParam, setSelectedParam] = useState<string>("temperature");
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const [dataProbe, setDataProbe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/sondes`);
      const result = await response.json();
      setDataProbe(result);
    };
    fetchData();
  }, []);

  return (
    <Box px={isLargeScreen ? 10 : 0}>
      <Grid templateColumns="repeat(2, 1fr)" my={5}>
        <GridItem>
          {isLargeScreen ? (
            <ProbeTags
              probeData={dataProbe}
              selectedProbe={selectedProbe}
              setSelectedProbe={setSelectedProbe}
            />
          ) : (
            <ProbeMenu
              probeData={dataProbe}
              selectedProbe={selectedProbe}
              setSelectedProbe={setSelectedProbe}
            />
          )}
          {isLargeScreen ? (
            <ParamsTags
              selectedParam={selectedParam}
              setSelectedParam={setSelectedParam}
            />
          ) : (
            <ParamsMenu
              selectedParam={selectedParam}
              setSelectedParam={setSelectedParam}
            />
          )}
        </GridItem>
        <Flex
          justify="flex-end"
          align={isLargeScreen ? "center" : "flex-end"}
          flexDirection={isLargeScreen ? "row" : "column"}
        >
          <AddProbeModal />
          <DeleteProbeModal dataProbe={dataProbe} />
        </Flex>
      </Grid>
      <Flex
        justify="space-between"
        flexDirection={isLargeScreen ? "row" : "column"}
      >
        <Flex flexDirection="column">
          <OnlineWeatherSection selectedProbe={selectedProbe} />
          <WeatherGraph
            selectedProbe={selectedProbe}
            selectedParam={selectedParam}
          />
        </Flex>
        {isLargeScreen ? <CardsSection selectedProbe={selectedProbe} /> : null}
      </Flex>
    </Box>
  );
}
