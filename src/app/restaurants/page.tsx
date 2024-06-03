import Restaurant from "@/models/Restaurant";
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

  const users = await Restaurant.find({});

  return (
    <div>
      <Stack justifyContent={"space-between"} direction={"row"} mb={5}>
        <Heading size="lg">Restaurants</Heading>
        <Button colorScheme="blue" as={Link} href="/restaurants/new">
          Add Restaurant
        </Button>
      </Stack>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {users.map((user) => (
          <Card p={5} key={user._id as string}>
            {user.name}
            <IconButton
              as={Link}
              href={`/restaurants/${user._id}`}
              color="blue.500"
              boxSize={5}
              ml={2}
              aria-label="Edit Restaurant"
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
