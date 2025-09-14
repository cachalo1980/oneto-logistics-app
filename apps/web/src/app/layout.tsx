// Archivo: apps/web/src/app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // <-- Importar la fuente
import ThemeRegistry from './ThemeRegistry';
import './globals.css';

// Configurar los pesos de la fuente que usaremos
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Portal de Clientes - Frioneto',
  description: 'Gestión de logística para clientes de Frigorífico Oneto',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}