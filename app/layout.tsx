import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beamori",
  description: "Beamori — a home-base café in Singapore.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Required for env(safe-area-inset-*) to report real values on iOS.
  viewportFit: "cover",
  themeColor: "#FBF9F4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full bg-ivory font-sans text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
