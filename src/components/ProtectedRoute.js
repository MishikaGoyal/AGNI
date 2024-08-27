// components/ProtectedRoute.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function ProtectedRoute({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      setIsVerified(true);
    } catch (error) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
    }
  }, [router]);

  if (!isVerified) {
    return null; // or a loading indicator
  }

  return children;
}
