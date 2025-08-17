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
  title: {
    default: "Casa de Libros",
    template: "%s | Casa de Libros",
  },
  icons: {
    icon: "/og-square.png"
  },
  description: "Un lugar para encontrar libros de todo tipo.",
  openGraph: {
    title: "Casa de Libros",
    description: "Un lugar para encontrar libros de todo tipo.",
    url: "https://casa-libros.vercel.app",
    siteName: "casa-libros",
    images: [
      {
        url: "https://casa-libros.vercel.app/og-square.png",
        width: 1200,
        height: 630,
        alt: "casa-libros",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa de Libros",
    description: "Un lugar para encontrar libros de todo tipo.",
    images: ["https://casa-libros.vercel.app/og-image.png"],
  },

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
