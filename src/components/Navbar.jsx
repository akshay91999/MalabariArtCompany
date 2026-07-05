import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import assetsData from '../assets-list.json';

const NAV_ITEMS = [
    { label: "Curator's Picks", href: "#featured" },
    { label: "Collections", href: "#collections" },
    { label: "Gallery", href: "#gallery" },
    { label: "Studio Reels", href: "#videos" },
    { label: "Our Story", href: "#story" },
    { label: "Contact", href: "#contact" }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollToSection = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = 80; // height of navbar
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
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-primary-bg/90 backdrop-blur-md shadow-sm border-b border-muted-ivory py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => handleScrollToSection(e, '#')}
                    className="flex items-center gap-3 group"
                >
                    <img
                        src={assetsData.logoSymbol || assetsData.logo}
                        alt="Malabari Art Company Logo"
                        className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col">
                        <span className="font-serif text-lg md:text-xl font-semibold tracking-wide text-ink-black leading-none">
                            MALABARI
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-accent-orange font-medium mt-0.5">
                            Art Company
                        </span>
                    </div>
                </a>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-10">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleScrollToSection(e, item.href)}
                            className="relative text-sm tracking-wider uppercase text-ink-black/70 hover:text-ink-black transition-colors duration-300 py-2 group font-sans font-medium"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-orange transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <motion.a
                        href="#contact"
                        onClick={(e) => handleScrollToSection(e, '#contact')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-black text-primary-bg text-sm uppercase tracking-wider font-semibold rounded-none border border-ink-black hover:bg-transparent hover:text-ink-black transition-all duration-300 shadow-md"
                    >
                        Enquire Now
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {/* Mobile Toggle Drawer Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-ink-black focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-primary-bg border-b border-muted-ivory"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleScrollToSection(e, item.href)}
                                    className="text-lg uppercase tracking-widest font-serif text-ink-black hover:text-accent-orange transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="h-[1px] bg-muted-ivory my-2" />
                            <a
                                href="#contact"
                                onClick={(e) => handleScrollToSection(e, '#contact')}
                                className="flex items-center justify-between px-5 py-3.5 bg-accent-orange text-white text-sm uppercase tracking-wider font-bold rounded-none"
                            >
                                Enquire Now
                                <PhoneCall size={16} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
