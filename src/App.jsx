import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Canvas3D from './components/Canvas3D.jsx';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      targetRef.current = progress;
    };
    const tick = () => {
      setScrollProgress((prev) => {
        const next = prev + (targetRef.current - prev) * 0.08;
        return Math.abs(next - prev) < 0.0005 ? targetRef.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="app">
      <div className="ambient" aria-hidden="true" />
      <Header />
      <main className="main">
        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow">3D Portfolio</p>
            <h1>Charles Pura</h1>
            <p className="subtitle">
              Interactive 3D scenes, clean UI, and motion that feels alive.
            </p>
            <div className="cta-row">
              <button className="btn primary">View Projects</button>
              <button className="btn ghost">Contact</button>
            </div>
          </div>
          <div className="hero-canvas">
            <Canvas3D scrollProgress={scrollProgress} />
          </div>
        </div>
        <section id="projects" className="section">
          <h2>Selected Projects</h2>
          <p>
            A mix of real-time 3D, product visuals, and interactive experiences.
          </p>
          <div className="card-grid">
            <article className="card">
              <h3>Immersive Product Viewer</h3>
              <p>Interactive 3D product walk-through with hotspot overlays.</p>
            </article>
            <article className="card">
              <h3>Architectural Space</h3>
              <p>Real-time walkthrough for a modern residential concept.</p>
            </article>
            <article className="card">
              <h3>Brand Motion System</h3>
              <p>WebGL motion identity with scroll-synced scenes.</p>
            </article>
          </div>
        </section>
        <section id="about" className="section alt">
          <h2>About</h2>
          <p>
            I design 3D experiences that feel fast, tactile, and expressive.
            My focus is on clean composition, smooth motion, and elegant UX.
          </p>
        </section>
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>Let’s talk about your next interactive project.</p>
          <button className="btn primary">Email Me</button>
        </section>
        <section id="tech" className="section alt">
          <h2>Tech Stack</h2>
          <p>
            Built with React, Vite, Three.js, React Three Fiber, and Drei.
            Styled with custom CSS and optimized for smooth WebGL performance.
          </p>
        </section>
        <section className="section">
          <h2>Free Use Note</h2>
          <p>
            This portfolio template is free and can be used by anyone for personal
            or commercial projects. Credit is appreciated but not required.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
