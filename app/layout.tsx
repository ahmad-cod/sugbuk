import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { Poppins, Roboto } from "next/font/google";
import Footer from "@/components/layout/footer";
import { ProfileProvider } from "@/contexts/ProfileContext";
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { AuthProvider } from "@/contexts/AuthProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "SUGBUK - Student Union Government | Bayero University, Kano",
    template: "%s | SUG-BUK",
  },
  description: "Official platform for the Student Union Government of Bayero University, Kano.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    
  },
  openGraph: {
    title: "SUGBUK - Student Union Government | Bayero University, Kano",
    description: "Official platform for the Student Union Government of Bayero University, Kano.",
    url: defaultUrl,
    siteName: "SUG-BUK",
    images: [
      {
        url: `${defaultUrl}/sug-logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "SUGBUK Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUGBUK - Student Union Government | Bayero University, Kano",
    description: "Official platform for the Student Union Government of Bayero University, Kano.",
    images: [`${defaultUrl}/sug-logo.jpeg`],
    creator: "@sugbukofficial",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-body bg-gray-50">
        <AuthProvider>
          <ProfileProvider>
            {/* I might not want the navbar to display in all pages */}
            <Navbar /> 
            <main className="flex flex-col items-center gap-10 sm:gap-20">
              <Toaster
                position="top-center" 
                toastOptions={{
                  duration: 5000,
                  className: "flex items-center justify-center gap-2 font-inter animate-pulse",
                }}
              />
              {children}
              <Analytics />
            </main>
            <Footer />
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
