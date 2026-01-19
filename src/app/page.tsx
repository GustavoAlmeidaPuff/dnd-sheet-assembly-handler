'use client';

import React from 'react';
import Link from 'next/link';
import AuthButton from '@/components/auth/AuthButton';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-900">Forja de Personagens D&D 5e</h1>
          <AuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Crie seu Herói
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Um wizard completo e intuitivo para criar personagens de D&D 5ª Edição.
          Veja sua ficha atualizar em tempo real enquanto você faz suas escolhas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/criar-personagem">
            <Button variant="primary" className="text-lg px-8 py-4">
              Começar Agora
            </Button>
          </Link>
          <Link href="/meus-personagens">
            <Button variant="secondary" className="text-lg px-8 py-4">
              Meus Personagens
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Recursos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🎲</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Wizard Completo</h4>
            <p className="text-gray-600">
              Passo a passo guiado para criar seu personagem, desde a escolha da raça até a personalidade.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Preview em Tempo Real</h4>
            <p className="text-gray-600">
              Veja sua ficha de personagem atualizar instantaneamente enquanto você faz suas escolhas.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">☁️</div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Salve na Nuvem</h4>
            <p className="text-gray-600">
              Seus personagens são salvos automaticamente e você pode acessá-los de qualquer lugar.
            </p>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Como Funciona
        </h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Escolha Raça e Classe</h4>
              <p className="text-gray-600">
                Selecione entre diversas raças e classes disponíveis. Os bônus são aplicados automaticamente.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Gere Atributos</h4>
              <p className="text-gray-600">
                Role dados ou use o Standard Array. Os modificadores são calculados automaticamente.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Complete os Detalhes</h4>
              <p className="text-gray-600">
                Escolha equipamento, antecedente e defina a personalidade do seu personagem.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Revise e Salve</h4>
              <p className="text-gray-600">
                Revise todos os detalhes e salve seu personagem para usar em suas aventuras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Forja de Personagens D&D 5e - Criado para jogadores de D&D 5ª Edição
          </p>
        </div>
      </footer>
    </div>
  );
}
