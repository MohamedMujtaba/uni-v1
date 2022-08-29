// import { Badge, Checkbox, Flex, IconButton } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Badge,
  Checkbox,
  Flex,
  IconButton,
  useToast,
  Button,
  Input,
  InputGroup,
  TagLabel,
  FormLabel,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import MenuComponent from "../../components/MenuComponent";
import {
  AddIcon,
  DeleteIcon,
  DragHandleIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import ModalComponent from "../../components/ModalComponent";
import AlertDialogComponent from "../../components/AlertDialogComponent";
import EditModal from "../../components/EditModal";
const Index = () => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [title, setTitle] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dep, setDep] = useState("");
  const [year, setYear] = useState("");
  const [deleteArr, setDeleteArr] = useState([]);
  const [s, setS] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

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
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://uni-api-v1.herokuapp.com/api/v1/lecture?title=${title}&hall=${hall}&date=${date}&time=${time}&dep=${dep}&year=${year}`
      );
      setLectures(res.data.lectures);
    } catch (error) {
      console.log(error);
    }
  }, [date, dep, hall, time, title, year]);

  const handleDelete = async () => {
    try {
      await axios.delete("https://uni-api-v1.herokuapp.com/api/v1/lecture", {
        data: { arr: deleteArr },
      });

      toast({
        title: "OK",
        description: "Items/item has been deleted",
        status: "success",
      });
      setDeleteArr([]);
      getData();
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Items/item not deleted",
        status: "error",
      });
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);
  const handleS = () => {
    let a = lectures.map((i) => i._id);
    if (deleteArr.length !== a.length) {
      setS(true);
      setDeleteArr(a);
    } else {
      setS(false);
      setDeleteArr([]);
    }
  };
  useEffect(() => {
    let a = lectures.map((i) => i._id);
    if (deleteArr.length !== a.length) {
      setS(false);
    } else {
      setS(true);
    }
  }, [deleteArr, lectures]);

  useEffect(() => {
    if (lecture) {
      onOpen();
    } else {
      onClose();
    }
  }, [lecture, onClose, onOpen]);
  return (
    <Container HH="88vh">
      <Flex w="100%" height="100%" flexDirection="column">
        <Flex
          w="100%"
          marginBottom="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <ModalComponent refresh={getData} />
          <EditModal
            refresh={getData}
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            lecture={lecture}
            setLecture={setLecture}
          />
          <Flex>
            {deleteArr.length !== 0 && (
              <AlertDialogComponent
                header="Delete selected?"
                body={
                  <Text>
                    Are you sure you want to delete all selected
                    <Badge mx={1} colorScheme="red">
                      {deleteArr.length}
                    </Badge>
                  </Text>
                }
                isButton={false}
                icon={<DeleteIcon />}
                f={handleDelete}
              />
            )}

            <Popover placement="auto-start" w={"auto"} maxW={["90vw", "40vw"]}>
              <PopoverTrigger>
                {/* <Button>Trigger</Button> */}
                <IconButton icon={<DragHandleIcon />} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Filters</PopoverHeader>
                <PopoverBody>
                  <Flex gap="1rem" flexWrap={"wrap"} p={2}>
                    <MenuComponent
                      title="Department"
                      select={dep}
                      setSelect={setDep}
                      options={[
                        "",
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
                      select={year}
                      setSelect={setYear}
                      options={["", "021", "020", "019", "018", "017", "016"]}
                    />
                    <MenuComponent />
                    <InputGroup flexDirection="column">
                      <FormLabel>Date</FormLabel>
                      <Input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup flexDirection="column">
                      <FormLabel>Time</FormLabel>
                      <Input
                        type="time"
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </InputGroup>
                    <Flex>
                      <Button
                        onClick={() => {
                          setDate("");
                          setTime("");
                          setDep("");
                          setYear("");
                        }}
                      >
                        Clear filters
                      </Button>
                    </Flex>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
        <TableContainer
          w="100%"
          // minH="90%"
          overflow="auto"
          overflowY="auto"
          border="solid 1px"
          borderRadius="lg"
          borderColor="gray.200"
          p={3}
          _dark={{
            borderColor: "whiteAlpha.300",
          }}
        >
          <Table>
            <Thead>
              <Tr>
                <Th w="100px">
                  <Checkbox isChecked={s} onChange={handleS} />
                </Th>
                <Th>Title</Th>
                <Th>Department</Th>
                <Th>Year</Th>
                <Th>Date</Th>
                <Th textAlign="center">Status</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lectures.map((lecture) => {
                return (
                  <Tr key={lecture._id}>
                    <Td>
                      <Check
                        deleteArr={deleteArr}
                        setDeleteArr={setDeleteArr}
                        id={lecture._id}
                      />
                    </Td>
                    <Td>{lecture.title}</Td>
                    <Td>{lecture.dep}</Td>
                    <Td>{lecture.year}</Td>
                    <Td>{lecture.date}</Td>
                    <Td textAlign="center">{displayStatus(lecture.status)}</Td>
                    <Td textAlign="center">
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<InfoIcon />}
                        onClick={() => setLecture(lecture)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  );
};
const Check = ({ deleteArr, setDeleteArr, id }) => {
  const [is, setIs] = useState(false);
  const handleChange = () => {
    if (!deleteArr.includes(id)) {
      // setIs(true);
      setDeleteArr([...deleteArr, id]);
    }
    if (deleteArr.includes(id)) {
      let arr = deleteArr.filter((i) => i !== id);
      setDeleteArr(arr);
      // setIs(false);
    }
  };
  useEffect(() => {
    if (deleteArr.includes(id)) {
      setIs(true);
    } else {
      setIs(false);
    }
  }, [deleteArr, id]);
  return <Checkbox isChecked={is} onChange={handleChange} />;
};

export default Index;
