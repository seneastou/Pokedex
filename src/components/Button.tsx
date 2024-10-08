import { useTheme } from "../context/page";

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg border-2 ${
        theme === "light"
          ? "border-green-500 bg-white"
          : "border-green-500 bg-gray-800"
      } flex items-center justify-center focus:outline-none transition-all duration-300`}
      style={{ width: "40px", height: "40px" }} // Ajuste la taille du bouton
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707m0-14.142l.707-.707m14.142 0l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9c4.97 0 9-4.03 9-9 0-.743-.089-1.464-.257-2.149C20.398 10.234 19.02 9 17 9c-.54 0-1.04.082-1.5.234C15.5 8.49 14.5 8 13 8c-.597 0-1.167.138-1.677.383A5 5 0 0112 3z"
          />
        </svg>
      )}
    </button>
  );
}
