import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Suyog Dahal - Portfolio",
  description: "Portfolio of Suyog Dahal, Aspiring AI Researcher & Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${styles.body}`}>
        {children}
      </body>
    </html>
  );
}
