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
  colorSchema,
  w,
}) => {
  return (
    <>
      <Menu>
        <MenuButton
          w={w}
          as={Button}
          colorScheme={colorSchema}
          rightIcon={<ChevronDownIcon />}
        >
          {select ? select : title}
        </MenuButton>
        <MenuList w={w} maxH="200px" overflowY="scroll">
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
    </>
  );
};

export default MenuComponent;
