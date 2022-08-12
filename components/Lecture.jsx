import { Badge, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Lecture = ({ i }) => {
  const displayStatus = (s) => {
    if (s === "existing") {
      return <Badge colorScheme="green">قائمة</Badge>;
    }
    if (s === "unknown") {
      return <Badge colorScheme="purple">غير محدده</Badge>;
    }
    if (s === "canceled") {
      return <Badge colorScheme="red">ملغية</Badge>;
    }
  };
  return (
    <Flex
      boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
      height="120px"
      flexDirection="column"
      padding="0.5rem"
      width={["100%", "40%", "30%"]}
      // borderRadius="sm"
      borderRightWidth="3px"
      borderRightColor="blue.400"
      borderRightRadius="sm"
      // marginY=".5rem"
      cursor="pointer"
      alignItems="center"
      justifyContent="space-evenly"
      _dark={{
        boxShadow: "1px 1px 3px 0px rgba(255, 255, 255, 0.1)",
        borderRightColor: "blue.200",
      }}
    >
      <Flex w="90%" justifyContent="space-between">
        <Text>{i.time}</Text>
        <Text>{i.title}</Text>
      </Flex>
      <Divider />
      <Flex w="90%" justifyContent="space-between" alignItems="center">
        {displayStatus(i.status)}
        <Text>{i.hole}</Text>
      </Flex>
    </Flex>
  );
};

export default Lecture;
