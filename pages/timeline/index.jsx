import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import { Flex, Highlight, Input, Text } from "@chakra-ui/react";
import Item from "../../components/Item";

const data = [
  {
    _id: "dkjfh321i8320",
    date: 2 - 12 - 2022,
  },
  {
    _id: "dkjfh321i8320",
    date: 2 - 12 - 2022,
  },
  {
    _id: "dkjfh321i8320",
    date: 2 - 12 - 2022,
  },
];

const TimeLine = () => {
  return (
    <Container>
      <Flex width="100%" flexDirection="column" gap="1rem">
        {data.map((i, index) => (
          <Item key={index.toString()} hr="timeline/123">
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
        ))}
      </Flex>
    </Container>
  );
};

export default TimeLine;
