import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CornerRightDown, Quote } from 'lucide-react';
import { brandStory, allArtworks } from '../data/site-data';
import assetsData from '../assets-list.json';

function AnimatedCounter({ value, label, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000; // 2 seconds
        const end = parseInt(value, 10);
        if (isNaN(end)) return;

        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Ease out quad formula
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * (end - start) + start);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isInView, value]);

    return (
        <div ref={ref} className="flex flex-col items-center md:items-start text-center md:text-left p-4">
            <div className="font-serif text-4xl md:text-5xl font-light text-accent-orange leading-none flex items-baseline">
                <span>{count}</span>
                <span className="text-xl md:text-2xl font-sans font-semibold ml-0.5 text-accent-orange">
                    {suffix}
                </span>
            </div>
            <span className="text-xs uppercase tracking-widest text-ink-black/60 font-semibold mt-2.5 font-sans">
                {label}
            </span>
        </div>
    );
}

export default function OurStory() {
    // Use the first video in the list as the editorial visual reel
    const videoObj = assetsData.videos.length > 0 ? assetsData.videos[0] : null;
    const videoSrc = videoObj ? videoObj.src : null;
    // Use the logo or a random painting as an overlay picture
    const paintingSrc = allArtworks.length > 10 ? allArtworks[10].src : allArtworks[0]?.src;

    return (
        <section id="story" className="py-24 px-6 md:px-12 bg-primary-bg overflow-hidden border-b border-muted-ivory select-none text-left">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Editorial Split Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Visual Collage with Video Reel */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex flex-col gap-4 order-last lg:order-first"
                    >
                        {/* Main Video Reel Frame */}
                        <div className="w-full aspect-[4/3] bg-[#EADFD5] overflow-hidden relative shadow-lg border border-black/5">
                            {videoSrc ? (
                                <video
                                    src={videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                                />
                            ) : (
                                <img
                                    src={paintingSrc}
                                    alt="Artistic details"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {/* Float badge */}
                            <div className="absolute top-4 left-4 bg-primary-bg px-4 py-2 border border-muted-ivory shadow-md flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-ink-black/80">
                                    At Work in Studio
                                </span>
                            </div>
                        </div>

                        {/* Overlap Secondary Frame */}
                        <div className="grid grid-cols-5 gap-4 items-center">
                            <div className="col-span-2 text-xs italic font-sans text-ink-black/50 leading-relaxed max-w-[200px] border-l border-accent-orange/30 pl-4 py-1.5 self-center">
                                “Art does not replicate what we see, rather it manifests the unseen rhythms of the land.”
                            </div>
                            <div className="col-span-3 aspect-[16/10] bg-[#D4C6B9] overflow-hidden shadow-md border border-black/5">
                                <img
                                    src={paintingSrc}
                                    alt="Indian artwork fragment"
                                    loading="lazy"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Editorial Text */}
                    <div className="flex flex-col gap-6 lg:pl-4">
                        <span className="text-xs uppercase tracking-widest text-accent-orange font-semibold font-sans flex items-center gap-2">
                            Our Origins
                            <CornerRightDown size={14} />
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink-black leading-tight">
                            A Dialogue of Heritage & contemporary voice
                        </h2>

                        <div className="h-[1.5px] bg-[#EBE4DC] w-20 my-1" />

                        <div className="flex flex-col gap-6 text-sm md:text-base font-sans text-ink-black/75 leading-relaxed font-light">
                            {brandStory.narrativeParagraphs.map((para, idx) => (
                                <p key={idx}>
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Quote block */}
                        <div className="relative bg-muted-ivory p-6 md:p-8 mt-4 border border-[#EEE6DE] flex flex-col gap-3">
                            <Quote className="text-accent-orange/20 absolute -top-3 -left-2 rotate-180" size={48} />
                            <p className="font-serif text-base text-ink-black italic relative z-10 font-normal leading-relaxed">
                                “Indian art is not primitive, nor is it static. It is a live, pulsating cycle of breath.
                                We are proud to present these stories in formats that complement modern editorial architecture.”
                            </p>
                            <span className="text-[10px] uppercase tracking-wider text-accent-teal font-extrabold self-end">
                                — Curators Panel, Malabari Art Company [PLACEHOLDER]
                            </span>
                        </div>
                    </div>

                </div>

                {/* Animated Counter Stats Grid */}
                <div className="bg-muted-ivory border border-[#EEE6DE] py-10 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center divide-y md:divide-y-0 md:divide-x divide-[#E2D8CC]">
                    {brandStory.stats.map((stat, idx) => (
                        <AnimatedCounter
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
