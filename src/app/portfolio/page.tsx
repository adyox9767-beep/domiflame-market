"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/lib/firebase";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { cards } from "@/data/cards";
export default function PortfolioPage() {

 const [ownedCards, setOwnedCards] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(true);
  useEffect(() => {

  const fetchPortfolio = async () => {

    const user = auth.currentUser;

    if (!user) return;

    const userRef = doc(
      db,
      "users",
      user.uid
    );

    const userSnap =
      await getDoc(userRef);

    if (userSnap.exists()) {

      setOwnedCards(
        userSnap.data().portfolio || []
      );

    }

    setLoading(false);

  };

  fetchPortfolio();

}, []);
  const totalValue = ownedCards.reduce(
    (acc, card) => acc + card.price * card.quantity,
    0
  );

const sellCard = async (indexToRemove: number) => {

  const user = auth.currentUser;

  if (!user) return;

  const userRef = doc(
    db,
    "users",
    user.uid
  );

  const userSnap =
    await getDoc(userRef);

  if (!userSnap.exists()) return;

  const userData = userSnap.data();

  const updatedPortfolio =
    [...ownedCards];

  const soldCard =
    updatedPortfolio[indexToRemove];

  updatedPortfolio.splice(
    indexToRemove,
    1
  );

  await updateDoc(userRef, {

    domicoins:
      userData.domicoins +
      soldCard.price,

    portfolio: updatedPortfolio,

    transactions: [
      ...(userData.transactions || []),

      {
        type: "SELL",
        card: soldCard.name,
        amount: soldCard.price,
        createdAt: new Date(),
      },
    ],

  });

  setOwnedCards(updatedPortfolio);

  alert("Card Sold 🔥");

};

  if (loading) {

  return (
  <ProtectedRoute>
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <h1 className="text-4xl font-black">
        Loading Portfolio...
      </h1>

    </main>
  </ProtectedRoute>
  );

}

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-10">

<Navbar />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-black">
            Portfolio
          </h1>

          <p className="text-zinc-400 mt-2">
            Track your Domiflame card investments
          </p>

        </div>

        {/* Wallet */}
        <div className="bg-yellow-500 text-black px-6 py-4 rounded-2xl font-black text-xl">
          12,500 Domicoins
        </div>

      </div>

      {/* Portfolio Value */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

        <p className="text-zinc-500">
          Portfolio Value
        </p>

        <h2 className="text-5xl font-black mt-3 text-green-400">
          {totalValue} DC
        </h2>

        <p className="text-green-500 mt-2">
          +18.4% Overall Profit
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

{ownedCards.map((card, index) => {
          const profit =
            card.price;

          return (

            <div
key={`${card.id}-${index}`}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
            >

              {/* Image */}
              <div className="h-72">

                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-contain bg-black"
                />

              </div>

              {/* Info */}
              <div className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-3xl font-black">
                      {card.name}
                    </h2>

                    <p className="text-zinc-500 mt-1">
Qty: 1                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-zinc-500 text-sm">
                      Current Price
                    </p>

                    <h3 className="text-2xl font-black text-green-400">
                      {card.price} DC
                    </h3>

                  </div>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-black rounded-2xl p-4">

                    <p className="text-zinc-500 text-sm">
                      Bought At
                    </p>

                    <h4 className="text-xl font-black mt-2">
{card.price} DC                    </h4>

                  </div>

                  <div className="bg-black rounded-2xl p-4">

                    <p className="text-zinc-500 text-sm">
                      Profit / Loss
                    </p>

                    <h4
                      className={`text-xl font-black mt-2 ${
                        profit >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {profit >= 0 ? "+" : ""}
                      {profit} DC
                    </h4>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">

                  <button
  onClick={() => sellCard(index)}
  className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
>
  Sell Card
</button>

                  <button className="border border-zinc-700 px-6 py-3 rounded-2xl font-bold hover:border-yellow-500 transition">
                    View Details
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </main>
  );
}