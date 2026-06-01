export const products = [
  {
    id: "floral-hoodie",
    name: "Floral Hoodie",
    slug: "floral-hoodie",
    basePrice: 999,
    description: "Cozy pipe cleaner floral hoodies, hand-stitched with premium soft yarn and customized floral decorations.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop", // placeholder, can replace with generated
    trending: false,
    categories: ["apparel", "handmade"],
    options: {
      colors: [
        { name: "Soft Cream", value: "#FFFBF2", price: 0 },
        { name: "Blossom Pink", value: "#FADADD", price: 0 },
        { name: "Soft Lilac", value: "#E6E6FA", price: 50 },
        { name: "Sage Green", value: "#E0EDE4", price: 50 }
      ],
      sizes: [
        { name: "S", price: 0 },
        { name: "M", price: 0 },
        { name: "L", price: 0 },
        { name: "XL", price: 100 }
      ],
      customText: {
        enabled: true,
        maxLength: 15,
        basePrice: 150,
        fonts: ["Script", "Modern", "Classic Serif"]
      },
      addOns: [
        { id: "premium-floral", name: "Premium Floral Embroidery", price: 300, checkedByDefault: true },
        { id: "gold-flakes", name: "Gold Leaf Accenting", price: 150, checkedByDefault: false }
      ]
    }
  },
  {
    id: "resin-keychain",
    name: "Resin Keychain",
    slug: "resin-keychain",
    basePrice: 399,
    description: "Alphabet and shaped resin keychains filled with real pressed flowers, gold flakes, and personalized name lettering.",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop",
    trending: true,
    categories: ["resin", "accessories"],
    options: {
      shapes: [
        { name: "Initial Letter (A-Z)", price: 0 },
        { name: "Heart Shape", price: 50 },
        { name: "Hexagon Shape", price: 50 }
      ],
      colors: [
        { name: "Crystal Clear", value: "rgba(255, 255, 255, 0.2)", price: 0 },
        { name: "Soft Blush", value: "rgba(250, 218, 221, 0.6)", price: 0 },
        { name: "Ocean Breeze", value: "rgba(173, 216, 230, 0.6)", price: 30 }
      ],
      customText: {
        enabled: true,
        maxLength: 10,
        basePrice: 50,
        fonts: ["Elegant Cursive", "Minimalist Block"]
      },
      addOns: [
        { id: "gold-flakes", name: "Genuine Gold Flakes", price: 50, checkedByDefault: true },
        { id: "mini-daisy", name: "Premium Mini Daisies", price: 100, checkedByDefault: false },
        { id: "pearl-dust", name: "Pearl Shimmer Dust", price: 40, checkedByDefault: false }
      ]
    }
  },
  {
    id: "phone-case",
    name: "Pressed Flower Phone Case",
    slug: "phone-case",
    basePrice: 599,
    description: "Clear shockproof phone case embellished with beautifully arranged real dried flowers and finished with protective clear resin.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
    trending: false,
    categories: ["resin", "tech-accessories"],
    options: {
      models: [
        { name: "iPhone 13 / 13 Pro", price: 0 },
        { name: "iPhone 14 / 14 Pro", price: 0 },
        { name: "iPhone 15 / 15 Pro", price: 50 },
        { name: "Galaxy S23 / S23 Ultra", price: 50 },
        { name: "Galaxy S24 / S24 Ultra", price: 100 }
      ],
      flowers: [
        { name: "Mixed Pastel Florals", price: 0 },
        { name: "Lavender Fields", price: 80 },
        { name: "Crimson Red Roses", price: 100 }
      ],
      customText: {
        enabled: true,
        maxLength: 12,
        basePrice: 100,
        fonts: ["Gold Script", "Silver Modern"]
      },
      addOns: [
        { id: "gold-flakes", name: "Scattered Gold Leaf", price: 60, checkedByDefault: true },
        { id: "glitter-dust", name: "Fine Holographic Glitter", price: 40, checkedByDefault: false }
      ]
    }
  },
  {
    id: "resin-frame",
    name: "Pressed Flower Resin Frame",
    slug: "resin-frame",
    basePrice: 1199,
    description: "A gorgeous tabletop crystal resin plaque preserving custom flower arrangements and a personalized text quote.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    trending: false,
    categories: ["home-decor", "resin"],
    options: {
      sizes: [
        { name: "Mini Plaque (4x6 inch)", price: 0 },
        { name: "Classic Plaque (5x7 inch)", price: 200 },
        { name: "Grand Plaque (8x10 inch)", price: 500 }
      ],
      backgrounds: [
        { name: "Completely Translucent", value: "rgba(255,255,255,0.1)", price: 0 },
        { name: "Solid Milk White", value: "#FFFFFF", price: 50 },
        { name: "Soft Blush Cream", value: "#FFF5F0", price: 50 }
      ],
      customText: {
        enabled: true,
        maxLength: 50,
        basePrice: 150,
        fonts: ["Elegant Script", "Classic Serif", "Modernist Sans"]
      },
      addOns: [
        { id: "premium-roses", name: "Premium Miniature Roses", price: 300, checkedByDefault: true },
        { id: "gold-border", name: "Metallic Gold Painted Border", price: 200, checkedByDefault: false }
      ]
    }
  },
  {
    id: "bouquets",
    name: "Handmade Yarn Bouquet",
    slug: "bouquets",
    basePrice: 799,
    description: "Beautifully wrapped bouquet of eternal pipe cleaner flowers (tulips, daisies, lavender) that never fade.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    trending: false,
    categories: ["apparel", "handmade"],
    options: {
      sizes: [
        { name: "Standard (5 Blooms)", price: 0 },
        { name: "Deluxe (9 Blooms)", price: 400 },
        { name: "Grand Royal (15 Blooms)", price: 900 }
      ],
      palettes: [
        { name: "Spring Tulip Melody (Pink & Yellow)", price: 0 },
        { name: "Lavender Dream (Purple & White)", price: 50 },
        { name: "Sunflower Radiance (Yellow & Sage)", price: 50 }
      ],
      customText: {
        enabled: true,
        maxLength: 25,
        basePrice: 80, // For tag
        fonts: ["Handwritten Tag"]
      },
      addOns: [
        { id: "led-fairy-lights", name: "Interwoven LED Fairy Lights", price: 150, checkedByDefault: true },
        { id: "gift-card", name: "Personalized Handwritten Card", price: 50, checkedByDefault: false }
      ]
    }
  }
];
