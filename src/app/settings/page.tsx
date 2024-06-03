"use client";
import getSession from "@/utils/session";
import { Button } from "@chakra-ui/react";
import {} from "iron-session";

function SettingsPage() {
  const handleSignOut = async () => {
    await fetch("/api/auth/signOut", {
      method: "POST",
    }).then(() => {
      window.location.href = "/";
    });
  };
  return (
    <div>
      <h1>Settings</h1>
      <Button colorScheme="blue" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default SettingsPage;
