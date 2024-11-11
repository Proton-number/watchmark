import { create } from "zustand";
import { auth, googleProvider, githubProvider } from "../Config/Firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export const useAuth = create((set) => ({
  user: null,
}));
