"use client";

import { useState } from "react";
import { createAuthClient } from "@/lib/auth-client";

const authClient = createAuthClient();

export default function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}