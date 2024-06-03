"use client";
import TextInput from "@/components/Form/TextInput";
import {
  Button,
  Card,
  CardBody,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import RolesDropdown from "./RolesDropdown";
import { Data, getUser, handleSubmit } from "./api";

const UserDetailPage = () => {
  const [state, setState] = useState<Data | any>(null);
  const [user, setUser] = useState<Data | any>(null);
  const { id } = useParams<{
    id: string;
  }>();

  useEffect(() => {
    if (id !== "new") {
      getUser(id).then((data) => {
        setUser(data);
      });
    }
  }, [id]);
  if (id !== "new" && !user) {
    return <div>Loading...</div>;
  }

  return (
    <form
      action={async (e) => {
        try {
          const data: any = await handleSubmit(e);
          setState(data);
          if (!data?.errors) {
            toast.success("User created successfully");
          }
        } catch (e: any) {
          toast.error(e.message || "Error creating user");
        }
      }}
    >
      <Stack justifyContent={"space-between"} direction={"row"} mb={5}>
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <IconButton
            as={Link}
            href="/users"
            color="blue.500"
            boxSize={10}
            ml={2}
            aria-label="Back to users"
          >
            <FiArrowLeft size={24} />
          </IconButton>
          <Heading size="lg">{id === "new" ? "Add User" : `Edit User`}</Heading>
        </Stack>
        <Button colorScheme="blue" type="submit">
          Save
        </Button>
      </Stack>

      <Card mt={5}>
        <CardBody>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing="40px"
          >
            <TextInput
              label="First name"
              name="firstName"
              placeholder="Enter first name"
              errorMessage={state?.errors?.firstName}
              defaultValue={user?.firstName}
            />
            <TextInput
              label="Last name"
              name="lastName"
              placeholder="Enter last name"
              errorMessage={state?.errors?.lastName}
              defaultValue={user?.lastName}
            />
            <TextInput
              label="Email / Username"
              name="username"
              placeholder="Enter email / username"
              helperText="We'll never share your email."
              errorMessage={state?.errors?.username}
              defaultValue={user?.username}
            />
            {/* <TextInput
              label="Role"
              name="role"
              placeholder="Enter role"
              errorMessage={state?.errors?.role}
            /> */}
            <RolesDropdown errorMessage={state?.errors?.role} />
            <TextInput
              label="Phone"
              name="phone"
              placeholder="Enter phone"
              errorMessage={state?.errors?.phone}
              defaultValue={user?.phone}
            />
            <div />
            {id === "new" && (
              <TextInput
                label="Password"
                type="password"
                name="password"
                errorMessage={state?.errors?.password}
                placeholder="Enter password"
              />
            )}
            {id === "new" && (
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                errorMessage={state?.errors?.confirmPassword}
                placeholder="Confirm password"
                type="password"
              />
            )}
          </SimpleGrid>
        </CardBody>
      </Card>
    </form>
  );
};

export default UserDetailPage;
