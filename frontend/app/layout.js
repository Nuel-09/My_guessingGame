import { Space_Grotesk, Syne_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { ToastContainer } from "react-toastify";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syneMono = Syne_Mono({
  variable: "--font-syne-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Signal Hunt Arena",
  description: "Real-time social guessing game with rotating game masters",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syneMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastContainer />
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
