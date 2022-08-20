import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import Container from "./Container";
import DrawerComponent from "./Drawer";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  // console.log(router.pathname);
  return (
    <HStack width="100vw" height="70px">
      <Container>
        <Flex
          position="relative"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* {!router.pathname === "/timeline" && (
            <IconButton
              onClick={() => router.back()}
              icon={<ArrowBackIcon />}
            />
          )} */}
          <Flex position="absolute" right="0">
            <DrawerComponent />
          </Flex>
        </Flex>
      </Container>
    </HStack>
  );
};

export default Navbar;
