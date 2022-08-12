import { Flex } from "@chakra-ui/react";
import Link from "next/link";

const Item = ({ children, hr = "" }) => {
  return (
    <Link href={hr}>
      <Flex
        boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
        height="120px"
        padding="0.5rem"
        width={["100%", "40%", "30%"]}
        // borderRadius="sm"
        borderRightWidth="3px"
        borderRightColor="blue.400"
        borderRightRadius="sm"
        // marginY=".5rem"
        cursor="pointer"
        alignItems="center"
        paddingLeft="2rem"
        _dark={{
          boxShadow: "1px 1px 3px 0px rgba(255, 255, 255, 0.1)",
          borderRightColor: "blue.200",
        }}
      >
        {children}
      </Flex>
    </Link>
  );
};

export default Item;
