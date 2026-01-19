import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
