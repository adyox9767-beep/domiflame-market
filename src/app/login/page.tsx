"use client";

import Image from "next/image";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    alert("Login Successful 🔥");

  } catch (error) {
    console.log(error);
  }
};
  return (
    
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10">

        {/* Logo */}
        <div className="flex flex-col items-center">

          <Image
            src="/logo.png"
            alt="Domiflame"
            width={90}
            height={90}
          />

          <Image
            src="/textlogo.png"
            alt="Domiflame"
            width={220}
            height={80}
            className="mt-4"
          />

        </div>

        {/* Heading */}
        <div className="text-center mt-8">

          <h1 className="text-4xl font-black">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-3">
            Login to access the Domiflame market
          </p>

        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4">

          <button
  onClick={googleLogin}
  className="bg-yellow-500 text-black py-4 rounded-2xl font-bold hover:scale-105 transition duration-300"
>
  Continue With Google
</button>

          <button className="border border-zinc-700 py-4 rounded-2xl font-bold hover:border-yellow-500 transition duration-300">
            Continue With Phone
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-8">
          Secure login powered by Domiflame
        </p>

      </div>

    </main>
  );
}