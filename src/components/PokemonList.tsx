"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PokemonCard from "./PokemonCard"; // Import du composant de la carte
import { useTheme } from "../context/page";
import Button from "./Button";
import Pagination from "./Pagination"; // Import du composant Pagination

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

export default function PokemonList() {
  const { theme } = useTheme();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Nouvel état pour la recherche
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(40); // Nombre de Pokémon par page

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      try {
        // Récupérer tous les Pokémon avec un nombre limite élevé
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
        );
        const data = await response.json();

        const allPokemon = data.results;

        const pokemonArray: Pokemon[] = [];

        // Boucle pour récupérer les détails de chaque Pokémon
        for (const pokemon of allPokemon) {
          const res = await fetch(pokemon.url);
          const pokemonData = await res.json();

          const detailedPokemon: Pokemon = {
            id: pokemonData.id,
            name:
              pokemonData.name.charAt(0).toUpperCase() +
              pokemonData.name.slice(1),
            types: pokemonData.types.map((t: any) => t.type.name),
            image: pokemonData.sprites.other["official-artwork"].front_default,
          };

          pokemonArray.push(detailedPokemon);
        }

        setPokemonList(pokemonArray);
        setFilteredPokemonList(pokemonArray); // Par défaut, affiche tous les Pokémon
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon:", error);
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  // Gestion du changement de type sélectionné
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);

    // Si "All" est sélectionné, afficher tous les Pokémon
    if (selectedType === "All") {
      setFilteredPokemonList(pokemonList);
    } else {
      // Filtrer les Pokémon selon leur type
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
      setFilteredPokemonList(filtered);
    }

    setCurrentPage(1); // Réinitialiser la page à 1 après le filtrage
  };

  // Gestion de la recherche par nom ou ID
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = pokemonList.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(query) ||
        pokemon.id.toString() === query
      );
    });

    setFilteredPokemonList(filtered);
    setCurrentPage(1); // Réinitialiser la page à 1 après la recherche
  };

  // Pagination logic: Pokémon à afficher sur la page actuelle
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemonList = filteredPokemonList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);

  if (loading) {
    return <div>Chargement des Pokémon...</div>;
  }

  return (
    <main
  className={`container mx-auto p-4 ${
    theme === "light" ? "bg-white text-black" : "bg-black text-white"
  }`}
>
  {/* Bouton de thème en haut à gauche sur petits écrans */}
  <div className="flex justify-start sm:hidden mb-4">
    <Button />
  </div>

  {/* Conteneur pour le sélecteur de type, la recherche et le bouton de thème */}
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
    
    {/* Sélecteur de type avec ajustements responsive */}
    <select
      id="typeFilter"
      value={selectedType}
      onChange={handleTypeChange}
      className={`p-2 rounded-lg border-2 w-full sm:w-1/3 md:w-1/4 lg:w-auto focus:outline-none ${
        theme === "light"
          ? "bg-white text-black border-gray-300"
          : "bg-gray-800 text-white border-gray-600"
      }`}
    >
      <option value="All">Sélectionnez type...</option>
      <option value="normal">Normal</option>
      <option value="fire">Feu</option>
      <option value="water">Eau</option>
      <option value="grass">Plante</option>
      <option value="electric">Électrique</option>
      <option value="ice">Glace</option>
      <option value="fighting">Combat</option>
      <option value="poison">Poison</option>
      <option value="ground">Sol</option>
      <option value="flying">Vol</option>
      <option value="psychic">Psy</option>
      <option value="bug">Insecte</option>
      <option value="rock">Roche</option>
      <option value="ghost">Spectre</option>
      <option value="dragon">Dragon</option>
      <option value="dark">Ténèbres</option>
      <option value="steel">Acier</option>
      <option value="fairy">Fée</option>
    </select>

    {/* Champ de recherche avec ajustements responsive */}
    <div className="flex items-center border-2 rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-auto">
      <input
        type="text"
        placeholder="Nom du pokemon"
        value={searchQuery}
        onChange={handleSearchChange}
        className={`p-2 outline-none w-full focus:outline-none ${
          theme === "light"
            ? "bg-white text-black border-gray-300"
            : "bg-black text-white border-gray-600"
        }`}
      />
      <button className="bg-green-500 text-white p-2 hover:bg-green-600">
        Rechercher
      </button>
    </div>

    {/* Bouton de thème caché sur petits écrans, visible sur grands écrans */}
    <div className="hidden sm:block">
      <Button />
    </div>
  </div>

  {/* Liste des Pokémon */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {currentPokemonList.map((pokemon) => (
      <Link key={pokemon.id} href={`/pokemons/${pokemon.id}`}>
        <PokemonCard pokemon={pokemon} />
      </Link>
    ))}
  </div>

  {/* Pagination */}
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
    theme={theme}
  />
</main>

  

  );
}
