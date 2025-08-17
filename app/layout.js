
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Customer Management System",
  description: "Admin panel built with Next.js, Tailwind, and Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >

          <LayoutWrapper children={children} />
        
        {/* <main>
        <Navbar children={children}/>
        </main> */}
      </body>
    </html>
  );
}
