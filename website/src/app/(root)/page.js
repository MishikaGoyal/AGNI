"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  router.push("/login");
  return <main className="">hello world</main>;
}
