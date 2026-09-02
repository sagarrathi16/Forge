import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Templates from '@/components/templates';
import { getTemplates } from '@/lib/db';

export const revalidate = 60;

export const metadata = {
  title: "Forge Starter Kits & Templates",
  description: "Browse curated production-ready templates for React, Supabase, Next.js, Python FastAPI, and Rust WebAssembly.",
};

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="bg-surface-container-lowest text-on-background font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <Templates initialTemplates={templates} />
      </main>
      <Footer />
    </div>
  );
}
