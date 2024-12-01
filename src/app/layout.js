import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/Components/Nav";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
} from "@clerk/nextjs";
import SignInPage from "@/Components/SignInPage";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "WatchMark",
  description: "Movie watchlist ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SignedOut>
            <SignInPage />
          </SignedOut>

          <SignedIn>
            {" "}
            <Nav />
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
