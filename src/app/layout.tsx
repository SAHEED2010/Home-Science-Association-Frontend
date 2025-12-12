import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    default: "Home Science Association | School Management System",
    template: "%s | HSA Portal"
  },
  description: "Modern school management system for Home Science Association. Manage students, teachers, attendance, grades, and more.",
  keywords: ["school management", "student portal", "education system", "HSA", "Home Science Association", "attendance tracking", "grade management"],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "HSA Portal",
    title: "Home Science Association | School Management System",
    description: "Modern school management system for Home Science Association",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hsa-primary.edu.ng/register" as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
