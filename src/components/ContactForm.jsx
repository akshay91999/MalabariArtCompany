import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquareHeart } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', type: 'General Inquiry' });
    const [status, setStatus] = useState('idle'); // idle, sending, success

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '', type: 'General Inquiry' });
        }, 1500);
    };

    // Dynamic WhatsApp commission link
    const whatsAppMsg = encodeURIComponent(
        `Hello Malabari Art Company, I'd like to consult on a custom art commission! Please let me know the process.`
    );
    const whatsAppLink = `https://wa.me/919999999999?text=${whatsAppMsg}`; // [PLACEHOLDER - WhatsApp number]

    return (
        <section id="contact" className="py-24 px-6 md:px-12 bg-primary-bg select-none text-left">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Header Block */}
                <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-widest text-accent-orange font-semibold font-sans"
                    >
                        Connect With Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-light text-ink-black mt-2 font-serif leading-none"
                    >
                        Inquire & Collaborate
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
                        className="text-sm font-sans text-ink-black/80 leading-relaxed font-light text-center"
                    >
                        Have a question about a specific artwork, frame selections, or custom commissions?
                        Fill out the form below, and our curatorial team will get back to you within 24 hours.
                    </motion.p>
                </div>

                {/* Contact Layout Splits */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Info Panels column (2/5 span) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <span className="font-serif text-2xl lg:text-3xl font-light text-ink-black tracking-wide">
                            Studio Details
                        </span>
                        <p className="text-sm text-ink-black/60 font-sans leading-relaxed">
                            We exhibit original paintings in our gallery by reservation. Drop by or
                            reach out to coordinate private previews in Kochi and Bangalore studios.
                        </p>

                        <div className="flex flex-col gap-6 font-sans text-sm mt-4">
                            <a href="mailto:info@malabariart.com" className="flex items-center gap-4 text-ink-black/70 hover:text-accent-orange transition-colors group">
                                <span className="p-3 bg-muted-ivory border border-black/5 group-hover:bg-[#FCF6F0] transition-colors text-accent-orange">
                                    <Mail size={16} />
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase text-ink-black/40 font-bold tracking-wider">Email Inquiry</span>
                                    <span className="font-medium mt-0.5">info@malabariart.com [PLACEHOLDER]</span>
                                </div>
                            </a>
                            <a href="tel:+919999999999" className="flex items-center gap-4 text-ink-black/70 hover:text-accent-orange transition-colors group">
                                <span className="p-3 bg-muted-ivory border border-black/5 group-hover:bg-[#FCF6F0] transition-colors text-accent-orange">
                                    <Phone size={16} />
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase text-ink-black/40 font-bold tracking-wider">Curator Phone</span>
                                    <span className="font-medium mt-0.5">+91 99999 99999 [PLACEHOLDER]</span>
                                </div>
                            </a>
                            <div className="flex items-center gap-4 text-ink-black/70 group">
                                <span className="p-3 bg-muted-ivory border border-black/5 text-accent-orange">
                                    <MapPin size={16} />
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase text-ink-black/40 font-bold tracking-wider">Design Studio</span>
                                    <span className="font-medium mt-0.5">Kochi Fort, Kerala, India [PLACEHOLDER]</span>
                                </div>
                            </div>
                        </div>

                        {/* Custom Commission Box */}
                        <div className="bg-accent-teal p-6 mt-4 border border-black/5 text-primary-bg flex flex-col gap-4 relative overflow-hidden shadow-lg select-none">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-bg/5 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
                            <h4 className="font-serif text-xl font-light leading-snug">
                                Commission a Custom Canvas
                            </h4>
                            <p className="text-xs text-primary-bg/75 leading-relaxed font-light">
                                Have a specific dimension or Indian motif in mind? Collaborate directly
                                with our master artists to co-create a bespoke handmade masterpiece suited for your room.
                            </p>
                            <a
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-primary-bg hover:text-accent-orange transition-colors self-start mt-2 border-b border-primary-bg/40 pb-1"
                            >
                                <MessageSquareHeart size={14} />
                                Consult via WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Form column (3/5 span) */}
                    <div className="lg:col-span-3 bg-muted-ivory p-8 md:p-10 border border-[#EEE6DE] shadow-xl">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">

                            {/* Type Category */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-ink-black/40">Inquiry Type</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                                    {['General Inquiry', 'Purchase Artwork', 'Art Commission'].map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className={`px-3 py-2 text-xs border tracking-wide font-medium transition-all ${formData.type === t
                                                    ? 'bg-ink-black text-primary-bg border-ink-black'
                                                    : 'bg-primary-bg text-ink-black/60 border-[#ECE4DC] hover:bg-[#FAF6F2]'
                                                } cursor-pointer`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name input */}
                            <div className="flex flex-col gap-1.5 focus-within:text-accent-orange transition-colors">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-ink-black/50">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Arundhati Roy"
                                    className="bg-primary-bg border border-[#ECE4DC] focus:border-accent-orange focus:outline-none px-4 py-3 text-sm text-ink-black placeholder-ink-black/25 flex-grow"
                                    required
                                />
                            </div>

                            {/* Email input */}
                            <div className="flex flex-col gap-1.5 focus-within:text-accent-orange transition-colors">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-ink-black/50">Your Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. arundhati@writer.com"
                                    className="bg-primary-bg border border-[#ECE4DC] focus:border-accent-orange focus:outline-none px-4 py-3 text-sm text-ink-black placeholder-ink-black/25 flex-grow"
                                    required
                                />
                            </div>

                            {/* Message text area */}
                            <div className="flex flex-col gap-1.5 focus-within:text-accent-orange transition-colors">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-ink-black/50">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell us about the canvas sizes or categories you want to enquire..."
                                    className="bg-primary-bg border border-[#ECE4DC] focus:border-accent-orange focus:outline-none px-4 py-3 text-sm text-ink-black placeholder-ink-black/25 flex-grow resize-none"
                                    required
                                />
                            </div>

                            {/* Form submit */}
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="group flex items-center justify-center gap-3 px-8 py-4 bg-accent-orange text-white text-xs uppercase tracking-widest font-extrabold rounded-none border border-accent-orange hover:bg-ink-black hover:border-ink-black transition-all duration-300 shadow-md cursor-pointer mt-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full block" />
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                                        Submit Curator Inquiry
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 bg-[#E2F0EA] border border-[#BCDECF] text-accent-teal text-xs font-sans font-medium"
                                    >
                                        Successfully submitted. Thank you! Our curatorial assistant will reach you back shortly.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
}
