import { TriangleDownIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  chakra,
  Divider,
  Flex,
  Icon,
  IconButton,
  shouldForwardProp,
  Text,
  VStack,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import React from "react";
import { useState } from "react";
const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
const T = chakra(motion.p, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Lecture = ({ i, setNote, onOpen }) => {
  const [show, setShow] = useState(false);
  const displayStatus = (s) => {
    if (s === "listed") {
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
      display="flex"
      boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
      height="130px"
      flexDirection="column"
      padding="0.7rem"
      width={["100%", "40%", "30%"]}
      // borderRadius="sm"
      borderRightWidth="3px"
      borderRightColor="blue.400"
      borderRightRadius="sm"
      // marginY=".5rem"
      // cursor="pointer"
      alignItems="center"
      justifyContent="space-evenly"
      _dark={{
        boxShadow: "1px 1px 3px 0px rgba(255, 255, 255, 0.1)",
        borderRightColor: "blue.200",
      }}
      transition={{
        duration: 0.2,
        ease: "linear",
      }}
      position="relative"
    >
      <Flex
        w="100%"
        h="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Flex
          w={["90%", "100%"]}
          justifyContent="space-between"
          paddingX={[0, 2]}
          Height="120px"
        >
          <Text>{i.time}</Text>
          <VStack alignItems="end">
            <Text textAlign="right" mb={2}>
              {i.title}
            </Text>
            <Text textAlign="right" fontSize="xs" as="sup">
              ({i.code})
            </Text>
          </VStack>
        </Flex>
        <Divider />
        <Flex w="90%" justifyContent="space-between" alignItems="center">
          {displayStatus(i.status)}
          <Text>{i.hall}</Text>
        </Flex>
      </Flex>
      {i.note && (
        <>
          <Flex position="absolute" left={1.5} top={1.5}>
            <InfoOutlineIcon color="red.300" />
          </Flex>
          <Button
            w="100%"
            h="100%"
            position="absolute"
            variant="unStyled"
            onClick={() => {
              setNote(i.note);
              onOpen();
            }}
          ></Button>
        </>
      )}
    </Flex>
  );
};

export default Lecture;
