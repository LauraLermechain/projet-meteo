import {
  Stack,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

export type ProbeProps = {
  id_sonde: string;
  nom: string;
  active: boolean;
};

export type ProbeTagsProps = {
  probeData: Array<ProbeProps> | null;
  selectedProbe: string;
  setSelectedProbe: (probe: string) => void;
};

export const ProbeTags: React.FC<ProbeTagsProps> = ({
  probeData,
  selectedProbe,
  setSelectedProbe,
}) => {
  return (
    <Stack direction="row" justifyContent="start" ml={3} my={3}>
      {probeData?.map((probe, index) => (
        <Tag
          noOfLines={1}
          key={index}
          bgColor={probe.nom === selectedProbe ? "teal.600" : "white"}
          textColor={probe.nom === selectedProbe ? "white" : "teal.600"}
          onClick={() => {
            setSelectedProbe(probe.nom);
          }}
          cursor="pointer"
          fontWeight="500"
          fontSize="x-large"
          lineHeight="lg"
          border={
            probe.nom !== selectedProbe ? "1px solid" : "1px solid transparent"
          }
          borderColor={probe.nom !== selectedProbe ? "gray.300" : "transparent"}
        >
          {probe.nom === "ALL_PROBE" ? "Toutes les sondes" : probe.nom}
        </Tag>
      ))}
    </Stack>
  );
};

export const ProbeMenu: React.FC<ProbeTagsProps> = ({
  probeData,
  selectedProbe,
  setSelectedProbe,
}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedProbe === "ALL_PROBE" ? "Toutes les sondes" : selectedProbe}
      </MenuButton>
      <MenuList>
        {probeData?.map((probe, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setSelectedProbe(probe.nom);
            }}
          >
            {probe.nom === "ALL_PROBE" ? "Toutes les sondes" : probe.nom}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
