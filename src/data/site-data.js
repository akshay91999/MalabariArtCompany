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



const ARTIST_POOL = [
    "Aswanth",
    "Amal"
];

export const CATEGORIES = [
    "Canvas paintings",
    "Portraits drawings",
    "Wall art paintings",
    "Wall art sculpture"
];

// Helper to format filenames to human-readable titles
const cleanArtName = (filename) => {
    let title = filename.replace(/\.[^/.]+$/, ""); // strip extension
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

    title = title.split(" ").map(word => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
    
    return title;
};

const generateDescription = (title, category) => {
    const titleLower = title.toLowerCase();
    
    let subjectIntro = "";
    if (titleLower.includes("buddha")) {
        subjectIntro = "A serene representation of Lord Buddha, evoking a sense of deep meditation, inner peace, and spiritual tranquility. The artistic rendering highlights subtle contours and a calm expression.";
    } else if (titleLower.includes("ganesh") || titleLower.includes("ganesha")) {
        subjectIntro = "A magnificent depiction of Lord Ganesha, the remover of obstacles. This artwork captures the divine grace, wisdom, and auspicious energy through intricate details and expressive styling.";
    } else if (titleLower.includes("adiyogi")) {
        subjectIntro = "An awe-inspiring portrayal of Adiyogi, the first yogi and source of yoga. Capturing the intense focus, cosmic presence, and spiritual depth of Shiva in profound artistic detail.";
    } else if (titleLower.includes("krishna") || titleLower.includes("radha")) {
        subjectIntro = "A beautiful and devotion-filled rendering of Lord Krishna and Radha. Capturing the eternal divine love, innocence, and playful grace through soft, elegant forms and rich aesthetic layers.";
    } else if (titleLower.includes("theyyam") || titleLower.includes("kathakali") || titleLower.includes("mural")) {
        subjectIntro = "Inspired by the rich cultural folklore and traditional performance arts of Kerala. This piece brings alive the vibrant colors, dramatic expressions, and spiritual energy of the sacred heritage.";
    } else if (titleLower.includes("mandala")) {
        subjectIntro = "A stunning mandala artwork featuring intricate geometric patterns and symmetry. It represents cosmic harmony, focus, and a meditative state of mind.";
    } else if (titleLower.includes("moon")) {
        subjectIntro = "A luminous exploration of the moon's celestial glow, blending cosmic aesthetics with texture to create a dreamy, meditative atmosphere.";
    } else if (titleLower.includes("sky")) {
        subjectIntro = "An expressive sky landscape capturing the beauty of natural light, transitions of color, and open horizons.";
    } else if (titleLower.includes("garden")) {
        subjectIntro = "A lively and colorful depiction of nature, filled with botanical patterns and vibrant life, perfect for bringing a refreshing organic feel to any space.";
    } else if (titleLower.includes("football")) {
        subjectIntro = "A dynamic, energetic mural celebrating the spirit of sports and movement, designed to inspire focus and athletic passion.";
    } else if (titleLower.includes("boxing")) {
        subjectIntro = "A powerful representation of strength, athletic intensity, and determination, captured in bold, high-contrast strokes.";
    } else if (titleLower.includes("business")) {
        subjectIntro = "A modern conceptual art piece reflecting structure, strategy, and collaborative growth, ideal for corporate or study environments.";
    } else if (titleLower.includes("vijay")) {
        subjectIntro = "A custom fan art portrait celebrating a legendary figure with dynamic, bold styling and dramatic presentation.";
    } else if (titleLower.includes("pencil") || titleLower.includes("sketch") || titleLower.includes("drawing")) {
        subjectIntro = "A meticulously detailed sketch focusing on light, shadow, and fine line work. It displays the artist's precision and capture of texture.";
    } else if (titleLower.includes("portrait") || titleLower.includes("family") || titleLower.includes("couple") || titleLower.includes("color pencil")) {
        subjectIntro = "A custom hand-drawn portrait capturing a timeless moment. The focus is on realistic features, warmth, and expressive emotion, showing master craftsmanship.";
    } else {
        subjectIntro = `A unique artistic creation titled "${title}", demonstrating a synthesis of traditional Indian aesthetic values with contemporary execution.`;
    }

    let categoryDetail = "";
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("canvas")) {
        categoryDetail = "This hand-painted canvas work combines organic textures with a modern color palette, crafted meticulously to create a lasting presence in any gallery or living space.";
    } else if (categoryLower.includes("portrait") || categoryLower.includes("drawing")) {
        categoryDetail = "This fine-art drawing showcases classical drafting skills and delicate rendering of form, light, and texture on archival medium.";
    } else if (categoryLower.includes("sculpture")) {
        categoryDetail = "As a three-dimensional relief sculpture, it establishes visual depth and a dynamic play of light and shadow, adding texture and architectural interest to walls.";
    } else if (categoryLower.includes("paintings") && categoryLower.includes("wall")) {
        categoryDetail = "An expressive large-scale wall painting designed to transform interior or exterior walls, bringing scale, narrative depth, and vibrant color into structural designs.";
    } else {
        categoryDetail = "Crafted with custom detail and original vision, this artwork represents authentic craftsmanship designed to elevate the surrounding environment.";
    }

    return `${subjectIntro} ${categoryDetail}`;
};

// Generate consistent metadata for any available images
export const allArtworks = assetsData.images.map((imageObj, index) => {
    const path = imageObj.src;
    const hash = hashCode(path);

    const title = cleanArtName(imageObj.name);
    const artist = ARTIST_POOL[hash % ARTIST_POOL.length];

    // Leverage folder-reorganized category from scan-assets.js
    const category = imageObj.category || "Canvas paintings";

    const price = 0;
    const size = `${30 + (hash % 5) * 10} x ${30 + (hash % 4) * 15} inches`;

    // Choose appropriate medium dynamically based on category naming
    let medium = "";
    if (category === "Canvas paintings") {
        medium = title.toLowerCase().includes("acrylic") ? "Acrylic on Canvas" : (title.toLowerCase().includes("oil") ? "Oil on Canvas" : "Acrylic on Canvas");
    } else if (category === "Portraits drawings") {
        medium = title.toLowerCase().includes("color") ? "Color Pencil on Archival Paper" : "Graphite Pencil & Charcoal on Archival Paper";
    } else if (category === "Wall art paintings") {
        medium = "Acrylic & Pigments Wall Mural";
    } else if (category === "Wall art sculpture") {
        medium = "Clay & Mixed Media 3D Relief";
    } else {
        medium = "Mixed Media";
    }

    const year = 2024 - (hash % 3);

    return {
        id: `art-${index}`,
        src: path,
        title,
        artist,
        category,
        price,
        formattedPrice: "",
        size,
        medium,
        year,
        featured: hash % 6 === 0, // Approx ~16% of artworks will be featured
        story: generateDescription(title, category)
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
        "Malabari Art Company was born from a desire to celebrate the visual textures and stories of the Indian subcontinent through a contemporary lens. Based on the historic Malabar coast, our founders capture the vibrant light, cultural rhythms, and profound philosophies of Indian art, adapting them for modern gallery spaces and homes worldwide.",
        "Founded by Aswanth and Amal, two passionate visual artists and native painters, we specialize in high-quality original oils, acrylics, and mixed-media works. Each canvas is a dialogue between India’s ancient heritage—its mythology, its geography, its colors—and the minimalist design aesthetic of today.",
        "We believe art is not merely decoration; it is a presence. A window into another perspective, a vessel of calm, or a burst of pure energy. Every single brushstroke is handcrafted by us in our studio, guaranteeing the absolute authenticity and raw visual power of every piece."
    ],
    stats: [
        { value: 500, label: "Artworks Sold", suffix: "+" },
        { value: 2, label: "Founding Artists", suffix: "" },
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
