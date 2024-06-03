import Users from "@/models/Users";
import connectDB from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();
  const { id } = params;
  const user = await Users.findById(id);
  return NextResponse.json(user);
};
