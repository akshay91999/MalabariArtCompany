import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeaturedCarousel from './components/FeaturedCarousel';
import CategoryGrid from './components/CategoryGrid';
import Gallery from './components/Gallery';
import OurStory from './components/OurStory';
import TrustBadges from './components/TrustBadges';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import VideoGallery from './components/VideoGallery';
import { allArtworks } from './data/site-data';

// Scroll reveal variants
const scrollRevealVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Custom cursor position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [hideCursor, setHideCursor] = useState(true);

  // Monitor mouse movements for cursor
  useEffect(() => {
    const updateMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (hideCursor) setHideCursor(false);
    };

    const handleMouseLeave = () => setHideCursor(true);
    const handleMouseEnter = () => setHideCursor(false);

    window.addEventListener('mousemove', updateMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hideCursor]);

  // Hook element hovering for cursor effects
  useEffect(() => {
    const handleHoverStart = () => setCursorHovered(true);
    const handleHoverEnd = () => setCursorHovered(false);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [onClick], [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [activeCategory, selectedArtwork]);

  // Lightbox Slide navigation
  const currentIndex = selectedArtwork
    ? allArtworks.findIndex(art => art.id === selectedArtwork.id)
    : -1;

  const handlePrevArtwork = () => {
    if (currentIndex > 0) {
      setSelectedArtwork(allArtworks[currentIndex - 1]);
    }
  };

  const handleNextArtwork = () => {
    if (currentIndex < allArtworks.length - 1) {
      setSelectedArtwork(allArtworks[currentIndex + 1]);
    }
  };

  const handleSelectVideo = (video) => {
    const cleanVideoTitle = (name) => {
        let title = name.replace('WhatsApp Video ', '');
        title = title.replace(/\.[^/.]+$/, ""); // strip extension
        title = title.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
        
        const romanize = (num) => {
            const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
            let roman = '';
            for (let i in lookup) {
                while (num >= lookup[i]) {
                    roman += i;
                    num -= lookup[i];
                }
            }
            return roman;
        };
        
        title = title.replace(/\((\d+)\)$/, (match, p1) => {
            const num = parseInt(p1, 10);
            return ` ${romanize(num)}`;
        });
        
        title = title.replace(/at\s/i, '').replace(/PM|AM/i, '').trim();

        title = title.split(" ").map(word => {
            if (!word) return "";
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ");
        
        return title || 'Creation Reel';
    };

    const formattedTitle = cleanVideoTitle(video.name);

    setSelectedArtwork({
      id: video.src,
      src: video.src,
      title: `Studio Session: ${formattedTitle}`,
      artist: `Malabari Art Studio`,
      category: video.category || "Reel",
      medium: "Behind-the-Scenes Video Roll",
      size: "Exhibition Media",
      formattedPrice: "Exhibition Highlight",
      price: 0,
      year: 2026,
      story: "Watch the creation process in our studio, displaying traditional molding techniques, custom designs, and raw strokes from our Master Artists."
    });
  };

  return (
    <div className="relative min-h-screen bg-primary-bg overflow-x-hidden font-sans text-ink-blackSelection">

      {/* Custom Follower Cursor (Desktop Only) */}
      {!hideCursor && (
        <div
          className={`custom-cursor hidden md:block ${cursorHovered ? 'custom-cursor-hover' : ''}`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease'
          }}
        />
      )}

      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Banner Section */}
      <Hero />

      {/* Infinite Scrolling Badge ribbon */}
      <Marquee />

      {/* Section Reveal: Curator's Featured Picks */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={scrollRevealVariants}
      >
        <FeaturedCarousel onSelectArtwork={setSelectedArtwork} />
      </motion.div>

      {/* Section Reveal: Collections Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={scrollRevealVariants}
      >
        <CategoryGrid onSelectCategory={setActiveCategory} />
      </motion.div>

      {/* Section Reveal: Masonry Catalog */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={scrollRevealVariants}
      >
        <Gallery
          onSelectArtwork={setSelectedArtwork}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </motion.div>

      {/* Section Reveal: Video Showcase Gallery */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={scrollRevealVariants}
      >
        <VideoGallery onSelectVideo={handleSelectVideo} />
      </motion.div>

      {/* Section Reveal: Our Story narrative block */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={scrollRevealVariants}
      >
        <OurStory />
      </motion.div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Section Reveal: Contact Form */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={scrollRevealVariants}
      >
        <ContactForm />
      </motion.div>

      {/* Footer Block */}
      <Footer />

      {/* Lightbox / Art viewer modal */}
      {selectedArtwork && (
        <Lightbox
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onPrev={handlePrevArtwork}
          onNext={handleNextArtwork}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < allArtworks.length - 1}
        />
      )}

    </div>
  );
}

export default App;
