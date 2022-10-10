import { useCallback, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

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
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState([]);
  const toast = useToast();
  const { year, dep } = useSelector((store) => store.params);

  const getDays = useCallback(async () => {
    setLoading(true);

    const res = await axios.get(
      `https://uni-api-v1.vercel.app/api/v1/lecture/get-number-of-lectures?dep=${dep}&year=${year}`
    );
    setDays(res.data.lectures);
    setLoading(false);
    // console.log(days);
    // console.log(days.some((d) => d["_id"] === "Sunday"));
  }, [dep, year]);

  useEffect(() => {
    getDays();
  }, [getDays]);

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

  // if (loading) {
  //   return (
  //     <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
  //       <Spinner size="lg" />
  //     </Flex>
  //   );
  // } else {
  return (
    <Container>
      <Flex width="100%" flexWrap="wrap" gap="1rem">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((i) => (
          // FIXME: may need to change the incoming data to include _id
          <Item key={i} hr={`timeline/${i}`}>
            <Flex
              width="90%"
              h="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text>{i}</Text>
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <Text>
                  {days?.some((d) => d._id === i)
                    ? days?.filter((t) => t._id === i)[0]["count"]
                    : 0}
                </Text>
              )}
            </Flex>
          </Item>
        ))}
      </Flex>
    </Container>
  );
  // }
};

export default TimeLine;
