import './globals.css';
import { ThemeProvider } from '../context/page'; // Importer le ThemeProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children} {/* Le contenu de l'application */}
        </ThemeProvider>
      </body>
    </html>
  );
}