import { CheckIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, IconButton, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Container from "../components/Container";
import Item from "../components/Item";
import MenuComponent from "../components/MenuComponent";
import Navbar from "../components/Navbar";
import { saveParams } from "../redux/paramsSlice";
export default function Home() {
  const router = useRouter();
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const handleLocalStorage = () => {
    setIsDisabled(true);
    document.cookie = `year=${year}`;
    document.cookie = `major=${major}`;
    dispatch(saveParams({ year, dep: major }));
    router.push("/timeline");
  };

  return (
    <Container HH={"80vh"}>
      <Flex
        w="100%"
        h="80%"
        flexDirection="column"
        justifyContent="center"
        gap="1rem"
      >
        <Heading>Welcome to UofK time </Heading>
        <Heading> management system </Heading>
        <Heading size="sm"> -beta-</Heading>
        <Heading size="lg">Choose your year and major </Heading>
        <Flex gap="1rem">
          <MenuComponent
            options={["021", "020", "019", "018", "017", "016"]}
            select={year}
            setSelect={setYear}
            title={"Year"}
          />
          <MenuComponent
            options={["Pet", "EE", "Mec", "Civ", "Agr", "Min", "Chem", "Sur"]}
            select={major}
            setSelect={setMajor}
            title={"Major"}
          />

          {year && major && !isDisabled && (
            <IconButton
              disabled={isDisabled}
              colorScheme="teal"
              icon={<CheckIcon />}
              onClick={handleLocalStorage}
            />
          )}
          {isDisabled && <Spinner />}
        </Flex>
      </Flex>
    </Container>
  );
}
