import Users from "@/models/Users";
import connectDB from "@/utils/connectDb";
import getSession from "@/utils/session";
import {
  Button,
  Card,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";

const UsersPage = async () => {
  const session = await getSession();
  await connectDB();

  const users = await Users.find({
    username: { $ne: session.user.username },
  });
  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"} mb={5}>
        <Heading size="lg">Users</Heading>
        <Button colorScheme="blue" as={Link} href="/users/new">
          Add User
        </Button>
      </Stack>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {users.map((user) => (
          <Card p={5} key={user._id}>
            {user.username}
            <IconButton
              as={Link}
              href={`/users/${user._id}`}
              color="blue.500"
              boxSize={5}
              ml={2}
              aria-label="Edit user"
            >
              <FiEdit2 />
            </IconButton>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default UsersPage;
