// Archivo: apps/web/src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, CircularProgress, Alert } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';

// Es una buena práctica definir la URL de la API en una variable de entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      // ¡ÉXITO!
      console.log('Login exitoso:', response.data);
      alert('¡Login exitoso! Revisa la consola para ver tu token.');
      
      const { access_token } = response.data;
      // Aquí, en el futuro, guardaremos el token y redirigiremos al usuario.
      // Por ejemplo: document.cookie = `token=${access_token}; path=/;`;
      // router.push('/dashboard');

    } catch (err) {
      // MANEJO DE ERRORES
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

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
        }}
      >
        <Image 
          src="/frioneto-logo.svg"
          alt="Frioneto Logo"
          width={100}
          height={50}
        />
        <Typography component="h1" variant="h5" sx={{ mt: 2, color: '#1E3A8A' }}>
          Portal de Clientes
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Ingresar
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px', // Ajuste para centrarlo verticalmente en el botón
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}