"use client";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function TopNav() {
  const router = useRouter();
  const { data, status } = useSession();
  const user = data?.user;

  return (
    <div className="h-24 sticky top-0 ml-0 sm:ml-24 md:ml-64 p-4 border-b flex items-center justify-between bg-white">
      <Image
        src={"/logo.svg"}
        className=" h-14 w-14 block sm:hidden"
        alt={"logo"}
        width={100}
        height={70}
      />
      <SearchBar />
      {!user ? (
        <button onClick={() => router.push("/login")}>Login</button>
      ) : (
        <div>
          <h4>Hello {user.name}</h4>
          {/*
           <UserButton />
          <button onClick={() => router.push("/profile")}>Profile</button> */}
          <button onClick={() => signOut({ callbackUrl: "/login" })}>
            Sign out
          </button>{" "}
        </div>
      )}
    </div>
  );
}
