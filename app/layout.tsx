import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Navbar } from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vidriería REBOOK",
  description: "Especialistas en vidriería y carpintería de aluminio. Fabricamos e instalamos ventanas, puertas, canceles y soluciones a medida en vidrio y aluminio para hogares y negocios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers >
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <div className="fixed h-screen w-screen -z-1">
          <div className="dashed-grid-pattern h-screen">
          </div>
        </div>
      </body>

    </html>
  );
}
