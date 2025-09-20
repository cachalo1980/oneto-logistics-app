// Archivo: apps/web/src/app/login/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, TextField, Typography, Container, Paper, CircularProgress, Alert } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie'; // <-- Necesitaremos esta importación

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'; // Apuntamos a la ruta relativa
const TOKEN_COOKIE_NAME = 'access_token';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setError('Debes iniciar sesión para acceder a esta página.');
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      // ¡LÓGICA FINAL!
      const { access_token } = response.data;

      // 1. Guardamos el token en la cookie
      Cookies.set(TOKEN_COOKIE_NAME, access_token, { expires: 1, secure: process.env.NODE_ENV === 'production' });

      // 2. Redirigimos al dashboard
      router.push('/dashboard');

    } catch (err) {
      console.error('Error en el login:', err);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          setError('Correo electrónico o contraseña incorrectos.');
        } else {
          setError('Ocurrió un error inesperado. Por favor, inténtelo de nuevo.');
        }
      } else {
        setError('No se pudo conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  // El JSX se queda igual
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ /* ... estilos ... */ }}>
        <Image src="/frioneto-logo.svg" alt="Frioneto Logo" width={100} height={50} />
        <Typography component="h1" variant="h5" sx={{ mt: 2, color: '#1E3A8A' }}>
          Portal de Clientes
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <TextField /* ...props... */ />
          <TextField /* ...props... */ />
          <Box sx={{ position: 'relative' }}>
            <Button type="submit" /* ...props... */ >Ingresar</Button>
            {loading && <CircularProgress /* ...props... */ />}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}