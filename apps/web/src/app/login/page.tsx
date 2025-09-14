// Archivo: apps/web/src/app/login/page.tsx
'use client'; // <-- Indicamos que es un Componente de Cliente para poder usar estado y eventos

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí irá la lógica para llamar a la API
    console.log({ email, password });
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
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo blanco semi-transparente
          borderRadius: 2,
        }}
      >
        <Image 
          src="/frioneto-logo.svg" // <-- Asumimos que el logo está en la carpeta `public`
          alt="Frioneto Logo"
          width={100}
          height={50}
        />
        <Typography component="h1" variant="h5" sx={{ mt: 2, color: '#1E3A8A' }}>
          Portal de Clientes
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}