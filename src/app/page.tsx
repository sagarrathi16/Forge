import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import HowItWorks from '@/components/how-it-works';
import SocialProof from '@/components/social-proof';
import WaitlistForm from '@/components/waitlist';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <SocialProof />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
