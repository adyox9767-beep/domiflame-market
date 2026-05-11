"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

const logout = async () => {
  await signOut(auth);
};
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center h-[80vh] px-6">

       <Image
  src="/textlogo.png"
  alt="Domiflame"
  width={500}
  height={200}
  className="w-[300px] md:w-[500px]"
/> 

        <p className="mt-6 max-w-2xl text-zinc-400 text-lg">
          Premium TCG marketplace with live card pricing,
          limited edition drops, and esports-inspired collectibles.
        </p>

        <div className="flex gap-4 mt-10">

          <Link href="/market">
  <button className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
    Explore Market
  </button>
</Link>

          <Link href="/store">
  <button className="border border-yellow-500 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition">
    Buy Packs
  </button>
</Link>

        </div>
      </section>

      {/* Trending Cards */}
      <section className="px-8 pb-20">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black">
            Trending Cards
          </h2>

          <p className="text-green-400">
            Market Open
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[1,2,3,4].map((card)=>(
            <div
              key={card}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 transition hover:-translate-y-2 duration-300"
            >

              <div className="h-80 bg-gradient-to-b from-yellow-500/20 to-black"></div>

              <div className="p-5">

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl">
                      Fire Phantom
                    </h3>

                    <p className="text-zinc-400 text-sm mt-1">
                      Legendary
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">
                      ₹ 5,420
                    </p>

                    <p className="text-green-500 text-xs">
                      +12.4%
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
}