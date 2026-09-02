import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SocialProof from '@/components/social-proof';
import { getCommunityProjects, getTestimonials, getCommunityStats } from '@/lib/db';

export const revalidate = 30;

export const metadata = {
  title: "Forge Community Shared Builds & Showcase",
  description: "Explore real applications, side projects, and tools shipped by developers using Forge.",
};

export default async function CommunityPage() {
  const [projects, testimonials, stats] = await Promise.all([
    getCommunityProjects(),
    getTestimonials(),
    getCommunityStats(),
  ]);

  return (
    <div className="bg-surface-container-lowest text-on-background font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <SocialProof
          initialProjects={projects}
          initialTestimonials={testimonials}
          initialStats={stats}
        />
      </main>
      <Footer />
    </div>
  );
}
