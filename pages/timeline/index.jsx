import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import {
  Flex,
  Heading,
  Highlight,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Item from "../../components/Item";
import axios from "axios";

const data = [
  {
    _id: "dkjfh321i8320",
    date: 2 - 12 - 2022,
  },
  {
    _id: "dkjfh321i8320",
    date: 2 - 12 - 2022,
  },
  {
    _id: "dkjfh321i8320",
    date: 2 - 12 - 2022,
  },
];

const TimeLine = () => {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState([]);
  const toast = useToast();

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(
  //       // FIXME:
  //       `https://uni-api-v1.herokuapp.com/api/v1/lecture/days?dep=${params.dep}&year=${params.year}`
  //     );
  //     setDays(res.data.days);
  //     console.log(params);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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

  // useEffect(() => {
  //   let x = document.cookie;
  //   x = x.split("; ");
  //   x = x.map((i) => {
  //     return i.split("=")[1];
  //   });
  //   setParams({
  //     year: x[0],
  //     dep: x[1],
  //   });
  // }, []);
  useEffect(() => {
    // const getCookie = () => {
    //   let x = document.cookie;
    //   x = x.split("; ");
    //   x = x.map((i) => {
    //     return i.split("=")[1];
    //   });
    //   setParams({
    //     year: x[0],
    //     dep: x[1],
    //   });
    // };
    const getData = async () => {
      // getCookie();
      let x = document.cookie;
      x = x.split("; ");
      x = x.map((i) => {
        return i.split("=")[1];
      });
      try {
        setLoading(true);

        const res = await axios.get(
          // FIXME:
          `https://uni-api-v1.herokuapp.com/api/v1/lecture/days?dep=${x[1]}&year=${x[0]}`
        );
        setDays(res.data.days);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something went wrong",
          description: "please reload the page",
          status: "error",
        });
        console.log(error);
      }
    };
    getData();
  }, []);
  if (loading) {
    return (
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  } else {
    if (days.length === 0) {
      return (
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Heading>No thing for now</Heading>
        </Flex>
      );
    }
    return (
      <Container>
        <Flex width="100%" flexWrap="wrap" gap="1rem">
          {days.map((i) => (
            // FIXME: may need to change the incoming data to include _id
            <Item key={i} hr={`timeline/${i}`}>
              <Flex
                width="100%"
                h="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text>{getDayOfTheWeek(i)}</Text>
                <Text>{i}</Text>
              </Flex>
            </Item>
          ))}
        </Flex>
      </Container>
    );
  }
};

export default TimeLine;
