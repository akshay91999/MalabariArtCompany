import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, Check } from 'lucide-react';
import assetsData from '../assets-list.json';

// Helper to extract active video categories
const VIDEO_CATEGORIES = ["All", ...new Set(assetsData.videos.map(v => v.category))];

function VideoCard({ video, onClick }) {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            // Reset back to start state
            videoRef.current.currentTime = 0;
        }
    };

    // Convert files names to human-readable titles
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

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[9/16] sm:aspect-video md:aspect-[4/5] bg-[#E2D8CC] overflow-hidden border border-black/5 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(video)}
        >
            <video
                ref={videoRef}
                src={`${video.src}#t=0.1`}
                preload="metadata"
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Video Overlay Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-transparent to-ink-black/30 flex flex-col justify-between p-5 z-10 transition-opacity duration-300">

                {/* Top bar: Category Badge */}
                <div className="self-start bg-primary-bg/95 backdrop-blur-sm border border-accent-orange/15 px-2.5 py-1 text-[9px] uppercase tracking-widest font-sans font-bold text-accent-orange">
                    {video.category}
                </div>

                {/* Play Icon indicator (fades/slides in on hover) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-primary-bg/25 backdrop-blur-sm border border-primary-bg/40 text-primary-bg scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                    <Play size={20} className="fill-current text-white m-[2px]" />
                </div>

                {/* Bottom bar: Title and Description */}
                <div className="flex flex-col gap-1 text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#d87c56] font-sans">
                        Behind the Canvas
                    </span>
                    <h4 className="font-serif text-lg leading-tight text-white line-clamp-1">
                        Studio Session: {formattedTitle}
                    </h4>
                    <span className="text-[10px] text-white/50 font-sans tracking-wide">
                        Hover to Preview • Click to Fullscreen
                    </span>
                </div>

            </div>

            {/* Bottom Orange border line on hover */}
            <div className="absolute bottom-0 left-0 h-[3px] bg-accent-orange w-0 group-hover:w-full transition-all duration-500 z-20" />
        </motion.div>
    );
}

export default function VideoGallery({ onSelectVideo }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredVideos = activeCategory === "All"
        ? assetsData.videos
        : assetsData.videos.filter(v => v.category === activeCategory);

    return (
        <section id="videos" className="py-24 px-6 md:px-12 bg-primary-bg border-b border-muted-ivory select-none text-left">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-muted-ivory pb-8">
                    <div className="flex flex-col gap-2 max-w-xl">
                        <span className="text-xs uppercase tracking-widest text-accent-orange font-semibold font-sans flex items-center gap-2">
                            <Film size={14} />
                            Process & Creation
                        </span>
                        <h2 className="text-3xl md:text-5xl font-light text-ink-black font-serif leading-none">
                            Studio Showcase Reels
                        </h2>
                        <p className="text-sm font-sans text-ink-black/60 mt-3 font-light leading-relaxed">
                            Step inside our workspace. Watch the hands of master traditional artists mold plaster,
                            blend oil pigments, and detail Indian heritage murals in real-time.
                        </p>
                    </div>

                    {/* Categories Tab Selector */}
                    <div className="flex flex-wrap gap-2 md:self-end">
                        {VIDEO_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-xs tracking-wider font-sans font-medium transition-all duration-300 relative flex items-center gap-1.5 cursor-pointer ${activeCategory === cat
                                        ? 'text-accent-orange border-b border-accent-orange font-semibold'
                                        : 'text-ink-black/60 border-b border-transparent hover:text-ink-black'
                                    }`}
                            >
                                {activeCategory === cat && <Check size={10} />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredVideos.map((video) => (
                            <VideoCard
                                key={video.src}
                                video={video}
                                onClick={onSelectVideo}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* No Videos Found Fallback */}
                {filteredVideos.length === 0 && (
                    <div className="py-20 text-center text-ink-black/40 font-sans text-sm border border-dashed border-[#E2D8CC] bg-muted-ivory">
                        No creation reels available for this collection currently.
                    </div>
                )}

            </div>
        </section>
    );
}
