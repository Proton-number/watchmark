import "./globals.css";
import Nav from "@/Components/Nav";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPage from "@/Components/SignInPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/Components/theme";

export const metadata = {
  title: "WatchMark",
  description: "Movie watchlist ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider theme={theme}>
            <SignedOut>
              <SignInPage />
            </SignedOut>

            <SignedIn>
              {" "}
              <Nav />
              {children}
            </SignedIn>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
