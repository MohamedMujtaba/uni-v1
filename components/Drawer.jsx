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

const DrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              <Link href="#">Announcement</Link>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <DarkModeSwitch />
            {/* <IconButton
              onClick={() => (document.cookie = "year=")}
              icon={<DeleteIcon />}
            /> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
