// import { Badge, Checkbox, Flex, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import MenuComponent from "../../components/MenuComponent";
import { AddIcon, DragHandleIcon } from "@chakra-ui/icons";
import axios from "axios";
import ModalComponent from "../../components/ModalComponent";
const Index = () => {
  const [lectures, setLectures] = useState([]);
  const [title, setTitle] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dep, setDep] = useState("");
  const [year, setYear] = useState("");
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
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://uni-api-v1.herokuapp.com/api/v1/lecture?title=${title}&hall=${hall}&date=${date}&time=${time}&dep=${dep}&year=${year}`
      );
      setLectures(res.data.lectures);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    console.log(lectures);
  }, [title, hall, date, time, dep, year]);
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
          <Flex>
            <Popover placement="auto-start">
              <PopoverTrigger>
                {/* <Button>Trigger</Button> */}
                <IconButton icon={<DragHandleIcon />} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Filters</PopoverHeader>
                <PopoverBody>
                  <Flex gap="1rem">
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
                      w="40%"
                      select={year}
                      setSelect={setYear}
                      options={["", "021", "020", "019", "018", "017", "016"]}
                    />
                    <MenuComponent />
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
        <TableContainer
          w="100%"
          h="90%"
          overflow="auto"
          border="solid 1px"
          borderRadius="lg"
          borderColor="gray.200"
        >
          <Table>
            <Thead>
              <Tr>
                <Th w="100px">
                  <Checkbox />
                </Th>
                <Th>Title</Th>
                <Th>Department</Th>
                <Th>Year</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lectures.map((lecture) => {
                return (
                  <Tr key={lecture._id}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{lecture.title}</Td>
                    <Td>{lecture.dep}</Td>
                    <Td>{lecture.year}</Td>
                    <Td>{lecture.date}</Td>
                    <Td>{displayStatus(lecture.status)}</Td>
                    <Td>Actions</Td>
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

export default Index;
