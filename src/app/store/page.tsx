export default function StorePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-10">

      {/* Header */}
      <div className="mb-12">

        <h1 className="text-5xl font-black">
          TCG Store
        </h1>

        <p className="text-zinc-400 mt-3">
          Buy official Domiflame collectible card packs
        </p>

      </div>

      {/* Packs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Pack 1 */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 transition duration-300 hover:-translate-y-2">

          {/* Pack Image */}
          <div className="h-96 bg-gradient-to-b from-yellow-500/20 to-black relative">

            <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
              BEST SELLER
            </div>

          </div>

          {/* Content */}
          <div className="p-6">

            <h2 className="text-3xl font-black">
              Starter Pack
            </h2>

            <p className="text-zinc-400 mt-3">
              Entry pack with limited edition character cards.
            </p>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Price
                </p>

                <h3 className="text-3xl font-black text-yellow-400">
                  ₹ 499
                </h3>
              </div>

              <button className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* Pack 2 */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 transition duration-300 hover:-translate-y-2">

          <div className="h-96 bg-gradient-to-b from-orange-500/20 to-black relative">

            <div className="absolute top-4 right-4 bg-orange-500 text-black text-xs px-3 py-1 rounded-full font-bold">
              LIMITED
            </div>

          </div>

          <div className="p-6">

            <h2 className="text-3xl font-black">
              Rare Pack
            </h2>

            <p className="text-zinc-400 mt-3">
              Rare collectible cards with exclusive artwork.
            </p>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Price
                </p>

                <h3 className="text-3xl font-black text-orange-400">
                  ₹ 999
                </h3>
              </div>

              <button className="bg-orange-500 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* Pack 3 */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-500 transition duration-300 hover:-translate-y-2">

          <div className="h-96 bg-gradient-to-b from-red-500/20 to-black relative">

            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              ULTRA RARE
            </div>

          </div>

          <div className="p-6">

            <h2 className="text-3xl font-black">
              Legendary Pack
            </h2>

            <p className="text-zinc-400 mt-3">
              Premium legendary collection with ultra rare drops.
            </p>

            <div className="mt-6 flex items-center justify-between">

              <div>
                <p className="text-zinc-500 text-sm">
                  Price
                </p>

                <h3 className="text-3xl font-black text-red-400">
                  ₹ 1999
                </h3>
              </div>

              <button className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}