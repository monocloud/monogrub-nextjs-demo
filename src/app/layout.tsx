import type { Metadata } from "next";
import "./globals.css"; // Global styles
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "MonoGrub - Dashboard",
  description: "MonoCloud sample dashboard showcasing authentication features, protected routes, and user profile management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen antialiased"
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
