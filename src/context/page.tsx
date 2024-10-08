"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Définition du type pour le contexte
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Création du contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Création du fournisseur de contexte pour le thème
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light"); // Par défaut, mode clair

  // Charger le thème à partir du localStorage lors du premier rendu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Enregistrer dans localStorage
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html lang="en" className={theme === "dark" ? "dark" : ""}>
        {children}
      </html>
    </ThemeContext.Provider>
  );
};

// Hook pour utiliser le contexte du thème
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme doit être utilisé à l'intérieur de ThemeProvider"
    );
  }
  return context;
};
