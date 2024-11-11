import { useAuth } from "@/Store/auth";
import React from "react";

export default function page() {
  const { user } = useAuth();
  return (
    <div>
      <h1> Welcome to Login Page</h1>
    </div>
  );
}
