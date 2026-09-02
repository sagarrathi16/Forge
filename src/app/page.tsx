import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Audience from '@/components/audience';
import HowItWorks from '@/components/how-it-works';
import WaitlistForm from '@/components/waitlist';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-surface-container-lowest text-on-background font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Audience />
        <HowItWorks />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
