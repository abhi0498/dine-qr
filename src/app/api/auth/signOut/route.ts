import getSession from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ message: "Signed out" }, { status: 200 });
};
