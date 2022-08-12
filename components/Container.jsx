import { Flex } from "@chakra-ui/react";
import React from "react";

const Container = ({ children, HH }) => {
  return (
    <Flex width="100%" alignItems="center" justifyContent="center" height={HH}>
      <Flex width="90%" height={HH ? "90%" : ""}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Container;
