"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function ProtectedRoute({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to extract the token from cookies
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const token = getCookie("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // Verify the token using the public secret from environment variables
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      setIsVerified(true);
    } catch (error) {
      // Clear the invalid token and redirect to login
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
    }
  }, [router]);

  // While verifying, return nothing
  if (!isVerified) {
    return null;
  }

  // Render children once verified
  return children;
}
