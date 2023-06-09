import {
  Heading,
  Flex,
  Input,
  Button,
  Link,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, setNewName } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      await setNewName(nameRef.current.value);
      router.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <Box
      style={{
        backgroundImage: `url(/groupRunning.svg)`,
        height: "90vh",
        backgroundSize: "cover",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      <Flex
        height="90vh"
        width="full"
        paddingTop="100px"
        alignItems="center"
        direction={"column"}
        justifyContent={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}> Sign Up </Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                id="displayName"
                placeholder="enter full name"
                ref={nameRef}
                variant="filled"
                mb={3}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                placeholder="enter email"
                ref={emailRef}
                variant="filled"
                mb={3}
                type="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                placeholder="password"
                variant="filled"
                ref={passwordRef}
                mb={6}
                type="password"
                width="300px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="confirm password"
                variant="filled"
                ref={passwordConfirmRef}
                mb={6}
                type="password"
              />
            </FormControl>
            {/* <Select
              placeholder="Select option"
              mb={6}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Select> */}
            <Button disabled={loading} colorScheme="teal" type="submit">
              Sign Up
            </Button>
          </form>
          <div
            className="w-100 text-center mt-2"
            style={{ paddingTop: "15px" }}
          >
            Already have an account? <Link href="/Login">Log In</Link>
          </div>
        </Flex>
      </Flex>
    </Box>
  );
}
