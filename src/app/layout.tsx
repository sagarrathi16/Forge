import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge - From idea to built project",
  description: "Forge helps developers turn ideas into real software projects with templates, AI-assisted tools, one-click deployment, and community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
