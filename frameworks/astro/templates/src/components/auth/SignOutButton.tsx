"use client";

import { useState } from "react";
import { createAuthClient } from "@/lib/auth-client";

const authClient = createAuthClient();

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}