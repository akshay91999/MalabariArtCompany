import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ShoppingCart, MessageCircle, HelpCircle } from 'lucide-react';

export default function Lightbox({ artwork, onClose, onPrev, onNext, hasPrev, hasNext }) {

    // Close on ESC keypress
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
            if (e.key === 'ArrowRight' && hasNext) onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        // Lock scroll
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, onPrev, onNext, hasPrev, hasNext]);

    if (!artwork) return null;

    // Prefilled WhatsApp Enquiry content
    const whatsAppMessage = encodeURIComponent(
        artwork.price === 0
            ? `Hello Malabari Art Company, I watched the studio reel "${artwork.title}" and would like to consult about commissioning a custom artwork in the "${artwork.category}" category.`
            : `Hello Malabari Art Company, I am interested in purchasing/inquiring about the artwork titled "${artwork.title}" by ${artwork.artist}. (Size: ${artwork.size}, Price: ${artwork.formattedPrice}). Could you please share more details?`
    );
    const whatsAppLink = `https://wa.me/919207524079?text=${whatsAppMessage}`; // WhatsApp curator number

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-ink-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 select-none"
                onClick={handleBackdropClick}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-25 text-primary-bg/60 hover:text-white p-2 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    aria-label="Close Lightbox"
                >
                    <X size={28} />
                </button>

                {/* Gallery Navigation Arrows (Floating desktop triggers) */}
                {hasPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-primary-bg/50 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all duration-300 hidden md:block cursor-pointer"
                        aria-label="Previous artwork"
                    >
                        <ArrowLeft size={30} />
                    </button>
                )}
                {hasNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-primary-bg/50 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all duration-300 hidden md:block cursor-pointer"
                        aria-label="Next artwork"
                    >
                        <ArrowRight size={30} />
                    </button>
                )}

                {/* Modal Window Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 180 }}
                    className="bg-primary-bg w-full max-w-6xl max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-white/10"
                >
                    {/* Left Frame: Media viewport */}
                    <div className="flex-1 md:w-3/5 bg-ink-black flex items-center justify-center p-4 relative group aspect-[4/3] md:aspect-auto">
                        {artwork.src.endsWith('.mp4') ? (
                            <video
                                src={artwork.src}
                                controls
                                autoPlay
                                className="max-w-full max-h-[50vh] md:max-h-[75vh] object-contain shadow-lg"
                            />
                        ) : (
                            <img
                                src={artwork.src}
                                alt={artwork.title}
                                className="max-w-full max-h-[50vh] md:max-h-[75vh] object-contain shadow-lg"
                            />
                        )}
                        {/* Year Stamp */}
                        <span className="absolute bottom-4 left-4 text-[10px] tracking-widest text-[#888] font-bold bg-[#111] px-3 py-1 font-sans">
                            {artwork.src.endsWith('.mp4') ? 'STUDIO REEL' : 'CERTIFIED ORIGINAL'} · {artwork.year}
                        </span>
                    </div>

                    {/* Right Frame: Artwork Specs Editorial */}
                    <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between bg-primary-bg overflow-y-auto max-h-[40vh] md:max-h-none text-left">
                        <div className="flex flex-col">
                            {/* Category */}
                            <span className="text-xs uppercase tracking-widest font-semibold text-accent-orange font-sans">
                                {artwork.category}
                            </span>

                            {/* Artwork Title */}
                            <h3 className="font-serif text-3xl font-light text-ink-black mt-2 leading-tight">
                                {artwork.title}
                            </h3>

                            {/* Artist Name */}
                            <span className="text-sm text-ink-black/60 font-sans mt-1">
                                by {artwork.artist}
                            </span>

                            <div className="h-[1px] bg-[#EBE4DC] my-6 w-full" />

                            {/* Data specifications list */}
                            <div className="grid grid-cols-2 gap-4 text-xs tracking-wide text-ink-black/70 font-sans">
                                <div>
                                    <span className="text-[10px] text-ink-black/40 block uppercase font-semibold">Medium</span>
                                    <span className="font-medium mt-0.5 block">{artwork.medium}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-ink-black/40 block uppercase font-semibold">Dimensions</span>
                                    <span className="font-medium mt-0.5 block">{artwork.size}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-[10px] text-ink-black/40 block uppercase font-semibold">Framing</span>
                                    <span className="font-medium mt-0.5 block">Optional Teakwood/Floating [PLACEHOLDER]</span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-[10px] text-ink-black/40 block uppercase font-semibold">Authenticity</span>
                                    <span className="font-medium mt-0.5 block text-accent-teal">Artist Signed Certificate</span>
                                </div>
                            </div>

                            <div className="h-[1px] bg-[#EBE4DC] my-6 w-full" />

                            {/* Narrative Story summary */}
                            <div className="text-xs leading-relaxed text-ink-black/60 font-sans italic">
                                <span className="text-[10px] text-ink-black/40 block uppercase font-semibold not-italic mb-1">Curator's Notes</span>
                                {artwork.story}
                            </div>
                        </div>

                        {/* Bottom Actions Frame */}
                        <div className="mt-8 flex flex-col gap-3">
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-xs text-ink-black/40 font-semibold uppercase">
                                    {artwork.price === 0 ? 'Availability' : 'Artwork Value'}
                                </span>
                                <span className="font-serif text-2xl font-bold text-ink-black">
                                    {artwork.formattedPrice}
                                </span>
                            </div>

                            {/* WhatsApp Enquiry Button */}
                            <a
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-3 px-6 py-3.5 bg-accent-orange text-white text-sm uppercase tracking-wider font-bold rounded-none hover:bg-ink-black transition-all duration-300 shadow-md text-center"
                            >
                                <MessageCircle size={16} />
                                {artwork.price === 0 ? 'Consult Custom Commission' : 'Enquire via WhatsApp'}
                            </a>

                            {/* Email Enquiry Alternative */}
                            <a
                                href={`#contact`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    const contactEl = document.querySelector('#contact');
                                    if (contactEl) {
                                        const offset = 80;
                                        const bodyRect = document.body.getBoundingClientRect().top;
                                        const contactRect = contactEl.getBoundingClientRect().top;
                                        window.scrollTo({
                                            top: contactRect - bodyRect - offset,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold text-ink-black/60 hover:text-accent-orange py-2.5 transition-colors"
                            >
                                <HelpCircle size={14} />
                                Ask about Custom Commissions
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
