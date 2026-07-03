import { ShieldCheck, Truck, Sparkles, Hammer } from 'lucide-react';
import { trustBadges } from '../data/site-data';

// Map IDs to specific Lucide Icons for clean visuals
const ICON_MAP = {
    handcrafted: <Sparkles className="text-accent-orange" size={24} />,
    authenticity: <ShieldCheck className="text-accent-orange" size={24} />,
    shipping: <Truck className="text-accent-orange" size={24} />,
    framing: <Hammer className="text-accent-orange" size={24} />
};

export default function TrustBadges() {
    return (
        <section className="bg-muted-ivory border-y border-[#EEE6DE] py-16 px-6 md:px-12 select-none">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {trustBadges.map((badge) => (
                    <div
                        key={badge.id}
                        className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-primary-bg border border-black/5 hover:border-accent-orange/30 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Visual Icon Box */}
                        <div className="p-3 bg-[#FCF6F0] border border-accent-orange/10 mb-4 inline-block">
                            {ICON_MAP[badge.id] || ICON_MAP.authenticity}
                        </div>

                        {/* Title */}
                        <h4 className="font-serif text-lg font-semibold text-ink-black tracking-wide leading-tight">
                            {badge.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs font-sans text-ink-black/60 mt-2 leading-relaxed">
                            {badge.description}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
}
