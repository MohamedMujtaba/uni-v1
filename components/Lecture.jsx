import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  chakra,
  Divider,
  Flex,
  Icon,
  IconButton,
  shouldForwardProp,
  Text,
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

const Lecture = ({ i }) => {
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
    <ChakraBox
      display="flex"
      boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
      minHeight="120px"
      flexDirection="column"
      padding="0.5rem"
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
    >
      <Flex
        w="100%"
        h="120px"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Flex
          w={["90%", "100%"]}
          justifyContent="space-between"
          paddingX={["0", 2]}
          Height="120px"
        >
          <Text>{i.time}</Text>
          <Text>{i.title}</Text>
        </Flex>
        <Divider />
        <Flex w="90%" justifyContent="space-between" alignItems="center">
          {displayStatus(i.status)}
          <Text>{i.hall}</Text>
        </Flex>
      </Flex>
      {i.note && (
        <ChakraBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="90%"
          h="30px"
          marginY={1}
          flexDirection="column"
          p={2}
          animate={{
            height: show ? "auto" : "30px",
          }}
          transition={{
            duration: 0.2,
            ease: "linear",
            type: "linear",
          }}
        >
          {show && (
            <T
              opacity={0}
              animate={{ opacity: show ? 1 : 0 }}
              transition={{
                duration: 0.25,
                ease: "linear",
              }}
            >
              {i.note}
            </T>
          )}
          <IconButton
            w="100%"
            my={1}
            variant="unStyled"
            h="30px"
            icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setShow(!show)}
          />
          {/* <Text>{i.note}</Text> */}
        </ChakraBox>
      )}
    </ChakraBox>
  );
};

export default Lecture;
