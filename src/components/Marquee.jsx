import { marqueeHighlights } from '../data/site-data';

export default function Marquee() {
    // Duplicate array list to ensure seamless transition gap loops
    const marqueeItems = [...marqueeHighlights, ...marqueeHighlights, ...marqueeHighlights];

    return (
        <section className="bg-accent-teal text-primary-bg py-5 border-y border-accent-teal/40 overflow-hidden relative select-none">
            {/* Absolute shading gradients on sides for sleek gallery feel */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-accent-teal to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-accent-teal to-transparent z-10 pointer-events-none" />

            <div className="w-full flex overflow-hidden">
                <div className="animate-marquee-infinite flex whitespace-nowrap items-center">
                    {marqueeItems.map((text, idx) => (
                        <div
                            key={`${text}-${idx}`}
                            className="flex items-center mx-8 md:mx-12 text-sm md:text-base uppercase tracking-widest font-sans font-medium"
                        >
                            <span className="text-white hover:text-accent-orange transition-colors duration-300">
                                {text}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-accent-orange ml-8 md:ml-12 inline-block opacity-75" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
