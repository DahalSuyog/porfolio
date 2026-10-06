import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import styles from "./layout.module.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Suyog Dahal | AI Engineer",
  description:
    "Suyog Dahal is an AI engineer who trains reinforcement-learning agents and builds computer-vision systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${newsreader.variable} ${manrope.variable}`}
      // the inline script below adds "js" before hydration
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide content for reveal animations only when JS will run them */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Only the four icons the site uses, so the font stays small */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display -- icon fonts need "block" so ligature names never flash */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,400,0,0&icon_names=arrow_back,check,close,content_copy&display=block"
          rel="stylesheet"
        />
      </head>
      <body className={styles.body}>
        <Navbar />
        <div className={styles.main}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
