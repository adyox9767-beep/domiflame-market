"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const resetPassword = async () => {

    if (!email) {

      alert("Enter email");
      return;

    }

    try {

      setLoading(true);

      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Password reset email sent 🔥"
      );

    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);

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

          {/* Button */}
          <button
            onClick={resetPassword}
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-6 rounded-2xl text-2xl font-black tracking-[5px] hover:scale-105 transition"
          >

            {
              loading
                ? "SENDING..."
                : "RESET PASSWORD"
            }

          </button>

          <div className="text-center text-zinc-400 text-xl">

            Back to{" "}

            <Link
              href="/login"
              className="text-yellow-400"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}