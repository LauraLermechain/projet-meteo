import {
  Stack,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export type ProbeProps = {
  id: string;
  name: string;
  temperature: Number;
  humidity: Number;
  pression: Number;
  date_time: Date;
};

export type ProbeTagsProps = {
  data: Array<ProbeProps>;
  selectedProbe: string;
  setSelectedProbe: (probe: string) => void;
};

export const ProbeTags: React.FC<ProbeTagsProps> = ({
  data,
  selectedProbe,
  setSelectedProbe,
}) => {
  return (
    <Stack direction="row" justifyContent="start" ml={3} my={3}>
      {data?.map((probe, index) => (
        <Tag
          noOfLines={1}
          key={index}
          bgColor={probe.name === selectedProbe ? "teal.600" : "white"}
          textColor={probe.name === selectedProbe ? "white" : "teal.600"}
          onClick={() => {
            setSelectedProbe(probe.name);
          }}
          cursor="pointer"
          fontWeight="500"
          fontSize="x-large"
          lineHeight="lg"
          border={
            probe.name !== selectedProbe ? "1px solid" : "1px solid transparent"
          }
          borderColor={
            probe.name !== selectedProbe ? "gray.300" : "transparent"
          }
        >
          {probe.name === "ALL_PROBE" ? "Toutes les sondes" : probe.name}
        </Tag>
      ))}
    </Stack>
  );
};

export const ProbeMenu: React.FC<ProbeTagsProps> = ({
  data,
  selectedProbe,
  setSelectedProbe,
}) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FontAwesomeIcon icon={faBars} />}
        variant="outline"
      />
      <MenuList>
        {data?.map((probe, index) => (
          <MenuItem
            onClick={() => {
              setSelectedProbe(probe.name);
            }}
          >
            {probe.name === "ALL_PROBE" ? "Toutes les sondes" : probe.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
