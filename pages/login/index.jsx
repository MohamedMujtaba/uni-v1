import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { login, setError, setLoading } from "../../redux/adminSlice";
const App = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { username, role, dep, year, error, loading } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const router = useRouter();
  // const toast = useToast();
  const handleLogin = async () => {
    try {
      dispatch(setLoading({ isLoading: true }));
      const data = await axios.post(
        "https://uni-api-v1.vercel.app/api/v1/user/login",
        {
          username: userName,
          password,
        }
      );
      if (data) {
        const { username, role, dep, year } = data.data.user;
        dispatch(
          login({
            username,
            role,
            dep,
            year,
          })
        );
        dispatch(setLoading({ isLoading: false }));
        dispatch(setError({ err: "" }));
        router.push("/admin");
      }
    } catch (error) {
      dispatch(setError({ err: error.message }));
      dispatch(setLoading({ isLoading: false }));
    }

    // dispatch(login({ userName, password }));
  };
  // useEffect(() => {
  //   if (isAdmin) {
  //     router.push("/admin");
  //   }
  // }, [isAdmin, router]);

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       dispatch(setError({ err: null }));
  //     }, 5000);
  //   }
  // }, [error, dispatch]);
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          {error && (
            <>
              <Alert status="error" flexDirection="column" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Something went wrong</AlertTitle>
              </Alert>
            </>
          )}
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="userName">User Name</FormLabel>
                <Input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </FormControl>
              <PasswordField password={password} setPassword={setPassword} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox disabled defaultChecked>
                Remember me
              </Checkbox>
              {/* <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button> */}
            </HStack>
            <Stack spacing="6">
              <Button
                disabled={userName === "" || password === "" || loading}
                onClick={handleLogin}
              >
                {loading ? <Spinner /> : "Sign in"}
              </Button>
              <HStack>
                {/* <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider /> */}
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default App;
const PasswordField = React.forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);
  const { password, setPassword } = props;

  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          ref={mergeRef}
          name="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
});
PasswordField.displayName = "PasswordField";
