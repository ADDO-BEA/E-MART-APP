import {Toaster} from "react-hot-toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider"; 
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from '@/components/Footer'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-mart",
  description: "E-mart for online shopping ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
         <ReduxProvider>
        <ClerkProvider dynamic>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Toaster position="top-right" />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        </ClerkProvider>
         </ReduxProvider>
      </body>
    </html>
  );
}
