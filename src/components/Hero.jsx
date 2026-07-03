import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { brandStory, allArtworks } from '../data/site-data';

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Pick 3 high-quality artworks from allArtworks list for slideshow
    const heroSlides = allArtworks.slice(0, Math.min(3, allArtworks.length));

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const handleScrollToGallery = (e) => {
        e.preventDefault();
        const element = document.querySelector('#gallery');
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleScrollToStories = (e) => {
        e.preventDefault();
        const element = document.querySelector('#story');
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative w-full h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-ink-black select-none">

            {/* Background Slideshow (Ken Burns Zoom/Pan Animation) */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    {heroSlides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, scale: 1.15 }}
                                animate={{ opacity: 0.65, scale: 1.05 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{
                                    opacity: { duration: 1.5, ease: "easeInOut" },
                                    scale: { duration: 6, ease: "linear" }
                                }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img
                                    src={slide.src}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                {/* Soft Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/40 to-ink-black/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-black/50 via-transparent to-ink-black/30 z-10" />
            </div>

            {/* Hero Content Elements */}
            <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center text-primary-bg flex flex-col items-center">

                {/* Subtitle / Brand Intro */}
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xs md:text-sm uppercase tracking-widest text-accent-orange font-semibold font-sans mb-4 inline-block"
                >
                    MALABARI ART COMPANY
                </motion.span>

                {/* Main Serif Headline */}
                <h1 className="sr-only">{brandStory.headline}</h1>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-tight px-2 max-w-4xl"
                >
                    {brandStory.headline}
                </motion.div>

                {/* Subhead narrative text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="mt-6 text-base sm:text-lg md:text-xl font-sans font-light tracking-wide text-primary-bg/80 max-w-2xl text-center leading-relaxed"
                >
                    {brandStory.subheading}
                </motion.p>

                {/* Buttons / CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
                >
                    <a
                        href="#gallery"
                        onClick={handleScrollToGallery}
                        className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-accent-orange text-white text-sm uppercase tracking-wider font-semibold rounded-none hover:bg-white hover:text-ink-black transition-all duration-300 shadow-lg"
                    >
                        Explore Gallery
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                    <a
                        href="#story"
                        onClick={handleScrollToStories}
                        className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent text-primary-bg text-sm uppercase tracking-wider font-semibold rounded-none border border-primary-bg/40 hover:border-accent-orange hover:text-accent-orange transition-all duration-300"
                    >
                        Our Story
                    </a>
                </motion.div>

            </div>

            {/* Floating Info Overlay showing details of active Slide Art */}
            {heroSlides.length > 0 && (
                <div className="absolute bottom-10 left-6 md:left-12 z-20 text-left hidden sm:flex flex-col gap-0.5">
                    <span className="text-[10px] tracking-widest text-[#8E8680] uppercase font-semibold">Active Artwork</span>
                    <span className="text-sm text-primary-bg/90 font-serif italic font-medium">{heroSlides[currentSlide].title}</span>
                    <span className="text-[11px] text-primary-bg/50 font-sans tracking-wide">
                        {heroSlides[currentSlide].artist} · {heroSlides[currentSlide].medium}
                    </span>
                </div>
            )}

            {/* Scroll Down Indicator */}
            <a
                href="#gallery"
                onClick={handleScrollToGallery}
                className="absolute bottom-8 right-6 md:right-12 z-20 text-primary-bg/40 hover:text-accent-orange flex flex-col items-center gap-2 cursor-pointer transition-colors duration-300"
            >
                <span className="text-[10px] tracking-widest uppercase font-semibold rotate-90 origin-right translate-y-[-14px]">Scroll</span>
                <ArrowDown size={14} className="animate-bounce mt-1" />
            </a>

        </section>
    );
}
