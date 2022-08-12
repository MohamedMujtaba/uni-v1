import { useEffect } from "react";
import { useRouter } from "next/router";
import Container from "../../../components/Container";
import { Flex, Highlight, Text } from "@chakra-ui/react";
import Item from "../../../components/Item";

const Year = () => {
  return (
    <Container>
      <Flex width="100%" flexDirection="column" gap="1rem">
        <Item>
          <Flex
            width="100%"
            h="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>الجمعه</Text>
            <Text>12-8-2022</Text>
          </Flex>
        </Item>
        <Item>
          <Flex
            width="100%"
            h="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>الجمعه</Text>
            <Text>12-8-2022</Text>
          </Flex>
        </Item>
        <Item>
          <Flex
            width="100%"
            h="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>الجمعه</Text>
            <Text>12-8-2022</Text>
          </Flex>
        </Item>
      </Flex>
    </Container>
  );
};

export default Year;
