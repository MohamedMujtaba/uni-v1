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
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuComponent from "./MenuComponent";

const EditModal = ({
  refresh,
  lecture,
  setLecture,
  onClose,
  onOpen,
  isOpen,
}) => {
  const { role, year, dep } = useSelector((state) => state.admin);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [depL, setDepL] = useState("");
  const [yearL, setYearL] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // FIXME:
  // const getLecture = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://uni-api-v1.vercel.app/api/v1/lecture/${id}`
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
    setCode(lecture?.code);
    setHall(lecture?.hall);
    setDate(lecture?.date);
    setTime(lecture?.time);
    setDepL(lecture?.dep);
    setYearL(lecture?.year);
    setNote(lecture?.note);
    setStatus(lecture?.status);
  }, [lecture]);

  const handelSubmit = async () => {
    setLoading(true);
    let y;
    let d;
    if (role === "admin") {
      y = year;
      d = dep;
    }
    if (role === "superAdmin") {
      y = yearL;
      d = depL;
    }
    try {
      await axios.patch(
        `https://uni-api-v1.vercel.app/api/v1/lecture/${lecture._id}`,
        {
          title,
          code,
          hall,
          date,
          time,
          dep: d,
          year: y,
          status,
          note,
        }
      );
      setLoading(false);

      onClose();
      refresh();
      setTitle("");
      setCode("");
      setHall("");
      setDate("");
      setTime("");
      setDepL("");
      setYearL("");
      setNote("");

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
    if (!title || !date || !time || !hall || !code) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setLecture(null);
    }
  }, [isOpen, setLecture]);
  return (
    <>
      {/* <IconButton onClick={onOpen} icon={<AddIcon />} colorScheme="teal" /> */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit lecture</ModalHeader>
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
              <FormLabel>Lecture Code</FormLabel>
              <Input
                value={code}
                placeholder="Code"
                type="text"
                onChange={(e) => setCode(e.target.value)}
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
            <InputGroup flexDirection="column">
              <FormLabel>Note</FormLabel>
              <Textarea
                value={note}
                placeholder="Note if any"
                type="text"
                onChange={(e) => setNote(e.target.value)}
              />
            </InputGroup>
            <Flex gap="1rem">
              <InputGroup flexDirection="column" w="60%">
                <FormLabel>Date</FormLabel>
                {/* <Input
                  value={date}
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setDate(e.target.value)}
                /> */}
                <MenuComponent
                  title="Day"
                  // w="20%"
                  select={date}
                  setSelect={setDate}
                  options={[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ]}
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
                disabled={role === "admin"}
                title="Department"
                w="20%"
                select={depL || dep}
                setSelect={setDepL}
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
                disabled={role === "admin"}
                title="Year"
                w="30%"
                select={yearL || year}
                setSelect={setYearL}
                options={["021", "020", "019", "018", "017", "016"]}
              />
              <MenuComponent
                title="status"
                w="30%"
                select={status}
                setSelect={setStatus}
                options={["listed", "unknown", "canceled"]}
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
