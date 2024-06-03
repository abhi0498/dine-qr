import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dine QR",
  description: "Dine QR",
};

// app/layout.tsx
import Providers from "../providers/Chakra";
import getSession from "@/utils/session";
import SimpleSidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  console.log(session.isLoggedIn);

  if (session.isLoggedIn) {
    return (
      <>
        <SimpleSidebar>{children}</SimpleSidebar>
      </>
    );
  } else return <>{children}</>;
};
