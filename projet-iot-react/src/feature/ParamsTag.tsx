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

export const ParamsTags = ({ selectedParam, setSelectedParam }) => {
  return (
    <Stack direction="row" justifyContent="start" ml={3} my={3}>
      <Tag
        noOfLines={1}
        bgColor={selectedParam === "temperature" ? "teal.600" : "white"}
        textColor={selectedParam === "temperature" ? "white" : "teal.600"}
        onClick={() => {
          setSelectedParam("temperature");
        }}
        cursor="pointer"
        fontWeight="500"
        fontSize="x-large"
        lineHeight="lg"
        border={
          selectedParam !== "temperature"
            ? "1px solid"
            : "1px solid transparent"
        }
        borderColor={
          selectedParam !== "temperature" ? "gray.300" : "transparent"
        }
      >
        Température
      </Tag>
      <Tag
        noOfLines={1}
        bgColor={selectedParam === "pression" ? "teal.600" : "white"}
        textColor={selectedParam === "pression" ? "white" : "teal.600"}
        onClick={() => {
          setSelectedParam("pression");
        }}
        cursor="pointer"
        fontWeight="500"
        fontSize="x-large"
        lineHeight="lg"
        border={
          selectedParam !== "pression" ? "1px solid" : "1px solid transparent"
        }
        borderColor={selectedParam !== "pression" ? "gray.300" : "transparent"}
      >
        Pression
      </Tag>
      <Tag
        noOfLines={1}
        bgColor={selectedParam === "humidite" ? "teal.600" : "white"}
        textColor={selectedParam === "humidite" ? "white" : "teal.600"}
        onClick={() => {
          setSelectedParam("humidite");
        }}
        cursor="pointer"
        fontWeight="500"
        fontSize="x-large"
        lineHeight="lg"
        border={
          selectedParam !== "humidite" ? "1px solid" : "1px solid transparent"
        }
        borderColor={selectedParam !== "humidite" ? "gray.300" : "transparent"}
      >
        Humidité
      </Tag>
    </Stack>
  );
};

export const ParamsMenu = ({ selectedParam, setSelectedParam }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedParam}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            setSelectedParam("temperature");
          }}
        >
          Température
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedParam("pression");
          }}
        >
          Préssion
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedParam("humidite");
          }}
        >
          Humidité
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
