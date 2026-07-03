import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Eye, Palette } from 'lucide-react';
import { allArtworks, CATEGORIES as SITE_CATEGORIES } from '../data/site-data';

const CATEGORIES = ["All", ...SITE_CATEGORIES];
const INITIAL_LOAD_COUNT = 9;
const LOAD_MORE_COUNT = 9;

export default function Gallery({ onSelectArtwork, activeCategory, setActiveCategory }) {
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

    // Filter artworks by category
    const filteredArtworks = useMemo(() => {
        setVisibleCount(INITIAL_LOAD_COUNT); // Reset visible pagination on filter change
        if (activeCategory === "All") {
            return allArtworks;
        }
        return allArtworks.filter(art => art.category === activeCategory);
    }, [activeCategory]);

    const visibleArtworks = useMemo(() => {
        return filteredArtworks.slice(0, visibleCount);
    }, [filteredArtworks, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredArtworks.length));
    };

    return (
        <section id="gallery" className="py-24 px-6 md:px-12 bg-primary-bg select-none">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Header Block */}
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-widest text-accent-orange font-semibold font-sans"
                    >
                        Art Catalog
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-light text-ink-black mt-2 font-serif leading-none"
                    >
                        The Collection Gallery
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 60 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="h-[1.5px] bg-accent-orange mt-5 mb-5"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-sans text-ink-black/80 leading-relaxed font-light"
                    >
                        Discover our complete roster of handmade fine artworks. Click on any canvas
                        frame to access curator details, sizing specs, framing configurations, and enquire about purchase.
                    </motion.p>
                </div>

                {/* Filter Navigation Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 border-b border-[#EEEAE4] pb-6">
                    <div className="flex items-center gap-2 mr-2 text-xs uppercase tracking-widest text-[#B5AFA9] font-bold">
                        <Filter size={12} />
                        <span>Filter:</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all duration-300 ${activeCategory === category
                                    ? 'bg-ink-black border-ink-black text-primary-bg'
                                    : 'bg-transparent border-transparent text-ink-black/60 hover:text-ink-black hover:bg-[#EEEAE4]'
                                    } cursor-pointer`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry/Grid Canvas Listing */}
                {filteredArtworks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-16 px-6 text-center border border-dashed border-[#EEE6DE] bg-muted-ivory flex flex-col items-center justify-center gap-4 max-w-xl mx-auto"
                    >
                        <Palette size={32} className="text-accent-orange" />
                        <h4 className="font-serif text-xl font-medium text-ink-black">Custom Project Commissions</h4>
                        <p className="text-xs font-sans text-ink-black/60 leading-relaxed max-w-sm">
                            We do not currently have pre-painted inventory in the <strong className="text-accent-orange">"{activeCategory}"</strong> category.
                            However, our master artisans specialize in this medium. Contact us to commission a bespoke masterwork.
                        </p>
                        <a
                            href="#contact"
                            className="mt-2 px-5 py-2.5 bg-ink-black text-white hover:bg-accent-orange text-[10px] uppercase font-bold tracking-widest transition-colors duration-300"
                        >
                            Discuss Custom Commission
                        </a>
                    </motion.div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                        <AnimatePresence mode="popLayout">
                            {visibleArtworks.map((art, idx) => (
                                <motion.div
                                    key={art.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: (idx % 3) * 0.05 }}
                                    viewport={{ once: true }}
                                    onClick={() => onSelectArtwork(art)}
                                    className="break-inside-avoid w-full bg-muted-ivory p-4 border border-[#EEE6DE] hover:border-accent-orange/40 hover:shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col"
                                >
                                    {/* Artwork Frame Wrapper */}
                                    <div className="relative overflow-hidden bg-[#EADFD5]">
                                        <img
                                            src={art.src}
                                            alt={art.title}
                                            loading="lazy"
                                            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        {/* Eye symbol zoom overlay on hover */}
                                        <div className="absolute inset-0 bg-ink-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="p-3.5 bg-primary-bg rounded-none shadow-md text-ink-black group-hover:scale-110 transition-transform duration-500">
                                                <Eye size={20} className="text-ink-black group-hover:text-accent-orange transition-colors" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Details Footer */}
                                    <div className="mt-4 text-left flex flex-col flex-grow">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase tracking-wider text-accent-orange font-semibold">
                                                    {art.category}
                                                </span>
                                                <span className="font-serif text-lg font-medium text-ink-black mt-0.5 group-hover:text-accent-orange transition-colors duration-300">
                                                    {art.title}
                                                </span>
                                                <span className="text-[11px] text-ink-black/50 font-sans">
                                                    by {art.artist}
                                                </span>
                                            </div>
                                            <span className="font-serif text-base font-semibold text-ink-black leading-none shrink-0 pt-1">
                                                {art.formattedPrice}
                                            </span>
                                        </div>

                                        <div className="h-[0.5px] bg-[#EEEAE4] my-3 w-full" />

                                        <div className="flex justify-between items-center text-[10px] text-ink-black/40 font-sans tracking-wide">
                                            <span>{art.medium}</span>
                                            <span>{art.size}</span>
                                        </div>
                                    </div>

                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Load More Button */}
                {filteredArtworks.length > visibleCount && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-ink-black hover:border-accent-orange text-ink-black hover:text-accent-orange text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
                        >
                            <Palette size={14} />
                            Load More Artworks ({filteredArtworks.length - visibleCount} remaining)
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
