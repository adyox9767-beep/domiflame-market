"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function LoginPage() {

const getErrorMessage = (
  code: string
) => {

  switch (code) {

    case "auth/invalid-credential":
      return "Invalid email or password";

    case "auth/user-not-found":
      return "Account not found";

    case "auth/wrong-password":
      return "Wrong password";

    case "auth/invalid-email":
      return "Invalid email";

    case "auth/too-many-requests":
      return "Too many attempts. Try later";

    default:
      return "Login failed";

  }

};

const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loginUser = async () => {

    if (!email || !password) {

      alert("Please fill all fields");
      return;

    }

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

router.push("/");
    } catch (error: any) {

      alert(
  getErrorMessage(error.code)
);

    } finally {

      setLoading(false);

    }

  };

  const googleLogin = async () => {

    try {

      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

router.push("/");
    } catch (error: any) {

      alert(
  getErrorMessage(error.code)
);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-14">

          <div className="flex items-center gap-4">

            <Image
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
            />

            <Image
              src="/textlogo.png"
              alt="textlogo"
              width={280}
              height={100}
            />

          </div>

        </div>

        {/* Form */}
        <div className="space-y-8">

          {/* Email */}
          <div>

            <p className="text-zinc-500 tracking-[8px] text-sm mb-4">
              EMAIL ADDRESS
            </p>

            <input
              type="email"
              placeholder="commander@domiflame.gg"
              value={email}
              onChange={(e)=>
                setEmail(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-6 text-3xl font-bold outline-none focus:border-yellow-500"
            />

          </div>

          {/* Password */}
          <div>

            <p className="text-zinc-500 tracking-[8px] text-sm mb-4">
              PASSWORD
            </p>

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-6 text-3xl font-bold outline-none focus:border-yellow-500"
            />

          </div>

          {/* Login Button */}
          <button
            onClick={loginUser}
            disabled={loading}
            className="w-full border border-zinc-700 py-6 rounded-2xl text-3xl font-black tracking-[8px] hover:border-yellow-500 transition"
          >

            {
              loading
                ? "LOADING..."
                : "ENTER THE ARENA →"
            }

          </button>

          {/* Google */}
          <button
            onClick={googleLogin}
            className="w-full bg-yellow-500 text-black py-5 rounded-2xl text-xl font-black hover:scale-105 transition"
          >
            Continue With Google
          </button>

          {/* Footer */}
          <div className="text-center text-zinc-400 text-xl">

            New here?{" "}

            <Link
              href="/register"
              className="text-yellow-400"
            >
              Create Account
            </Link>

            {" "}·{" "}

            <Link
              href="/forgot-password"
              className="text-yellow-400"
            >
              Forgot Password?
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}