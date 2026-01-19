import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Character } from '@/types/character';

const CHARACTERS_COLLECTION = 'characters';

export async function saveCharacter(character: Character): Promise<string> {
  try {
    const characterData = {
      ...character,
      createdAt: character.createdAt || new Date(),
    };
    const docRef = await addDoc(collection(db, CHARACTERS_COLLECTION), characterData);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar personagem:', error);
    throw error;
  }
}

export async function getUserCharacters(userId: string): Promise<Character[]> {
  try {
    const q = query(
      collection(db, CHARACTERS_COLLECTION),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const characters: Character[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      characters.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      } as Character);
    });

    // Ordenar por data de criação (mais recente primeiro)
    return characters.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
}

export async function deleteCharacter(characterId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, CHARACTERS_COLLECTION, characterId));
  } catch (error) {
    console.error('Erro ao deletar personagem:', error);
    throw error;
  }
}
