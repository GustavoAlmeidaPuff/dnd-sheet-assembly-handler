'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { signInWithGoogle, signOut, onAuthChange } from '@/lib/firebase/auth';
import Button from '@/components/ui/Button';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-2 text-gray-600">Carregando...</div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-sm text-gray-700">
          {user.displayName || user.email}
        </div>
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <Button onClick={handleSignOut} variant="secondary">
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn} variant="primary">
      Entrar com Google
    </Button>
  );
}
