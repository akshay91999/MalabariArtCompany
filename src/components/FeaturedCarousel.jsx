import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CornerDownRight } from 'lucide-react';
import { featuredArtworks } from '../data/site-data';

export default function FeaturedCarousel({ onSelectArtwork }) {
    const containerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = containerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 5);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            // Run once initially
            checkScroll();
            // Handle resize recalculation
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (el) el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scrollBy = (offset) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="featured" className="py-24 px-6 md:px-12 bg-primary-bg overflow-hidden relative border-b border-muted-ivory select-none">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Header Block */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs uppercase tracking-widest text-accent-orange font-semibold font-sans"
                        >
                            Curated Selection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-light text-ink-black mt-2 font-serif leading-none"
                        >
                            Curator’s Finest Picks
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.7 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-sm font-sans mt-3 text-ink-black/80 leading-relaxed font-light"
                        >
                            A handpicked selection of original Indian paintings representing classical motifs
                            rendered via bold, modern expressions. Enjoy tactile details on brushstroke zoom.
                        </motion.p>
                    </div>

                    {/* Navigation Buttons for desktop */}
                    <div className="flex gap-4 self-start md:self-end">
                        <button
                            onClick={() => scrollBy(-350)}
                            disabled={!canScrollLeft}
                            className={`p-3.5 rounded-full border transition-all duration-300 ${canScrollLeft
                                    ? 'border-ink-black text-ink-black hover:bg-ink-black hover:text-primary-bg cursor-pointer'
                                    : 'border-muted-ivory text-ink-black/20 cursor-not-allowed'
                                }`}
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            onClick={() => scrollBy(350)}
                            disabled={!canScrollRight}
                            className={`p-3.5 rounded-full border transition-all duration-300 ${canScrollRight
                                    ? 'border-ink-black text-ink-black hover:bg-ink-black hover:text-primary-bg cursor-pointer'
                                    : 'border-muted-ivory text-ink-black/20 cursor-not-allowed'
                                }`}
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Draggable/Scrollable Gallery Strip */}
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {featuredArtworks.map((artwork, index) => (
                        <motion.div
                            key={artwork.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="min-w-[280px] sm:min-w-[340px] md:min-w-[400px] bg-muted-ivory p-4 snap-start group border border-[#EEE6DE] hover:border-accent-orange/40 hover:shadow-xl transition-all duration-500"
                        >
                            {/* Image Frame with Tilt Zoom */}
                            <div
                                onClick={() => onSelectArtwork(artwork)}
                                className="w-full aspect-[4/5] overflow-hidden bg-[#EADFD5] relative cursor-pointer"
                            >
                                {/* Micro-zoom and frame tilt on hover */}
                                <img
                                    src={artwork.src}
                                    alt={artwork.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Hover overlay with title (Sliding up details) */}
                                <div className="absolute inset-0 bg-ink-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="text-left translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-between w-full">
                                        <span className="text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                                            Enquire Art
                                            <CornerDownRight size={12} />
                                        </span>
                                        <span className="text-white text-[10px] uppercase tracking-widest bg-accent-orange px-3 py-1 font-semibold">
                                            {artwork.year}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Artwork Description Footer */}
                            <div className="mt-5 text-left flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-accent-orange font-semibold">
                                    {artwork.category}
                                </span>
                                <span
                                    onClick={() => onSelectArtwork(artwork)}
                                    className="font-serif text-lg md:text-xl font-medium text-ink-black mt-1 hover:text-accent-orange transition-colors cursor-pointer truncate"
                                >
                                    {artwork.title}
                                </span>
                                <span className="text-xs text-ink-black/60 font-sans mt-0.5">
                                    by {artwork.artist}
                                </span>

                                <div className="h-[1px] bg-[#EEEAE4] my-3.5 w-full" />

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-ink-black/50 font-sans italic">
                                        {artwork.size} · {artwork.medium}
                                    </span>
                                    <span className="font-serif text-base font-semibold text-ink-black leading-none">
                                        {artwork.formattedPrice}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
