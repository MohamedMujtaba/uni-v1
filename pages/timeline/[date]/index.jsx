import { Flex } from "@chakra-ui/react";
import Container from "../../../components/Container";
import Lecture from "../../../components/Lecture";

const Day = () => {
  return (
    <Container>
      <Flex w="100%" flexDirection="column" gap="1rem">
        <Lecture
          i={{
            title: "محاضره اساسيات الهندسه الكهربائيه",
            hole: "ES32",
            status: "unknown",
            time: "8:00",
          }}
        />
        <Lecture
          i={{
            title: "محاضره اساسيات المساحه",
            hole: "الوسطى",
            status: "existing",
            time: "1:00",
          }}
        />
        <Lecture
          i={{
            title: "محاضره اساسيات الرسم",
            hole: "B22",
            status: "canceled",
            time: "3:00",
          }}
        />
      </Flex>
    </Container>
  );
};

export default Day;
