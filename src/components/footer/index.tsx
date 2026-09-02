export default function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Forge. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#community" className="hover:text-foreground transition-colors">Community</a>
          <a href="#waitlist" className="hover:text-foreground transition-colors">Waitlist</a>
        </div>
      </div>
    </footer>
  );
}

