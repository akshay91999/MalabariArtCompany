import assetsData from '../assets-list.json';

// Helper to generate stable hashes from strings, useful for stable pseudorandom layouts
const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

// Stable pool of authentic Indian art titles for the placeholders
const TITLE_POOL = [
    "Malabar Monsoon Echoes",
    "Benaras Ghat Symphony",
    "Thar Desert Whispers",
    "Deccan Charcoal Rhythms",
    "Ganga Arati Glow",
    "Kathakali Facial Study",
    "Western Ghats Mist",
    "Village Courtship Study",
    "The Sitar Raga",
    "Bazaar Chores",
    "Golden Hour at Hampi",
    "Dusk in Old Kochi",
    "The Lotus Pond",
    "Peacock in Shrinathji style",
    "Theyyam Dancer Energy",
    "Monsoon Raga III",
    "Narmada Stone Study",
    "The Rajasthani Bride",
    "Backwaters Reflection",
    "Himalayan Solitude",
    "Ganesha in Crimson",
    "The Loom Artisans",
    "Deccan Plateau Dusk",
    "Spice Merchant of Mattancherry",
    "Madras Cafe Shadows",
    "The Clay Potter",
    "Fishermen of Chavakkad",
    "Chola Bronze Reflection",
    "Mughal Garden Romance",
    "Kalaripayattu Focus",
    "Sundarbans Morning",
    "Shekhawati Fresco Fragment",
    "The Holi Colors",
    "Darjeeling Tea Trails",
    "Ajanta Cave Mural Study"
];

const ARTIST_POOL = [
    "Vasant Malabari [PLACEHOLDER]",
    "Ananya Menon [PLACEHOLDER]",
    "Rajesh Panicker [PLACEHOLDER]",
    "Kalyani Nair [PLACEHOLDER]",
    "Devanand K. [PLACEHOLDER]",
    "Deepa Subramaniam [PLACEHOLDER]"
];

export const CATEGORIES = [
    "Wall art",
    "Sculpture art",
    "3D Wall art",
    "Mural art",
    "Canvas painting",
    "Acrylic painting",
    "Oil painting",
    "Portraits",
    "Pencil",
    "Custom creation"
];

// Generate consistent metadata for any available images
export const allArtworks = assetsData.images.map((imageObj, index) => {
    const path = imageObj.src;
    const hash = hashCode(path);

    // Pick stable title/artist/price from hash
    const title = TITLE_POOL[hash % TITLE_POOL.length] + ` (Study #${(hash % 9) + 1})`;
    const artist = ARTIST_POOL[hash % ARTIST_POOL.length];

    // Leverage folder-reorganized category from scan-assets.js
    const category = imageObj.category || "Canvas painting";

    const price = 12000 + (hash % 17) * 4500; // Stable range from 12k to 88.5k INR
    const size = `${30 + (hash % 5) * 10} x ${30 + (hash % 4) * 15} inches`;

    // Choose appropriate medium based on category naming
    let medium = ["Oil on Canvas", "Acrylic on Canvas", "Charcoal on Handmade Paper", "Mixed Media on Canvas", "Watercolors on Paper"][hash % 5];
    if (category === "Acrylic painting") medium = "Acrylic on Canvas";
    else if (category === "Oil painting") medium = "Oil on Canvas";
    else if (category === "Pencil") medium = "Graphite Pencil on Archival Paper";
    else if (category === "3D Wall art") medium = "Clay & Mixed Media 3D relief";
    else if (category === "Sculpture art") medium = "Bronze and Terracotta sculpture";
    else if (category === "Mural art") medium = "Stucco & Pigments Mural";

    const year = 2024 - (hash % 3);

    return {
        id: `art-${index}`,
        src: path,
        title,
        artist,
        category,
        price,
        formattedPrice: `₹${price.toLocaleString('en-IN')}`,
        size,
        medium,
        year,
        featured: hash % 6 === 0, // Approx ~16% of artworks will be featured
        story: `Rooted in the organic visual language of South India, this piece represents a synthesis of traditional Indian aesthetic values with contemporary execution. [PLACEHOLDER - Edit this artwork biography]`
    };
});

// Separate out featured artworks for Curators picks
export const featuredArtworks = allArtworks.filter(art => art.featured).slice(0, 8);
// If not enough featured, fallback to first few
if (featuredArtworks.length < 4) {
    featuredArtworks.push(...allArtworks.slice(0, 8 - featuredArtworks.length));
}

// Brand details
export const brandStory = {
    headline: "Contemporary Canvas. Timeless Roots.",
    subheading: "Bridging India’s classical art heritage with modern sensibilities.",
    narrativeParagraphs: [
        "Malabari Art Company was born from a desire to celebrate the visual textures and stories of the Indian subcontinent through a contemporary lens. Based on the historic Malabar coast, our collective of artists captures the vibrant light, cultural rhythms, and profound philosophies of Indian art, adapting them for modern gallery spaces and homes worldwide.",
        "Founded by a group of passionate art curators and native painters, we specialize in high-quality original oils, acrylics, and mixed-media works. Each canvas is a dialogue between India’s ancient heritage—its mythology, its geography, its colors—and the minimalist design aesthetic of today. [PLACEHOLDER - Insert custom company history and narrative here]",
        "We believe art is not merely decoration; it is a presence. A window into another perspective, a vessel of calm, or a burst of pure energy. By working closely with master painters and emerging Indian talents, we guarantee the authenticity and narrative depth of every single brushstroke."
    ],
    stats: [
        { value: 500, label: "Artworks Sold", suffix: "+" },
        { value: 50, label: "Artists Collaborated", suffix: "+" },
        { value: 10, label: "Years of Heritage", suffix: "+" },
        { value: 100, label: "Authenticity Certified", suffix: "%" }
    ]
};

// Trust Badges content
export const trustBadges = [
    {
        id: "handcrafted",
        title: "100% Handmade Originals",
        description: "Every single stroke is painted by hand by original visual artists."
    },
    {
        id: "authenticity",
        title: "Certificate of Authenticity",
        description: "Signed and sealed certificates from the artist and the curator."
    },
    {
        id: "shipping",
        title: "Secure Pan-India Shipping",
        description: "Museum-grade transit packing with comprehensive insurance."
    },
    {
        id: "framing",
        title: "Bespoke Framing Options",
        description: "Custom framing with solid teakwood or charcoal floating frames."
    }
];

// Marquee items
export const marqueeHighlights = [
    "Original Contemporary Art",
    "Pan-India Secure Shipping",
    "Authenticity Certified",
    "Custom Art Commissions Available",
    "Original Handpainted Canvases Only",
    "Aesthetics Inspired by Indian Landscapes",
    "Rooted in Modern Indian Art Movements"
];
