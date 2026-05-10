"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import { cards } from "@/data/cards";

export default async function CardDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const card = cards.find(
    (item) => item.id === Number(id)
  );

  if (!card) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-black">
          Card Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-10">

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Card Image */}
        <div className="bg-zinc-900 rounded-3xl h-[650px] border border-zinc-800 relative overflow-hidden">

          <div className="absolute top-5 right-5 bg-yellow-500 text-black text-sm px-4 py-2 rounded-full font-bold">
            {card.rarity}
          </div>

          <div className="h-full w-full bg-gradient-to-b from-yellow-500/20 to-black"></div>

        </div>

        {/* Card Info */}
        <div>

          <h1 className="text-6xl font-black">
            {card.name}
          </h1>

          <p className="text-zinc-400 text-lg mt-4">
            {card.category} Card
          </p>

          {/* Price Box */}
          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-zinc-500">
              Current Market Price
            </p>

            <h2 className="text-5xl font-black text-green-400 mt-3">
              ₹ {card.price}
            </h2>

            <p className="text-green-500 mt-2">
              {card.change} Today
            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p className="text-zinc-500 text-sm">
                Total Supply
              </p>

              <h3 className="text-3xl font-black mt-2">
                {card.supply}
              </h3>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p className="text-zinc-500 text-sm">
                Owners
              </p>

              <h3 className="text-3xl font-black mt-2">
                {card.owners}
              </h3>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">

            <button className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
              Buy Card
            </button>

            <button className="border border-zinc-700 px-8 py-4 rounded-2xl font-bold hover:border-yellow-500 transition">
              View History
            </button>

          </div>

        </div>

      </div>

      {/* Price History */}
      <div className="mt-16">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-4xl font-black">
            Price History
          </h2>

          <div className="flex gap-3">

            <button className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold">
              1D
            </button>

            <button className="border border-zinc-700 px-4 py-2 rounded-xl">
              1W
            </button>

            <button className="border border-zinc-700 px-4 py-2 rounded-xl">
              1M
            </button>

            <button className="border border-zinc-700 px-4 py-2 rounded-xl">
              ALL
            </button>

          </div>

        </div>

        {/* Fake Chart */}
        <div className="h-[400px] bg-zinc-900 border border-zinc-800 rounded-3xl relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent"></div>

        </div>

      </div>

    </main>
  );
}