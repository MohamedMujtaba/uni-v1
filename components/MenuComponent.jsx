import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";

const MenuComponent = ({
  title = "title",
  options = [],
  select,
  setSelect,
}) => {
  return (
    <Flex>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="blue"
          rightIcon={<ChevronDownIcon />}
        >
          {select ? select : title}
        </MenuButton>
        <MenuList maxH="200px" overflowY="scroll">
          <MenuOptionGroup onChange={(value) => setSelect(value)}>
            {options.map((i, index) => {
              return (
                <MenuItemOption key={index.toString()} value={i}>
                  {i}
                </MenuItemOption>
              );
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MenuComponent;
