"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/page";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  taille: number;
  poids: number;
  talents: string[];
  attaques: string[];
  image: string;
}

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params.id as string; // Récupérer l'ID du Pokémon depuis l'URL
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (id) {
      const fetchPokemonData = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await res.json();

        const detailedPokemon: Pokemon = {
          id: pokemonData.id,
          name:
            pokemonData.name.charAt(0).toUpperCase() +
            pokemonData.name.slice(1),
          types: pokemonData.types.map((t: any) => t.type.name),
          taille: pokemonData.height, // Correction ici
          poids: pokemonData.weight, // Correction ici
          talents: pokemonData.abilities.map((a: any) => a.ability.name),
          attaques: pokemonData.moves.map((m: any) => m.move.name),
          image: pokemonData.sprites.other["official-artwork"].front_default,
        };

        setPokemon(detailedPokemon);
        setLoading(false);
      };

      fetchPokemonData();
    }
  }, [id]);

  if (loading) {
    return <div>Chargement du Pokémon...</div>;
  }

  if (!pokemon) {
    return <div>Le Pokémon n'a pas été trouvé</div>;
  }

  return (
    <article
      className={
        theme === "light"
          ? "bg-white text-black min-h-screen"
          : "bg-black text-white min-h-screen"
      }
    >
      <div className="mt-1 text-left">
        <Link
          href="/"
          className="text-blue-500 hover:underline text-lg font-normal"
        >
          Retour au Pokedex
        </Link>
      </div>
      <div
        className={`container mx-auto p-4 max-w-4xl shadow-xl rounded-lg mt-2 mb-6  ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="flex items-center justify-center mb-8 ">
          <div>
            <h1 className="text-4xl font-bold  mb-4">{pokemon.name}</h1>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 object-contain"
            />
            <p className="text-lg font-semibold  mb-2">
              Types : {pokemon.types.join(", ")}
            </p>
            <p className=" text-lg mb-2">
              <strong>Taille</strong> : {pokemon.taille / 10} m
            </p>
            <p className=" text-lg mb-2">
              <strong>Poids</strong> : {pokemon.poids / 10} kg
            </p>
            <p className=" text-lg mb-2">
              <strong>Talents</strong> : {pokemon.talents.join(", ")}
            </p>
          </div>
        </div>
        <div>
          <p className="text-lg mb-2">
            <strong>Attaques</strong> : {pokemon.attaques.join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
}
