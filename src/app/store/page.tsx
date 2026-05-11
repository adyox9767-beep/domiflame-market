import Navbar from "@/components/Navbar";

export default function StorePage() {

  const packs = [
    {
      id: 1,
      name: "Starter Pack",
      price: 1000,
      cards: 3,
      rarity: "Rare+",
      image: "/cards/1.png",
    },

    {
      id: 2,
      name: "Elite Pack",
      price: 2500,
      cards: 5,
      rarity: "Epic+",
      image: "/cards/2.png",
    },

    {
      id: 3,
      name: "Legend Pack",
      price: 5000,
      cards: 7,
      rarity: "Legendary",
      image: "/cards/3.png",
    },
  ];

  return (

    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-10">

      <Navbar />

      {/* Header */}
      <div className="mt-10">

        <h1 className="text-5xl font-black">
          Domiflame Store
        </h1>

        <p className="text-zinc-400 mt-3">
          Buy exclusive digital card packs using Domicoins
        </p>

      </div>

      {/* Packs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

        {packs.map((pack) => (

          <div
            key={pack.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-yellow-500 transition"
          >

            {/* Image */}
            <div className="h-80 bg-black">

              <img
                src={pack.image}
                alt={pack.name}
                className="w-full h-full object-contain"
              />

            </div>

            {/* Info */}
            <div className="p-6">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-black">
                  {pack.name}
                </h2>

                <div className="bg-yellow-500 text-black text-sm px-3 py-1 rounded-full font-bold">
                  {pack.rarity}
                </div>

              </div>

              <p className="text-zinc-500 mt-3">
                Contains {pack.cards} digital cards
              </p>

              <div className="mt-6 flex items-center justify-between">

                <div>

                  <p className="text-zinc-500 text-sm">
                    Price
                  </p>

                  <h3 className="text-3xl font-black text-green-400">
                    {pack.price} DC
                  </h3>

                </div>

                <button className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
                  Buy Pack
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}