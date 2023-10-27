import React from "react";
import "./globals.css";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import { GameProvider } from "../context/Game/GameProvider";
// import { QuizEngineProvider } from "../context/QuizEngine/QuizEngineProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="relative h-screen text-neutral-800">
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
