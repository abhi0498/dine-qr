"use server";
import connectDB from "@/utils/connectDb";
import { redirect } from "next/navigation";
import { z } from "zod";
import { hashPassword } from "@/utils/helper";
import Restaurant from "@/models/Restaurant";

const schema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  website: z.string().nullable(),
});

export const createRestaurant = async (formData: FormData) => {
  const data: any = Object.fromEntries(formData.entries());
  const validatedFields = schema.safeParse({
    ...data,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    const errors: any = validatedFields.error.flatten().fieldErrors;
    return {
      errors: Object.keys(errors).reduce((acc: any, key) => {
        acc[key] = errors[key].join("\n ");
        return acc;
      }, {}),
    };
  }

  await connectDB();
  await Restaurant.create({
    ...data,
  });
  redirect("/restaurants");
};

export const getRestaurant = async (id: string) => {
  await connectDB();
  const restaurant = await Restaurant.findOne({ _id: id });
  return JSON.parse(JSON.stringify(restaurant));
};
