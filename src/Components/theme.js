"use client";
import { createTheme } from "@mui/material/styles";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"], // Specify subsets like 'latin', 'cyrillic', etc.
  weight: ["400"], // Add required weights
  variable: "--font-lato",
});

export const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily, // Use the imported font here
  },
});
