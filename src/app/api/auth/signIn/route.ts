import Users from "@/models/Users";
import connectDB from "@/utils/connectDb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import getSession from "@/utils/session";
import { comparePassword } from "@/utils/helper";

type ResponseData = {
  message: string;
};
export const POST = async (req: NextRequest) => {
  connectDB();
  const data: any = await req.json();

  try {
    const user = await Users.findOne({
      username: data.username,
    }).populate({
      path: "role",
      populate: {
        path: "permissions",
        select: "name",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { username, role } = user;
    if (comparePassword(data.password, user.password)) {
      // Generate iron session
      const session = await getSession();
      session.isLoggedIn = true;
      session.user = { username, role };
      await session.save();
      return NextResponse.json({ username, role }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
