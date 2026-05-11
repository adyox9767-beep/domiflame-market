"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  auth,
  db,
} from "@/lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function WalletPage() {

  const [domicoins, setDomicoins] =
  useState(0);

  const [transactions,
setTransactions] =
  useState<any[]>([]);

useEffect(() => {

  const fetchWallet = async () => {

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

      setDomicoins(
        userSnap.data().domicoins
      );

      setTransactions(
  userSnap.data().transactions || []
);

    }

  };

  fetchWallet();

}, []);

  return (
  <ProtectedRoute>

    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-10">

      <Navbar />

      {/* Header */}
      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>

          <h1 className="text-5xl font-black">
            Domicoins Wallet
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage your Domicoins balance
          </p>

        </div>

        {/* Balance */}
        <div className="bg-yellow-500 text-black px-8 py-5 rounded-3xl">

          <p className="font-medium">
            Available Balance
          </p>

          <h2 className="text-4xl font-black mt-2">
            {domicoins} DC
          </h2>

        </div>

      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        {/* Deposit */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h3 className="text-3xl font-black">
            Deposit
          </h3>

          <p className="text-zinc-500 mt-2">
            Add Domicoins using UPI / Cards
          </p>

          <input
            type="number"
            placeholder="Enter amount in ₹"
            className="w-full mt-6 bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <button className="w-full mt-5 bg-yellow-500 text-black py-4 rounded-2xl font-black hover:scale-105 transition">
            Buy Domicoins
          </button>

          <p className="text-zinc-500 mt-4 text-sm">
            ₹1 = 10 Domicoins
          </p>

        </div>

        {/* Withdraw */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h3 className="text-3xl font-black">
            Withdraw
          </h3>

          <p className="text-zinc-500 mt-2">
            Withdraw money directly to your UPI
          </p>

          <input
            type="text"
            placeholder="Enter UPI ID"
            className="w-full mt-6 bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="number"
            placeholder="Amount in Domicoins"
            className="w-full mt-4 bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <button className="w-full mt-5 bg-green-500 text-black py-4 rounded-2xl font-black hover:scale-105 transition">
            Withdraw Funds
          </button>

        </div>

      </div>

      {/* Transactions */}
      <div className="mt-12">

        <h2 className="text-4xl font-black mb-6">
          Transaction History
        </h2>

        <div className="space-y-4">

          {transactions.map((tx) => (

            <div
              key={tx.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between"
            >

              <div>

                <h3 className="font-bold text-lg">
                  {tx.type}
                </h3>

                <p className="text-zinc-500 text-sm mt-1">
                  {tx.date}
                </p>

              </div>

              <h4
                className={`text-2xl font-black ${
                  tx.amount.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {tx.amount}
              </h4>

            </div>

          ))}

        </div>

      </div>

    </main>
    </ProtectedRoute>
  );
}