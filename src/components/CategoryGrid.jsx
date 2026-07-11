import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { allArtworks } from '../data/site-data';

const CATEGORY_INFOS = [
    {
        name: "Canvas paintings",
        tagline: "Original oil and acrylic works on canvas, featuring rich textures and folklore motifs.",
        fallbackIndex: 0
    },
    {
        name: "Portraits drawings",
        tagline: "Fine-art custom drawings and portraits demonstrating realistic details and master drafting.",
        fallbackIndex: 5
    },
    {
        name: "Wall art paintings",
        tagline: "Transformative large-scale mural paintings designed to elevate walls and architectural structures.",
        fallbackIndex: 12
    },
    {
        name: "Wall art sculpture",
        tagline: "Stunning three-dimensional wall sculptures and relief artwork creating deep interplay of light and shadow.",
        fallbackIndex: 18
    }
];

export default function CategoryGrid({ onSelectCategory }) {

    // Find a stable representative image for each category from the assets
    const getCategoryImage = (catName, fallbackIdx) => {
        const matching = allArtworks.find(art => art.category === catName);
        if (matching) return matching.src;
        // Fallback to stable index if no matching category
        const fallbackImage = allArtworks[fallbackIdx % allArtworks.length];
        return fallbackImage ? fallbackImage.src : '/assets/logo.jpeg';
    };

    const handleScrollToGalleryWithCategory = (categoryName) => {
        onSelectCategory(categoryName);
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

    return (
        <section id="collections" className="py-24 px-6 md:px-12 bg-muted-ivory border-b border-muted-ivory select-none">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-widest text-accent-orange font-semibold font-sans"
                    >
                        Curated Themes
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-light text-ink-black mt-2 font-serif leading-none"
                    >
                        Explore Collections
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
                        transition={{ delay: 0.3 }}
                        className="text-sm font-sans text-ink-black/80 leading-relaxed font-light"
                    >
                        Browse our original art categorized by artistic movements and themes.
                        Select any collection tile to filter the main gallery space.
                    </motion.p>
                </div>

                {/* Category tiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 min-h-[500px]">

                    {CATEGORY_INFOS.map((cat, index) => {
                        const imgSrc = getCategoryImage(cat.name, cat.fallbackIndex);

                        // Clean 2x2 grid layout (each spans 3 of 6 columns)
                        const colSpanClass = "md:col-span-3";

                        return (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => handleScrollToGalleryWithCategory(cat.name)}
                                className={`relative overflow-hidden aspect-[16/9] md:aspect-auto ${colSpanClass} min-h-[260px] cursor-pointer group flex items-end p-8 border border-black/5 hover:shadow-2xl transition-all duration-500`}
                            >
                                {/* Background image zoom effects */}
                                <div className="absolute inset-0 z-0 bg-[#EADFD5]">
                                    <img
                                        src={imgSrc}
                                        alt={cat.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink-black/75 via-ink-black/25 to-transparent transition-colors duration-500 group-hover:bg-ink-black/80" />
                                </div>

                                {/* Content Details */}
                                <div className="relative z-10 text-left text-primary-bg flex flex-col justify-end h-full w-full gap-2">
                                    <motion.div className="flex items-center gap-2">
                                        <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide group-hover:text-accent-orange transition-colors">
                                            {cat.name}
                                        </h3>
                                        <ArrowUpRight size={18} className="translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-accent-orange" />
                                    </motion.div>
                                    <p className="text-xs md:text-sm text-primary-bg/70 max-w-md font-sans tracking-wide leading-relaxed line-clamp-2 md:line-clamp-none">
                                        {cat.tagline}
                                    </p>
                                </div>

                                {/* Accent Corner Design Line */}
                                <div className="absolute top-0 right-0 w-0 h-0.5 bg-accent-orange group-hover:w-full transition-all duration-500" />
                                <div className="absolute top-0 right-0 w-0.5 h-0 bg-accent-orange group-hover:h-full transition-all duration-500" />
                            </motion.div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}
