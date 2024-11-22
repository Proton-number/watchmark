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
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <SignedOut>
              <SignIn routing="hash" />
            </SignedOut>
          </div>

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
