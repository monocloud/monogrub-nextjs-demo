import type { Metadata } from "next";
import "./globals.css"; // Global styles
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MonoFood - Dummy Dashboard",
  description: "Showcase MonoCloud features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-gray-50 text-gray-900 min-h-screen"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
          <Toaster position="bottom-right" richColors />
        </main>
      </body>
    </html>
  );
}
