import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import Container from "./Container";
import DrawerComponent from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "./DarkModeSwitch";
const Navbar = () => {
  const router = useRouter();
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
            {/* {(!router.pathname === "/login" || !router.pathname === "/") && (
              <DrawerComponent />
            )} */}
            <H />
          </Flex>
        </Flex>
      </Container>
    </HStack>
  );
};
const H = () => {
  const router = useRouter();
  if (router.pathname === "/login" || router.pathname === "/") {
    return <DarkModeSwitch />;
  } else {
    return <DrawerComponent />;
  }
};
export default Navbar;
