import React, { useEffect, useState } from "react";
import { Grid, Flex, useBreakpointValue } from "@chakra-ui/react";
import { ProbeMenu, ProbeTags } from "./ProbeTag.tsx";
import { AddProbeModal, DeleteProbeModal } from "./Modals.tsx";

export default function ActionSection() {
  const [selectedProbe, setSelectedProbe] = useState<string>("ALL_PROBE");
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const [dataProbe, setDataProbe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/sondes");
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
    <Grid templateColumns="repeat(2, 1fr)" mt={5}>
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
      <Flex justify={{ base: "center ", md: "flex-end" }} align="center" px={5}>
        <AddProbeModal />
        <DeleteProbeModal dataProbe={dataProbe} />
      </Flex>
    </Grid>
  );
}
