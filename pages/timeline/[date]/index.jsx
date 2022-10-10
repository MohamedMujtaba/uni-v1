import {
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Lecture from "../../../components/Lecture";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const Day = () => {
  const [params, setParams] = useState({ year: "", dep: "" });
  const router = useRouter();
  const [lectures, SetLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { year, dep } = useSelector((store) => store.params);
  const toast = useToast();
  const [n, setN] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    let x = document.cookie;
    x = x.split("; ");
    x = x.map((i) => {
      return i.split("=")[1];
    });
    setParams({
      year: x[0],
      dep: x[1],
    });
  }, []);
  const getDayOfTheWeek = (date) => {
    const d = new Date(date);
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[d?.getDay()];
  };
  useEffect(() => {
    // let x = document.cookie;
    // x = x.split("; ");
    // x = x.map((i) => {
    //   return i.split("=")[1];
    // });
    // setParams({
    //   year: x[0],
    //   dep: x[1],
    // });
    const getData = async () => {
      try {
        setLoading(true);
        // `https://uni-api-v1.vercel.app/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
        const res = await axios.get(
          // `https://uni-api-v1.herokuapp.com/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
          `https://uni-api-v1.vercel.app/api/v1/lecture?date=${router.query["date"]}&dep=${dep}&year=${year}`,
          {
            headers: { "Cache-Control": "max-age=60" },
          }
        );
        SetLectures(res.data.lectures);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);

        toast({
          title: "Something went wrong",
          description: "Please reload the page",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    getData();
  }, [dep, year, router.query, toast]);
  if (loading) {
    return (
      <Container>
        <VStack w="100%" gap={1}>
          <Skeleton
            mt={4}
            height="40px"
            boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
            padding="0.5rem"
            width="100%"
          />
          <Skeleton
            height="130px"
            boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
            padding="0.5rem"
            width={["100%", "40%", "30%"]}
          />
          <Skeleton
            height="130px"
            boxShadow="1px 1px 3px 0px rgba(0,0,0,0.1)"
            padding="0.5rem"
            width={["100%", "40%", "30%"]}
          />
        </VStack>
      </Container>
    );
  } else {
    if (lectures.length === 0) {
      return (
        <Container>
          <Flex h="30vh" w="100%" flexDirection="column">
            <Flex
              w="100%"
              maxW="50vw"
              alignItems="center"
              justifyContent="space-between"
              marginBottom="4"
            >
              <IconButton
                variant="ghost"
                icon={<ArrowBackIcon />}
                onClick={() => router.back()}
              />
              <Heading size="sm">{router.query["date"]}</Heading>
              {/* <Heading size="sm">{getDayOfTheWeek(router.query["date"])}</Heading> */}
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="center" h="40vh">
              <Heading size="lg">No Lectures for now</Heading>
            </Flex>
          </Flex>
        </Container>
      );
    }

    return (
      <Container>
        <NoteComponent
          onClose={onClose}
          isOpen={isOpen}
          note={n}
          setNote={setN}
        />
        <Flex flexDirection="column" w="100%">
          <Flex
            w="100%"
            maxW="50vw"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="4"
          >
            <IconButton
              variant="ghost"
              icon={<ArrowBackIcon />}
              onClick={() => router.back()}
            />
            <Heading size="sm">{router.query["date"]}</Heading>
            {/* <Heading size="sm">{getDayOfTheWeek(router.query["date"])}</Heading> */}
          </Flex>
          <Flex w="100%" gap="1rem" wrap="wrap" mb={8}>
            {lectures.map((i) => {
              return (
                <Lecture i={i} key={i._id} onOpen={onOpen} setNote={setN} />
              );
            })}
          </Flex>
        </Flex>
      </Container>
    );
  }
};
const NoteComponent = ({ note, isOpen, onClose, setNote }) => {
  return (
    <Modal
      size="xs"
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setNote("");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{note}</ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Day;
