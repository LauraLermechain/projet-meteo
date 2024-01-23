import React, { useEffect, useState } from "react";
import { Button, Grid, Flex, useBreakpointValue } from "@chakra-ui/react";
import { ProbeMenu, ProbeTags } from "./ProbeTag.tsx";

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
        console.log("response", response);
        const result = await response.json();
        console.log("result", result);
        setDataProbe(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    console.log("dataprobe", { dataProbe });
    fetchData();
  }, [dataProbe]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Une erreur s'est produite :</p>;
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)">
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
