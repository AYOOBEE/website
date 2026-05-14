import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [progress, setProgress] = useState(0);

  // Reading progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      {/* Reading progress indicator */}
      <div id="reading-progress" style={{ width: `${progress}%` }} />

      <Navbar />

      {/* Main content — padded for fixed navbar */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}
