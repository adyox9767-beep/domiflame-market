"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { cards } from "@/data/cards";

export default function MarketPage() {
  const [liveCards, setLiveCards] =
  useState(cards);
  useEffect(() => {

  const interval = setInterval(() => {

    setLiveCards((prev) =>
      prev.map((card) => {

        const randomChange =
          Math.floor(Math.random() * 200 - 100);

        const newPrice =
          Math.max(500, card.price + randomChange);

        return {
          ...card,
          price: newPrice,
          change:
            randomChange >= 0
              ? `+${(
                  randomChange / 100
                ).toFixed(2)}%`
              : `${(
                  randomChange / 100
                ).toFixed(2)}%`,
        };
      })
    );

  }, 3000);

  return () => clearInterval(interval);

}, []);
  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-10">

<Navbar />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-5xl font-black">
            Card Market
          </h1>

          <p className="text-zinc-400 mt-2">
            Live market prices for Domiflame TCG cards
          </p>
        </div>

        <div className="bg-green-500/10 border border-green-500 text-green-400 px-5 py-3 rounded-2xl w-fit">
          Market Open
        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">

        <button className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold">
          All
        </button>

        <button className="border border-zinc-700 px-5 py-2 rounded-xl hover:border-yellow-500 transition">
          Characters
        </button>

        <button className="border border-zinc-700 px-5 py-2 rounded-xl hover:border-yellow-500 transition">
          Trending
        </button>

        <button className="border border-zinc-700 px-5 py-2 rounded-xl hover:border-yellow-500 transition">
          Legendary
        </button>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {liveCards.map((card) => (
          <Link
          key={card.id}
  href={`/cards/${card.id}`}
>

            {/* Card Image */}
            <div className="relative h-80">

  <img
    src={card.image}
    alt={card.name}
    className="w-full h-full object-contain rounded-t-3xl"
  />

  <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
    {card.rarity}
  </div>

</div>

            {/* Card Info */}
            <div className="p-5">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    {card.name}
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    {card.category}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-green-400 font-bold text-lg">
                    ₹ {card.price}
                  </p>

<p
  className={`text-xs ${
    card.change.startsWith("+")
      ? "text-green-500"
      : "text-red-500"
  }`}
>                    {card.change}
                  </p>

                </div>

              </div>

              {/* Fake Mini Graph */}
              <div className="mt-5 h-16 bg-gradient-to-r from-green-500/20 to-transparent rounded-xl border border-green-500/20"></div>

            </div>

          </Link>
        ))}

      </div>

        </main>
  </ProtectedRoute>
  );
}