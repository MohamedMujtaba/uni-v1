import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Link from "next/link";
import { deleteAllCookies } from "../utils/deleteCookies";
import { useRouter } from "next/router";

const DrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        // colorScheme="teal"
        onClick={onOpen}
        icon={<HamburgerIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>UofK</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" gap="1rem">
              <span onClick={() => onClose()}>
                <Link href="/timeline">Time Line</Link>
              </span>
              <span onClick={() => onClose()}>
                <Link href="/announcement">Announcement</Link>
              </span>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <DarkModeSwitch />
            <IconButton
              marginLeft=".5rem"
              onClick={() => {
                onClose();
                deleteAllCookies();
                router.push("/");
              }}
              icon={<DeleteIcon />}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
