import {
  AddIcon,
  CheckIcon,
  DragHandleIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
  Input,
  Flex,
  InputGroup,
  FormLabel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuComponent from "./MenuComponent";

const EditModal = ({
  refresh,
  lecture,
  setLecture,
  onClose,
  onOpen,
  isOpen,
}) => {
  const [title, setTitle] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dep, setDep] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // FIXME:
  // const getLecture = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://uni-api-v1.herokuapp.com/api/v1/lecture/${id}`
  //     );
  //   } catch (error) {
  //     toast({
  //       title: "Something went wrong",
  //       description: error.response.data.meg,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    setTitle(lecture?.title);
    setHall(lecture?.hall);
    setDate(lecture?.date);
    setTime(lecture?.time);
    setDep(lecture?.dep);
    setYear(lecture?.year);
    setStatus(lecture?.status);
  }, [lecture]);

  const handelSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `https://uni-api-v1.herokuapp.com/api/v1/lecture/${lecture._id}`,
        {
          title,
          hall,
          date,
          time,
          dep,
          year,
          status,
        }
      );
      setLoading(false);

      onClose();
      refresh();
      setTitle("");
      setHall("");
      setDate("");
      setTime("");
      setDep("");
      setYear("");
      setStatus("");
      setLecture(null);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: error.response.data.meg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  const Val = () => {
    if (!title || !date || !time || !dep || !hall || !year) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setLecture(null);
    }
  }, [isOpen]);
  return (
    <>
      {/* <IconButton onClick={onOpen} icon={<AddIcon />} colorScheme="teal" /> */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new lecture</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" gap=".5rem" flexDirection="column">
            <InputGroup flexDirection="column">
              <FormLabel>Lecture Title</FormLabel>
              <Input
                value={title}
                placeholder="Title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
            <InputGroup flexDirection="column">
              <FormLabel>Lecture Hall</FormLabel>
              <Input
                value={hall}
                placeholder="Hall"
                type="text"
                onChange={(e) => setHall(e.target.value)}
              />
            </InputGroup>
            <Flex gap="1rem">
              <InputGroup flexDirection="column" w="60%">
                <FormLabel>Date</FormLabel>
                <Input
                  value={date}
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </InputGroup>
              <InputGroup flexDirection="column" w="40%">
                <FormLabel>Time</FormLabel>
                <Input
                  value={time}
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                />
              </InputGroup>
            </Flex>
            <Flex gap="1rem" marginTop=".5rem">
              <MenuComponent
                title="Department"
                w="40%"
                select={dep}
                setSelect={setDep}
                options={[
                  "Pet",
                  "EE",
                  "Mec",
                  "Civ",
                  "Agr",
                  "Min",
                  "Chem",
                  "Sur",
                ]}
              />
              <MenuComponent
                title="Year"
                w="40%"
                select={year}
                setSelect={setYear}
                options={["021", "020", "019", "018", "017", "016"]}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            {loading ? (
              <Spinner />
            ) : (
              <IconButton
                onClick={handelSubmit}
                icon={<CheckIcon color="green.500" />}
                disabled={Val()}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditModal;
