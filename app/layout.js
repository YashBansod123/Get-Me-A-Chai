
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a chai-Fund Your Projects with Chai",
  description: "This website is crowdfunding platfrom for developers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
        <Navbar />
        <main className="flex-1 my-auto h-full ">
        <div className="min-h-screen overflow-x-hidden bg-[#0f0f0f] bg-[radial-gradient(#ec489933_1px,#0f0f0f_1px)] bg-[size:20px_20px] text-white
">
        {children}
         </div>
        </main>
       
    
    <Footer />
  
       </SessionWrapper>
        
      </body>
    </html>
  );
}
