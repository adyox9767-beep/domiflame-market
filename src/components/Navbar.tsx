"use client";

import { useRouter } from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import Link from "next/link";

import Image from "next/image";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useEffect, useState } from "react";

import {
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {

const router = useRouter();

  const [user, setUser] = useState<any>(null);

const [authLoading,
setAuthLoading] =
  useState(true);

const [domicoins, setDomicoins] =
  useState(0);

const [menuOpen, setMenuOpen] =
  useState(false);

const [profileOpen, setProfileOpen] =
  useState(false);

  useEffect(() => {

  const closeMenu = () => {

    setProfileOpen(false);

  };

  window.addEventListener(
    "click",
    closeMenu
  );

  return () => {

    window.removeEventListener(
      "click",
      closeMenu
    );

  };

}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);

          getDoc(userRef).then((userSnap) => {
            if (userSnap.exists()) {
              setDomicoins(userSnap.data().domicoins);
            }
          });
        }

        setAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const logout = async () => {

  await signOut(auth);

  router.push("/login");

};

  return (

    <nav className="flex items-center justify-between py-6">

      {/* Left */}
      <div className="flex items-center gap-10">

        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="logo"
            width={45}
            height={45}
          />

          <h1 className="text-2xl font-black">
            Domiflame
          </h1>

        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-zinc-300 font-medium">

          <Link
            href="/market"
            className="hover:text-yellow-400 transition"
          >
            Market
          </Link>

          <Link
            href="/store"
            className="hover:text-yellow-400 transition"
          >
            Store
          </Link>

          <Link
            href="/portfolio"
            className="hover:text-yellow-400 transition"
          >
            Portfolio
          </Link>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden"
>
  {
    menuOpen ? (
      <X size={30} />
    ) : (
      <Menu size={30} />
    )
  }
</button>

        {/* Wallet */}
        <div className="bg-yellow-500 text-black px-5 py-2 rounded-2xl font-black">
          {domicoins} DC
        </div>

        {
  authLoading ? (

    <div className="w-24 h-10 bg-zinc-800 rounded-2xl animate-pulse"></div>

  ) : user ? (

            <div className="relative">

  <button
  onClick={(e) => {

    e.stopPropagation();

    setProfileOpen(
      !profileOpen
    );

  }}
    className="flex items-center gap-3"
  >

    <Image
src={
  user.photoURL ||
  "/default-avatar.png"
}      alt="user"
      width={42}
      height={42}
      className="rounded-full"
    />

  </button>

  {
    profileOpen && (

      <div className="absolute right-0 mt-4 w-72 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 z-50">

        <div className="flex items-center gap-4">

          <Image
            src={
  user.photoURL ||
  "/default-avatar.png"
}
            alt="user"
            width={55}
            height={55}
            className="rounded-full"
          />

          <div>

            <h3 className="font-bold">
              {user.displayName}
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              {user.email}
            </p>

          </div>

        </div>

        {/* Links */}
        <div className="mt-6 flex flex-col gap-3">

          <Link
            href="/portfolio"
            className="bg-black px-4 py-3 rounded-2xl hover:border-yellow-500 border border-transparent transition"
          >
            Portfolio
          </Link>

          <Link
            href="/wallet"
            className="bg-black px-4 py-3 rounded-2xl hover:border-yellow-500 border border-transparent transition"
          >
            Wallet
          </Link>

          <Link
            href="/store"
            className="bg-black px-4 py-3 rounded-2xl hover:border-yellow-500 border border-transparent transition"
          >
            Store
          </Link>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-6 bg-red-500 py-3 rounded-2xl font-bold"
        >
          Logout
        </button>

      </div>

    )
  }

</div>

          ) : (

            <Link href="/login">

              <button className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition">
                Login
              </button>

            </Link>

          )
        }

      </div>

{
  menuOpen && (

    <div className="absolute top-24 left-0 w-full bg-zinc-950 border-t border-zinc-800 p-6 flex flex-col gap-5 md:hidden z-50">

      <Link
        href="/market"
        className="text-lg font-bold"
      >
        Market
      </Link>

      <Link
        href="/store"
        className="text-lg font-bold"
      >
        Store
      </Link>

      <Link
        href="/portfolio"
        className="text-lg font-bold"
      >
        Portfolio
      </Link>

      <Link
        href="/wallet"
        className="text-lg font-bold"
      >
        Wallet
      </Link>

    </div>

  )
}

    </nav>
  );
}