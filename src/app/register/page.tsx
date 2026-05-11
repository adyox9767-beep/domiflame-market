"use client";

import { useRouter }
from "next/navigation";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/lib/firebase";

export default function RegisterPage() {

const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

const [confirmPassword,
setConfirmPassword] =
  useState("");

  const [loading, setLoading] =
    useState(false);

  const createAccount = async () => {

    if (
      !name ||
      !email ||
      !password
    ) {

if (password.length < 8) {

  alert(
    "Password must be at least 8 characters"
  );

  return;

}

if (password !== confirmPassword) {

  alert(
    "Passwords do not match"
  );

  return;

}

      alert("Fill all fields");
      return;

    }

    try {

      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name,
          email,
          domicoins: 1000,
          portfolio: [],
          transactions: [],
          createdAt: new Date(),
        }
      );

      router.push("/");

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

          {/* Name */}
          <div>

            <p className="text-zinc-500 tracking-[8px] text-sm mb-4">
              FULL NAME
            </p>

            <input
              type="text"
              placeholder="Commander"
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-6 text-3xl font-bold outline-none focus:border-yellow-500"
            />

          </div>

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
              placeholder="••••••••"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-6 text-3xl font-bold outline-none focus:border-yellow-500"
            />

          </div>

{/* Confirm Password */}
<div>

  <p className="text-zinc-500 tracking-[8px] text-sm mb-4">
    CONFIRM PASSWORD
  </p>

  <input
    type="password"
    placeholder="••••••••"
    value={confirmPassword}
    onChange={(e)=>
      setConfirmPassword(
        e.target.value
      )
    }
    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-6 text-3xl font-bold outline-none focus:border-yellow-500"
  />

</div>

          {/* Button */}
          <button
            onClick={createAccount}
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-6 rounded-2xl text-3xl font-black tracking-[6px] hover:scale-105 transition"
          >

            {
              loading
                ? "CREATING..."
                : "CREATE ACCOUNT"
            }

          </button>

          {/* Footer */}
          <div className="text-center text-zinc-400 text-xl">

            Already have account?{" "}

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