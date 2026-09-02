import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SocialProof from '@/components/social-proof';

export const metadata = {
  title: "Forge Community Shared Builds & Showcase",
  description: "Explore real applications, side projects, and tools shipped by developers using Forge.",
};

export default function CommunityPage() {
  return (
    <div className="bg-surface-container-lowest text-on-background font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}

