'use client';

import React, { useEffect, useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { fetchStartingEquipment, fetchEquipment } from '@/lib/api/dnd5eapi';
import { EquipmentItem } from '@/types/character';

export default function Step4Equipamento() {
  const { character, setEquipment } = useCharacterCreation();
  const [equipment, setEquipmentState] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEquipment() {
      if (!character.class) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const startingEquipment = await fetchStartingEquipment(character.class.index);
        
        // Buscar detalhes de cada equipamento
        const equipmentDetails = await Promise.all(
          startingEquipment.map(async (item) => {
            try {
              const details = await fetchEquipment(item.equipment.index);
              return {
                index: item.equipment.index,
                name: item.equipment.name,
                quantity: item.quantity,
                armorClass: details.armor_class?.base,
                armorCategory: details.armor_category,
              } as EquipmentItem;
            } catch (error) {
              return {
                index: item.equipment.index,
                name: item.equipment.name,
                quantity: item.quantity,
              } as EquipmentItem;
            }
          })
        );

        setEquipmentState(equipmentDetails);
        setEquipment(equipmentDetails);
        // CA e PV são calculados automaticamente pelo contexto quando equipamento é atualizado
      } catch (error) {
        console.error('Erro ao carregar equipamento:', error);
      } finally {
        setLoading(false);
      }
    }
    loadEquipment();
  }, [character.class]);

  // CA e PV são calculados automaticamente pelo contexto quando modificadores/equipamento mudam

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">Carregando equipamento inicial...</div>
      </div>
    );
  }

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
            <ul className="space-y-2">
              {equipment.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-gray-900">
                    {item.quantity && item.quantity > 1 ? `${item.quantity}x ` : ''}
                    {item.name}
                  </span>
                  {item.armorClass && (
                    <span className="text-sm text-blue-600 font-semibold">
                      (CA: {item.armorClass})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold text-center">
              ✓ Equipamento carregado! CA e PV foram calculados automaticamente.
            </p>
          </div>
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
