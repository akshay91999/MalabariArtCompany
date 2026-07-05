import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Send } from 'lucide-react';
import assetsData from '../assets-list.json';

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, sending, success

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus("sending");
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1200);
    };

    const handleScrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
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
        <footer className="bg-ink-black text-primary-bg/70 py-16 px-6 md:px-12 border-t border-ink-black/20 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                {/* Brand Block */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={assetsData.logo}
                            alt="Malabari Art Logo"
                            className="h-24 md:h-36 w-auto object-contain"
                        />
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-primary-bg/50">
                        Rooted in contemporary and modern Indian art, Malabari Art Company curates
                        original canvases that bridge heritage with modern spaces. Experience handmade
                        Indian artistry.
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-[#d87c56] font-serif italic max-w-md leading-relaxed">
                        "Art is the mirror that reflects life's beauty"
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        <a
                            href="https://instagram.com/malabari_art.company"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-primary-bg/5 hover:bg-[#d87c56] hover:text-white rounded-full transition-all duration-300"
                            aria-label="Instagram"
                        >
                            {/* Instagram SVG */}
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-primary-bg/5 hover:bg-[#d87c56] hover:text-white rounded-full transition-all duration-300"
                            aria-label="Facebook"
                        >
                            {/* Facebook SVG */}
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a
                            href="https://pinterest.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-primary-bg/5 hover:bg-[#d87c56] hover:text-white rounded-full transition-all duration-300"
                            aria-label="Pinterest"
                        >
                            {/* Custom SVG for Pinterest since Lucide doesn't have it on default */}
                            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.218-.172.263-.397.162-1.482-.693-2.407-2.871-2.407-4.619 0-3.763 2.74-7.218 7.892-7.218 4.143 0 7.362 2.952 7.362 6.899 0 4.116-2.599 7.429-6.207 7.429-1.213 0-2.357-.63-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 11.988-5.366 11.988-11.987C23.988 5.368 18.618 0 12.017 0z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Navigation Quick Links */}
                <div className="flex flex-col gap-5">
                    <span className="font-serif text-lg font-semibold text-primary-bg tracking-wide">
                        Malabari Art
                    </span>
                    <nav className="flex flex-col gap-3.5">
                        <a href="#featured" onClick={(e) => handleScrollToSection(e, '#featured')} className="text-sm hover:text-[#d87c56] hover:translate-x-1 transition-all duration-300">
                            Curator's Picks
                        </a>
                        <a href="#collections" onClick={(e) => handleScrollToSection(e, '#collections')} className="text-sm hover:text-[#d87c56] hover:translate-x-1 transition-all duration-300">
                            Collections
                        </a>
                        <a href="#gallery" onClick={(e) => handleScrollToSection(e, '#gallery')} className="text-sm hover:text-[#d87c56] hover:translate-x-1 transition-all duration-300">
                            Full Gallery
                        </a>
                        <a href="#videos" onClick={(e) => handleScrollToSection(e, '#videos')} className="text-sm hover:text-[#d87c56] hover:translate-x-1 transition-all duration-300">
                            Studio Reels
                        </a>
                        <a href="#story" onClick={(e) => handleScrollToSection(e, '#story')} className="text-sm hover:text-[#d87c56] hover:translate-x-1 transition-all duration-300">
                            Our Story
                        </a>
                        <a href="#contact" onClick={(e) => handleScrollToSection(e, '#contact')} className="text-sm hover:text-[#d87c56] hover:translate-x-1 transition-all duration-300">
                            Enquire
                        </a>
                    </nav>
                </div>

                {/* Newsletter Inquire Form */}
                <div className="flex flex-col gap-5">
                    <span className="font-serif text-lg font-semibold text-primary-bg tracking-wide">
                        Art Newsletter
                    </span>
                    <p className="text-sm text-primary-bg/50 leading-relaxed">
                        Subscribe to receive private viewings of new collections and artist interviews.
                    </p>

                    <form onSubmit={handleSubmit} className="flex border-b border-primary-bg/25 pb-2 mt-2 group focus-within:border-accent-orange transition-colors">
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-primary-bg flex-grow placeholder-primary-bg/35 focus:ring-0"
                            required
                        />
                        <button
                            type="submit"
                            className="p-1 hover:text-accent-orange transition-colors cursor-pointer"
                            disabled={status === 'sending'}
                            aria-label="Subscribe"
                        >
                            {status === 'sending' ? (
                                <span className="w-4 h-4 border-2 border-primary-bg border-t-transparent animate-spin rounded-full block" />
                            ) : (
                                <Send size={16} />
                            )}
                        </button>
                    </form>

                    <AnimatePresence>
                        {status === "success" && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-accent-orange mt-1 font-medium"
                            >
                                Thank you for subscribing to our private catalog.
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            <div className="max-w-7xl mx-auto border-t border-primary-bg/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-bg/40">
                <span>© {new Date().getFullYear()} Malabari Art Company. All Rights Reserved.</span>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary-bg transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary-bg transition-colors">Terms of Sale</a>
                </div>
            </div>
        </footer>
    );
}
