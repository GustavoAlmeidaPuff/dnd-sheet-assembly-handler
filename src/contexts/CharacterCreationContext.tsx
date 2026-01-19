'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Character, EquipmentItem } from '@/types/character';
import { calculateAllModifiers, applyRacialBonuses, calculateAC, calculateHP } from '@/lib/utils/calculations';

type RaceType = Character['race'];

interface CharacterCreationContextType {
  character: Partial<Character>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setRace: (race: RaceType) => void;
  setClass: (classData: { index: string; name: string; hitDie: number } | null) => void;
  setAttributes: (attributes: Character['attributes']) => void;
  setBackground: (background: { index: string; name: string } | null) => void;
  setEquipment: (equipment: EquipmentItem[]) => void;
  setPersonality: (personality: Character['personality']) => void;
  setArmorClass: (ac: number) => void;
  setHitPoints: (hp: number) => void;
  resetCharacter: () => void;
}

const CharacterCreationContext = createContext<CharacterCreationContextType | undefined>(undefined);

const initialCharacter: Partial<Character> = {
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  modifiers: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  race: null,
  class: null,
  background: null,
  equipment: [],
  armorClass: 10,
  hitPoints: 0,
  personality: {
    ideals: '',
    bonds: '',
    flaws: '',
  },
};

export function CharacterCreationProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Partial<Character>>(initialCharacter);
  const [currentStep, setCurrentStep] = useState(1);
  // Armazenar atributos base (sem bônus raciais) para poder remover bônus antigos
  const [baseAttributes, setBaseAttributes] = useState<Character['attributes'] | null>(null);

  const updateCharacter = useCallback((updates: Partial<Character>) => {
    setCharacter((prev) => {
      const updated = { ...prev, ...updates };
      
      // Recalcular modificadores sempre que os atributos mudarem
      if (updates.attributes) {
        updated.modifiers = calculateAllModifiers(updated.attributes!);
      }
      
      return updated;
    });
  }, []);

  const setRace = useCallback((race: any) => {
    if (!race) {
      // Se remover a raça, voltar aos atributos base
      if (baseAttributes) {
        updateCharacter({ 
          race: null,
          attributes: baseAttributes 
        });
      } else {
        updateCharacter({ race: null });
      }
      return;
    }

    // Converter ability_bonuses para o formato esperado
    let abilityBonuses: { [key: string]: number } = {};
    
    // Se vier do formato da API (ability_bonuses array)
    if (race.ability_bonuses && Array.isArray(race.ability_bonuses)) {
      race.ability_bonuses.forEach((bonus: any) => {
        let abilityKey = bonus.ability_score?.index?.toLowerCase() || '';
        if (abilityKey.includes('-')) {
          abilityKey = abilityKey.split('-')[0];
        }
        const fullNameMap: { [key: string]: string } = {
          strength: 'str',
          dexterity: 'dex',
          constitution: 'con',
          intelligence: 'int',
          wisdom: 'wis',
          charisma: 'cha',
        };
        abilityKey = fullNameMap[abilityKey] || abilityKey;
        abilityBonuses[abilityKey] = bonus.bonus;
      });
    } else if (race.abilityBonuses) {
      // Se vier dos dados estáticos (abilityBonuses object)
      abilityBonuses = { ...race.abilityBonuses };
    }

    // Atualizar a raça
    updateCharacter({
      race: {
        index: race.index,
        name: race.name,
        abilityBonuses,
      },
    });

    // Se já temos atributos, precisamos remover bônus da raça anterior (se houver)
    // e aplicar os novos bônus sobre os atributos base
    if (character.attributes) {
      let attributesToUse: Character['attributes'];
      
      // Se temos atributos base salvos, usar eles
      if (baseAttributes && Object.values(baseAttributes).some(v => v > 0)) {
        attributesToUse = baseAttributes;
      } else {
        // Se não temos base, mas temos uma raça anterior, remover seus bônus
        if (character.race && character.race.abilityBonuses) {
          // Remover bônus da raça anterior
          const previousBonuses = character.race.abilityBonuses;
          const attributeMap: { [key: string]: keyof Character['attributes'] } = {
            str: 'strength',
            dex: 'dexterity',
            con: 'constitution',
            int: 'intelligence',
            wis: 'wisdom',
            cha: 'charisma',
          };
          
          attributesToUse = { ...character.attributes };
          for (const [key, bonus] of Object.entries(previousBonuses)) {
            const attrKey = attributeMap[key.toLowerCase()];
            if (attrKey) {
              attributesToUse[attrKey] -= bonus;
            }
          }
          // Salvar como base para próximas mudanças
          setBaseAttributes(attributesToUse);
        } else {
          // Se não há raça anterior, usar os atributos como estão (são a base)
          attributesToUse = character.attributes;
          setBaseAttributes(attributesToUse);
        }
      }
      
      // Aplicar bônus da nova raça sobre os atributos base
      const updatedAttributes = applyRacialBonuses(attributesToUse, abilityBonuses);
      updateCharacter({ attributes: updatedAttributes });
    }
  }, [character.attributes, character.race, baseAttributes, updateCharacter]);

  const setClass = useCallback((classData: { index: string; name: string; hitDie: number } | null) => {
    updateCharacter({ class: classData });
  }, [updateCharacter]);

  const setAttributes = useCallback((attributes: Character['attributes']) => {
    // Sempre salvar os atributos base (sem bônus)
    setBaseAttributes(attributes);
    
    // Se temos uma raça selecionada, aplicar bônus raciais sobre os atributos base
    if (character.race) {
      const attributesWithBonuses = applyRacialBonuses(attributes, character.race.abilityBonuses);
      updateCharacter({ attributes: attributesWithBonuses });
    } else {
      // Se não temos raça, usar os atributos como estão
      updateCharacter({ attributes });
    }
  }, [character.race, updateCharacter]);

  const setBackground = useCallback((background: { index: string; name: string } | null) => {
    updateCharacter({ background });
  }, [updateCharacter]);

  const setEquipment = useCallback((equipment: EquipmentItem[]) => {
    updateCharacter({ equipment });
    
    // Recalcular CA quando equipamento mudar
    if (character.modifiers) {
      const armor = equipment.find((e) => e.armorClass !== undefined) || null;
      const dexMod = character.modifiers.dexterity || 0;
      const ac = calculateAC(armor, dexMod);
      updateCharacter({ armorClass: ac });
    }
  }, [character.modifiers, updateCharacter]);

  const setPersonality = useCallback((personality: Character['personality']) => {
    updateCharacter({ personality });
  }, [updateCharacter]);

  const setArmorClass = useCallback((ac: number) => {
    updateCharacter({ armorClass: ac });
  }, [updateCharacter]);

  const setHitPoints = useCallback((hp: number) => {
    updateCharacter({ hitPoints: hp });
  }, [updateCharacter]);

  // Recalcular CA e PV quando modificadores, classe ou equipamento mudarem
  useEffect(() => {
    if (character.modifiers && character.class) {
      const dexMod = character.modifiers.dexterity || 0;
      const armor = character.equipment?.find((e) => e.armorClass !== undefined) || null;
      const ac = calculateAC(armor, dexMod);
      const hp = calculateHP(character.class.hitDie, character.modifiers.constitution || 0);
      
      // Só atualizar se os valores mudaram para evitar loops
      setCharacter((prev) => {
        if (prev.armorClass === ac && prev.hitPoints === hp) {
          return prev;
        }
        return {
          ...prev,
          armorClass: ac,
          hitPoints: hp,
        };
      });
    }
  }, [
    character.modifiers?.dexterity,
    character.modifiers?.constitution,
    character.class?.hitDie,
    character.equipment?.length,
    // Usar JSON.stringify para comparar equipamento (pode ser otimizado)
    JSON.stringify(character.equipment?.find((e) => e.armorClass !== undefined)),
  ]);

  const resetCharacter = useCallback(() => {
    setCharacter(initialCharacter);
    setCurrentStep(1);
  }, []);

  return (
    <CharacterCreationContext.Provider
      value={{
        character,
        currentStep,
        setCurrentStep,
        setRace,
        setClass,
        setAttributes,
        setBackground,
        setEquipment,
        setPersonality,
        setArmorClass,
        setHitPoints,
        resetCharacter,
      }}
    >
      {children}
    </CharacterCreationContext.Provider>
  );
}

export function useCharacterCreation() {
  const context = useContext(CharacterCreationContext);
  if (context === undefined) {
    throw new Error('useCharacterCreation deve ser usado dentro de CharacterCreationProvider');
  }
  return context;
}
