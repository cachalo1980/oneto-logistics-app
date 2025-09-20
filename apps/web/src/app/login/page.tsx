// Archivo: apps/web/src/app/login/page.tsx (NUEVO CONTENIDO)
import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}