"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import TitleLogo from "@/app/_components/TitleLogo";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/browse");
    }
  }, [sessionStatus, router]);

  const emailIsValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = user.email;
    const password = user.password;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!emailIsValid(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/browse");
    } else if (res?.ok) {
      console.log(res);
      setError("");
      router.replace("/browse");
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <>
        <div className="flex min-h-screen flex-col items-center justify-center p-10">
          <TitleLogo />
          <div className=" my-auto p-8 rounded shadow-md w-96 border border-orange-400">
            <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="w-full border border-gray-300 text-black rounded  py-2 mb-4 focus:outline-none focus:border-orange-400 focus:text-black"
                value={user.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full border border-gray-300 text-black rounded  py-2 mb-4 focus:outline-none focus:border-orange-400 focus:text-black"
                value={user.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
              >
                {loading ? "processing..." : "Sign In"}
              </button>
              <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
            </form>
            <button
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              onClick={() => {
                signIn("github");
              }}
            >
              Sign In with Github
            </button>
            <div className="text-center text-gray-500 mt-4">- OR -</div>
            <Link
              className="block text-center text-orange-400 hover:underline mt-2"
              href="/register"
            >
              Register Here
            </Link>
          </div>
        </div>
      </>
    )
  );
};

export default Login;
