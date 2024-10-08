import { useTheme } from "../context/page"; // Importer useTheme pour le thème

interface PokemonProps {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    image: string;
  };
}

export default function PokemonCard({ pokemon }: PokemonProps) {
  const { theme } = useTheme(); // Récupérer le thème (clair ou sombre)

  return (
    <div
      className={`border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-2">{pokemon.name}</h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto mb-4"
      />
      <p className="text-center mb-2">{pokemon.types.join(", ")}</p>
    </div>
  );
}
