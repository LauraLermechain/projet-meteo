import React, { useEffect, useState } from "react";
import { Grid, Flex, useBreakpointValue, GridItem } from "@chakra-ui/react";
import { ProbeMenu, ProbeProps, ProbeTags } from "./ProbeTag.tsx";
import { AddProbeModal, DeleteProbeModal } from "./Modals.tsx";
import { API_BASE_URL } from "../config.js";
import { WeatherGraph } from "./Graphs.tsx";
import { ParamsMenu, ParamsTags } from "./ParamsTag.tsx";

export default function ActionSection() {
  const [selectedProbe, setSelectedProbe] = useState<ProbeProps>({
    id_sonde: 0,
    nom: "ALL_PROBE",
    active: true,
  });
  const [selectedParam, setSelectedParam] = useState<string>("temperature");
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const [dataProbe, setDataProbe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/sondes`);
        const result = await response.json();
        setDataProbe(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Une erreur s'est produite :</p>;
  }

  return (
    <>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        mt={5}
      >
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
          justify={{ base: "center ", md: "flex-end" }}
          align="center"
          px={5}
        >
          <AddProbeModal />
          <DeleteProbeModal dataProbe={dataProbe} />
        </Flex>
      </Grid>
      <WeatherGraph
        selectedProbe={selectedProbe}
        selectedParam={selectedParam}
      />
    </>
  );
}
