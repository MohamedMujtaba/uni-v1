import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "../../components/Container";
import { Flex, Highlight, Input, Text } from "@chakra-ui/react";
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
  const [params, setParams] = useState({});
  const [days, setDays] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://uni-api-v1.herokuapp.com/api/v1/lecture"
      );
      setDays(res.data.lectures);
    } catch (error) {
      console.log(error);
    }
  };
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
    getData();
  }, []);
  console.log(days);
  return (
    <Container>
      <Flex width="100%" flexDirection="column" gap="1rem">
        {data.map((i, index) => (
          <Item key={index.toString()} hr="timeline/123">
            <Flex
              width="100%"
              h="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text>الجمعه</Text>
              <Text>12-8-2022</Text>
            </Flex>
          </Item>
        ))}
      </Flex>
    </Container>
  );
};

export default TimeLine;
