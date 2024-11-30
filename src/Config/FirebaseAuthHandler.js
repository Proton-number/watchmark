"use client";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "./Firebase";
import { useEffect } from "react";

const FirebaseAuthHandler = () => {
  const { getToken, isSignedIn } = useAuth(); // Use Clerk's hook to get the token

  useEffect(() => {
    const authenticatedWithFirebase = async () => {
      if (!isSignedIn) return; // Only attempt auth if signed in
      try {
        const token = await getToken({ template: "integration_firebase" }); // Get the token from Clerk
        console.log("Received token:", token); // Log the token
        if (!token) return; // Extra safety check
        const userCredential = await signInWithCustomToken(auth, token || ""); // Sign in with the token

        console.log("Firebase user:", userCredential.user);
      } catch (error) {
        console.error("Error during Firebase authentication:", error);
      }
    };

    authenticatedWithFirebase();
  }, [getToken, isSignedIn]); // Only re-run the effect if the token changes
  return null; // Always return something in client components
};

export default FirebaseAuthHandler;
