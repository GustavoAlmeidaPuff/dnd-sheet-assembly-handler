'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { onAuthChange, getCurrentUser } from '@/lib/firebase/auth';
import { getUserCharacters, deleteCharacter } from '@/lib/firebase/firestore';
import { Character } from '@/types/character';
import { translateRace, translateClass, translateBackground } from '@/lib/utils/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AuthButton from '@/components/auth/AuthButton';

export default function MeusPersonagensPage() {
  const [user, setUser] = useState<User | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userCharacters = await getUserCharacters(currentUser.uid);
          setCharacters(userCharacters);
        } catch (error) {
          console.error('Erro ao carregar personagens:', error);
        }
      } else {
        setCharacters([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (characterId: string) => {
    if (!confirm('Tem certeza que deseja deletar este personagem?')) {
      return;
    }

    try {
      await deleteCharacter(characterId);
      setCharacters((prev) => prev.filter((c) => c.id !== characterId));
    } catch (error) {
      console.error('Erro ao deletar personagem:', error);
      alert('Erro ao deletar personagem. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-amber-900">
              Forja de Personagens D&D 5e
            </Link>
            <AuthButton />
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Faça login para ver seus personagens
          </h2>
          <AuthButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-amber-900">
            Forja de Personagens D&D 5e
          </Link>
          <AuthButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meus Personagens</h1>
          <Link href="/criar-personagem">
            <Button variant="primary">Criar Novo Personagem</Button>
          </Link>
        </div>

        {characters.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Você ainda não tem personagens
            </h2>
            <p className="text-gray-600 mb-6">
              Crie seu primeiro personagem e comece sua aventura!
            </p>
            <Link href="/criar-personagem">
              <Button variant="primary">Criar Personagem</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <Card key={character.id} className="relative">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {character.race && translateRace(character.race.name)}{' '}
                    {character.class && translateClass(character.class.name)}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {character.race && (
                      <div>
                        <span className="font-semibold">Raça: </span>
                        {translateRace(character.race.name)}
                      </div>
                    )}
                    {character.class && (
                      <div>
                        <span className="font-semibold">Classe: </span>
                        {translateClass(character.class.name)}
                      </div>
                    )}
                    {character.background && (
                      <div>
                        <span className="font-semibold">Antecedente: </span>
                        {translateBackground(character.background.name)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                    <div className="text-xs text-blue-700 font-semibold">PV</div>
                    <div className="text-xl font-bold text-blue-900">{character.hitPoints}</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                    <div className="text-xs text-green-700 font-semibold">CA</div>
                    <div className="text-xl font-bold text-green-900">{character.armorClass}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDelete(character.id!)}
                    variant="danger"
                    className="flex-1"
                  >
                    Deletar
                  </Button>
                </div>

                {character.createdAt && (
                  <div className="text-xs text-gray-500 mt-2">
                    Criado em: {new Date(character.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
