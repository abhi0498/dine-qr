import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const getSession = async () => {
  const session = await getIronSession<any>(cookies(), {
    password:
      process.env.SECRET_COOKIE_PASSWORD! ||
      "complex_password_at_least_32_characters_long",
    cookieName: "session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
  return session;
};

export default getSession;
