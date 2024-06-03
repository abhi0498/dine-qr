"use client";
import TextInput from "@/components/Form/TextInput";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { createRestaurant, getRestaurant } from "./api";
import toast from "react-hot-toast";

const RestaurantDetails = () => {
  const {
    id,
  }: {
    id: string;
  } = useParams();
  const [state, setState] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    getRestaurant(id).then((data: any) => {
      setRestaurant(data);
    });
  }, [id]);

  if (id !== "new" && !restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <form
      action={async (e) => {
        try {
          const data: any = await createRestaurant(e);
          setState(data);
          if (!data?.errors) {
            toast.success("Restaurant created successfully");
          }
        } catch (e: any) {
          toast.error(e.message || "Error creating restaurant");
        }
      }}
    >
      <Stack justifyContent={"space-between"} direction={"row"} mb={5}>
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <IconButton
            as={Link}
            href="/restaurants"
            color="blue.500"
            boxSize={10}
            ml={2}
            aria-label="Back to restaurants"
          >
            <FiArrowLeft size={24} />
          </IconButton>
          <Heading size="lg">Restaurant</Heading>
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
              label="Name"
              placeholder="Enter restaurant name"
              name="name"
              required
              errorMessage={state?.errors?.name}
              defaultValue={restaurant?.name}
            />
            <TextInput
              label="Description"
              placeholder="Enter Description"
              name="description"
              defaultValue={restaurant?.description}
            />
            <TextInput
              label="Website"
              placeholder="Enter website"
              name="website"
              defaultValue={restaurant?.website}
            />
          </SimpleGrid>
        </CardBody>
      </Card>

      <Card mt={5}>
        <CardHeader>
          <Heading size="md">Branches</Heading>
        </CardHeader>
      </Card>
    </form>
  );
};

export default RestaurantDetails;
