import { Flex } from "@chakra-ui/react";
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
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://uni-api-v1.herokuapp.com/api/v1/lecture?date=${router.query["date"]}&dep=${params.dep}&year=${params.year}`
      );
      SetLectures(res.data.lectures);
    } catch (error) {
      console.log(error);
      () =>
        toast({
          title: "Something went wrong",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Flex w="100%" gap="1rem" wrap="wrap">
        {lectures.map((i) => {
          return <Lecture i={i} key={i._id} />;
        })}
      </Flex>
    </Container>
  );
};

export default Day;
