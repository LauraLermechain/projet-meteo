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
  id_sonde: Number;
  nom: string;
  active: boolean;
};

export type ProbeTagsProps = {
  probeData: Array<ProbeProps> | null;
  selectedProbe: ProbeProps;
  setSelectedProbe: (probe: ProbeProps) => void;
};

export const ProbeTags: React.FC<ProbeTagsProps> = ({
  probeData,
  selectedProbe,
  setSelectedProbe,
}) => {
  return (
    <Stack direction="row" justifyContent="start" ml={3} my={3}>
      <Tag
        noOfLines={1}
        bgColor={selectedProbe.id_sonde === 0 ? "teal.600" : "white"}
        textColor={selectedProbe.id_sonde === 0 ? "white" : "teal.600"}
        onClick={() => {
          setSelectedProbe({ id_sonde: 0, nom: "ALL_PROBE", active: false });
        }}
        cursor="pointer"
        fontWeight="500"
        fontSize="x-large"
        lineHeight="lg"
        border={
          selectedProbe.id_sonde !== 0 ? "1px solid" : "1px solid transparent"
        }
        borderColor={selectedProbe.id_sonde !== 0 ? "gray.300" : "transparent"}
      >
        Toutes les sondes
      </Tag>
      {probeData?.map((probe, index) => (
        <Tag
          noOfLines={1}
          key={index}
          bgColor={probe === selectedProbe ? "teal.600" : "white"}
          textColor={probe === selectedProbe ? "white" : "teal.600"}
          onClick={() => {
            setSelectedProbe(probe);
          }}
          cursor="pointer"
          fontWeight="500"
          fontSize="x-large"
          lineHeight="lg"
          border={
            probe !== selectedProbe ? "1px solid" : "1px solid transparent"
          }
          borderColor={probe !== selectedProbe ? "gray.300" : "transparent"}
        >
          {probe.nom}
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
        {selectedProbe.nom === "ALL_PROBE"
          ? "Toutes les sondes"
          : selectedProbe.nom}
      </MenuButton>
      <MenuList>
        {probeData?.map((probe, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setSelectedProbe(probe);
            }}
          >
            {probe.nom === "ALL_PROBE" ? "Toutes les sondes" : probe.nom}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
