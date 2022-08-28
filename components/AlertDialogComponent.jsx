import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Box,
} from "@chakra-ui/react";
import React from "react";
const AlertDialogComponent = ({
  isButton = true,
  ButtonTitle = "open",
  icon = <WarningTwoIcon />,
  header = "Header",
  body = "body",
  f = () => {},
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <>
        {isButton ? (
          <Button onClick={onOpen} mx={3}>
            {ButtonTitle}
          </Button>
        ) : (
          <IconButton mx={3} icon={icon} onClick={onOpen} />
        )}
      </>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Box display="flex" alignItems="center">
              {body}
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                f();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogComponent;
