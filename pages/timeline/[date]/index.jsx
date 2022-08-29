import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import Lecture from "../../../components/Lecture";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const Day = () => {
  const [params, setParams] = useState({ year: "", dep: "" });
  const router = useRouter();
  const [lectures, SetLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const toast = useToast();
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
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://uni-api-v1.herokuapp.com/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
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
  }, [params.dep, params.year, router.query, toast]);
  if (loading) {
    return (
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  } else {
    if (lectures.length === 0) {
      return <Heading>No Lectures for now</Heading>;
    }

    return (
      <Container>
        <Flex flexDirection="column" w="100%">
          <Flex
            w="100%"
            maxW="400px"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="4"
          >
            <Heading size="sm">{router.query["date"]}</Heading>
            <Heading size="sm">{getDayOfTheWeek(router.query["date"])}</Heading>
          </Flex>
          <Flex w="100%" gap="1rem" wrap="wrap">
            {lectures.map((i) => {
              return <Lecture i={i} key={i._id} />;
            })}
          </Flex>
        </Flex>
      </Container>
    );
  }
};

export default Day;
