import Container from "../../components/Container";
import {
  Flex,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Heading,
  VStack,
  Box,
} from "@chakra-ui/react";
const index = () => {
  return (
    <Container>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        mt={4}
        flexDirection="column"
      >
        <Flex
          spacing={4}
          wrap="wrap"
          width={["100%", "90%", "80%"]}
          h="auto"
          gap={4}
          alignItems="center"
          // justifyContent="center"
        >
          <VStack alignItems="flex-start" w="100%">
            <Heading size="md">Mohamed</Heading>
            <Box
              w="100%"
              wrap="wrap"
              gap={2}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Mohamed Mujtaba hassan</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
              <Tag m={1} size="md" borderRadius="full" variant="solid">
                <TagLabel>Green</TagLabel>
                <TagCloseButton />
              </Tag>
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default index;
