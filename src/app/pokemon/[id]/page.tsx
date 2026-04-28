"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const data = await res.json();

      setPokemon(data);
      setLoading(false);
    };

    if (id) fetchPokemon();
  }, [id]);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // ❌ Safety check
  if (!pokemon) {
    return <div className="text-center mt-10">Pokemon not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Back button */}
      <Link
        href="/"
        className="text-blue-600 mb-4 inline-block"
      >
        ← Back
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-48 h-48"
          />
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-center capitalize mt-4">
          {pokemon.name}
        </h1>

        <p className="text-center text-gray-500">
          #{pokemon.id}
        </p>

        {/* Types */}
        <div className="flex justify-center gap-2 mt-4">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Stats</h2>

          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="mb-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">
                  {stat.stat.name}
                </span>
                <span>{stat.base_stat}</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${stat.base_stat}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Info */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-500">Height</p>
            <p className="font-semibold">{pokemon.height}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-semibold">{pokemon.weight}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PokemonDetails;