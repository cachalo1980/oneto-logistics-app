// Archivo: apps/web/src/theme/theme.ts
'use client';
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

const theme = createTheme({
  palette: {
    mode: 'light', // Especificamos el modo para evitar inconsistencias
    primary: {
      main: '#3B82F6', // Azul Primario de Frioneto
      contrastText: '#ffffff', // Aseguramos que el texto en el botón sea blanco
    },
    background: {
      // No definimos el background.default aquí para que no sobreescriba nuestro gradiente del CSS
      paper: '#ffffff', // El color de fondo para componentes como Paper, Card, etc.
    },
    text: {
        primary: '#1E3A8A', // Texto principal azul oscuro
        secondary: '#6B7280', // Texto secundario gris
    }
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    button: {
      textTransform: 'uppercase',
      fontWeight: 700,
    },
    h5: {
        fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px', // Botones muy redondeados
          padding: '10px 24px',
        },
      },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                // Estilos si quisiéramos personalizar los campos de texto
            }
        }
    }
  },
});

export default theme;