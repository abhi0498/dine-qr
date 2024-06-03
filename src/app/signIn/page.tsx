"use client";
import {
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Stack,
  StackItem,
} from "@chakra-ui/react";
import { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "/";
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      mt="20vh"
      w="100vw"
      h="100vh"
      gap={5}
    >
      <StackItem>
        <Heading as="h2" size="2xl" noOfLines={1}>
          Dine QR
        </Heading>
      </StackItem>
      <Card
        w={{
          base: "90vw",
          sm: "80vw",
          md: "60vw",
          lg: "40vw",
          xl: "30vw",
        }}
      >
        <CardBody display={"flex"} flexDirection={"column"} gap={5}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSubmit}>Sign In</Button>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default SignInPage;
