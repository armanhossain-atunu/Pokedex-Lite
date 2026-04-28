"use client";

import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "./Skeleton";

const PokedexCard = () => {
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);

  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [loading, setLoading] = useState(false);

  const limit = 12;
  const isSearching = debouncedSearch.length > 0;

  // ❤️ Load favorites
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // 💾 Save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🌍 Fetch all Pokémon (for search)
  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000"
      );
      const data = await res.json();
      setAllPokemon(data.results);
    };

    fetchAll();
  }, []);

  // 📄 Pagination fetch
  useEffect(() => {
    if (isSearching) return;

    const fetchPokemon = async () => {
      setLoading(true);

      const offset = (page - 1) * limit;

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();

      const details = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemon(details);
      setLoading(false);
    };

    fetchPokemon();
  }, [page, isSearching]);

  // ⏱️ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 🔍 Global search
  useEffect(() => {
    const searchPokemon = async () => {
      if (!debouncedSearch) return;

      setLoading(true);

      const filtered = allPokemon
        .filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        .slice(0, 12);

      const details = await Promise.all(
        filtered.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemon(details);
      setLoading(false);
    };

    searchPokemon();
  }, [debouncedSearch, allPokemon]);

  // ⚡ FAST FILTER (optimized)
  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      const matchType = selectedType
        ? p.types?.some((t) => t.type.name === selectedType)
        : true;

      const matchSearch = debouncedSearch
        ? p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;

      return matchType && matchSearch;
    });
  }, [pokemon, selectedType, debouncedSearch]);

  // ❤️ Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6">

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-md w-full md:w-1/2"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/4"
        >
          <option value="">All Types</option>
          <option value="fire">🔥 Fire</option>
          <option value="water">💧 Water</option>
          <option value="grass">🌿 Grass</option>
          <option value="electric">⚡ Electric</option>
          <option value="psychic">🧠 Psychic</option>
          <option value="ice">❄️ Ice</option>
          <option value="dragon">🐉 Dragon</option>
        </select>

      </div>

      {/* 💀 Skeleton / Grid */}
      {loading ? (
        <Skeleton loading={true} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredPokemon.map((p) => {
            const isFav = favorites.includes(p.id);

            return (
              <div
                key={p.id}
                className="relative bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition"
              >
                {/* ❤️ Favorite */}
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="absolute top-3 right-3 text-xl"
                >
                  {isFav ? "❤️" : "🤍"}
                </button>

                <img
                  src={p.sprites.front_default}
                  alt={p.name}
                  className="mx-auto w-24 h-24"
                />

                <div className="flex flex-col md:flex-row justify-between items-center mt-2">
                  <h2 className="capitalize font-semibold">
                    {p.name}
                  </h2>

                  <Link
                    href={`/pokemon/${p.id}`}
                    className="text-blue-600 text-sm"
                  >
                    Details
                  </Link>
                </div>

                {/* Types */}
                <div className="flex justify-center gap-2 mt-2">
                  {p.types.map((t) => (
                    <span
                      key={t.type.name}
                      className="text-xs px-2 py-1 bg-gray-200 rounded"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* 📄 Pagination */}
      {!isSearching && (
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default PokedexCard;