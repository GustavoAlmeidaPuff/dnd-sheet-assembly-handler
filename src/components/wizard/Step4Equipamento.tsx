'use client';

import React, { useEffect, useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { startingEquipmentByClass } from '@/data/equipment';
import { weaponsData, weaponsByCategory, Weapon } from '@/data/weapons';
import { classesData } from '@/data/classes';
import { EquipmentItem } from '@/types/character';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Lista de índices que são armas (não armaduras ou outros equipamentos)
const weaponIndices = weaponsData.map(w => w.index);

export default function Step4Equipamento() {
  const { character, setEquipment } = useCharacterCreation();
  const [equipment, setEquipmentState] = useState<EquipmentItem[]>([]);
  const [editingWeapon, setEditingWeapon] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('simple-melee');

  useEffect(() => {
    if (!character.class) {
      return;
    }

    const classEquipment = startingEquipmentByClass[character.class.index] || [];
    setEquipmentState(classEquipment);
    setEquipment(classEquipment);
    // CA e PV são calculados automaticamente pelo contexto quando equipamento é atualizado
  }, [character.class, setEquipment]);

  const isWeapon = (item: EquipmentItem): boolean => {
    return weaponIndices.includes(item.index);
  };

  const getClassProficiencies = () => {
    if (!character.class) return null;
    const classData = classesData.find(c => c.index === character.class?.index);
    return classData?.weaponProficiencies || null;
  };

  const isProficient = (category: string): boolean => {
    const proficiencies = getClassProficiencies();
    if (!proficiencies) return false;
    
    switch (category) {
      case 'simple-melee':
        return proficiencies.simpleMelee || false;
      case 'simple-ranged':
        return proficiencies.simpleRanged || false;
      case 'martial-melee':
        return proficiencies.martialMelee || false;
      case 'martial-ranged':
        return proficiencies.martialRanged || false;
      default:
        return false;
    }
  };

  const handleWeaponChange = (weapon: Weapon) => {
    if (editingWeapon === null) return;

    const newEquipment = [...equipment];
    newEquipment[editingWeapon] = {
      index: weapon.index,
      name: weapon.name,
      quantity: 1,
    };
    
    setEquipmentState(newEquipment);
    setEquipment(newEquipment);
    setEditingWeapon(null);
  };

  if (!character.class) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-red-600">
          Por favor, selecione uma classe primeiro no passo anterior.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Equipamento Inicial</h2>
        <p className="text-gray-600">
          Seu equipamento inicial baseado na classe {character.class.name}
        </p>
      </div>

      {equipment.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Equipamento</h3>
            <ul className="space-y-3">
              {equipment.map((item, index) => {
                const isWeaponItem = isWeapon(item);
                const weapon = isWeaponItem ? weaponsData.find(w => w.index === item.index) : null;

                return (
                  <li key={index} className="flex items-start justify-between gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-semibold text-lg">
                          {item.quantity && item.quantity > 1 ? `${item.quantity}x ` : ''}
                          {item.name}
                        </span>
                        {item.armorClass && (
                          <span className="text-sm text-blue-600 font-semibold">
                            (CA: {item.armorClass})
                          </span>
                        )}
                      </div>
                      {weapon && (
                        <div className="text-xs text-gray-600 mt-2 space-y-1">
                          <div>
                            <span className="font-semibold">Dano: </span>
                            <span className="text-blue-600">{weapon.damage}</span>
                            <span className="mx-2">•</span>
                            <span className="font-semibold">Tipo: </span>
                            <span>{weapon.damageType}</span>
                          </div>
                          {weapon.properties.length > 0 && (
                            <div>
                              <span className="font-semibold">Propriedades: </span>
                              <span>{weapon.properties.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {isWeaponItem && (
                      <Button
                        onClick={() => setEditingWeapon(index)}
                        variant="secondary"
                        className="text-sm whitespace-nowrap flex-shrink-0"
                      >
                        Editar
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Modal/Seletor de Armas */}
          {editingWeapon !== null && (
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Escolher Arma</h3>
                <Button onClick={() => setEditingWeapon(null)} variant="secondary">
                  Cancelar
                </Button>
              </div>

              {/* Filtros por categoria */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(['simple-melee', 'simple-ranged', 'martial-melee', 'martial-ranged'] as const).map((category) => {
                  const categoryLabels = {
                    'simple-melee': 'Simples - Corpo a Corpo',
                    'simple-ranged': 'Simples - À Distância',
                    'martial-melee': 'Marciais - Corpo a Corpo',
                    'martial-ranged': 'Marciais - À Distância',
                  };
                  const proficient = isProficient(category);
                  
                  return (
                    <div key={category} className="relative">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all relative ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {categoryLabels[category]}
                      </button>
                      {proficient && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          Proficiente
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Lista de armas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                {weaponsByCategory[selectedCategory as keyof typeof weaponsByCategory].map((weapon) => (
                  <Card
                    key={weapon.index}
                    onClick={() => handleWeaponChange(weapon)}
                    className="cursor-pointer"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{weapon.name}</h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-semibold text-gray-800">Dano: </span>
                        <span className="text-blue-600">{weapon.damage}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Tipo: </span>
                        <span className="text-gray-700">{weapon.damageType}</span>
                      </div>
                      {weapon.properties.length > 0 && (
                        <div>
                          <span className="font-semibold text-gray-800">Propriedades: </span>
                          <span className="text-gray-700">{weapon.properties.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {editingWeapon === null && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold text-center">
                ✓ Equipamento carregado! CA e PV foram calculados automaticamente.
                {equipment.some(item => isWeapon(item)) && ' Clique em "Editar" em uma arma para trocá-la.'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-lg text-gray-600">
            Nenhum equipamento inicial disponível para esta classe.
          </div>
        </div>
      )}
    </div>
  );
}
