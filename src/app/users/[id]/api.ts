"use server";
import Roles from "@/models/Roles";
import Users from "@/models/Users";
import connectDB from "@/utils/connectDb";
import { redirect } from "next/navigation";
import { z } from "zod";
import { hashPassword } from "@/utils/helper";

export type Data = {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  phone: string;
  password: string;
  confirmPassword?: string;
};

const schema = z.object({
  username: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .email("Invalid Email"),
  password: z
    .string({
      invalid_type_error: "Invalid Password",
    })
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  role: z
    .string({
      invalid_type_error: "Invalid Role",
    })
    .min(1, "Role is required"),
  phone: z.string(),
});

export async function handleSubmit(formData: FormData) {
  "use server";

  const data: any = Object.fromEntries(formData);

  if (data.password !== data.confirmPassword) {
    console.log("Passwords do not match");

    return {
      errors: { confirmPassword: "Passwords do not match" },
    };
  }
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
  // hash password
  data.password = hashPassword(data.password);
  delete data.confirmPassword;
  await Users.create(data);
  redirect("/users");
}

export async function getRoles() {
  await connectDB();
  const roles = await Roles.find();
  return JSON.parse(JSON.stringify(roles));
}

export async function getUser(id: string) {
  await connectDB();
  if (!id) return;
  console.log("id", id);
  const user = await Users.findOne({ _id: id }, { password: 0, role: 0 });

  console.log(JSON.stringify(user));

  return JSON.parse(JSON.stringify(user));
}
