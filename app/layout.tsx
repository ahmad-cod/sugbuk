import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ProfileProvider } from "@/contexts/ProfileContext";
import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "SUGBUK - Student Union Government | Bayero University, Kano",
    template: "%s | SUG-BUK",
  },
  description:
    "Official platform for the Student Union Government of Bayero University, Kano.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <ProfileProvider>
          <Navbar />
          <main className="flex flex-col items-center gap-10 sm:gap-20">
            {/* <div className="flex items-center gap-2">
                      <DeployButton />
                    </div> */}
            {/* </div> */}
            {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}

            {children}
          </main>
          <Footer />
        </ProfileProvider>
      </body>
    </html>
  );
}
