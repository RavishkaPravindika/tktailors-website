import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "T.K. Custom Tailors — Premium Tailoring & Bespoke Clothing",
    template: "%s | T.K. Custom Tailors",
  },
  description:
    "T.K. Custom Tailors — Premium bespoke tailoring, custom suits, wedding wear, uniforms, and alterations. Over 35 years of craftsmanship and excellence.",
  keywords: [
    "tailors",
    "bespoke suits",
    "custom tailoring",
    "wedding suits",
    "uniforms",
    "alterations",
    "T.K. Custom Tailors",
    "Sri Lanka tailors",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "T.K. Custom Tailors",
    title: "T.K. Custom Tailors — Premium Tailoring & Bespoke Clothing",
    description:
      "Premium bespoke tailoring with over 35 years of craftsmanship. Custom suits, wedding wear, uniforms, and expert alterations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "T.K. Custom Tailors — Premium Tailoring",
    description: "Premium bespoke tailoring with over 35 years of craftsmanship.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="tk-tailors-theme"
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
