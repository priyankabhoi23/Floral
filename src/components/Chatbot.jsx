"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Flower } from "lucide-react";

// ─── Deep Knowledge Base built from real product & craft data ─────────────────
const KB = {
  greet: [
    "Hi there! 🌸 I'm Bloom, BloomCraft's handcraft assistant. Whether you need help choosing a gift, understanding our materials, or jumping into the customizer — I've got you covered!",
    "Hey! Welcome to BloomCraft 🌿 I'm Bloom, your personal craft guide. Ask me anything about our handmade pieces, resin art, floral hoodies, or how we make them!",
  ],

  products: {
    hoodie: `🧥 *Floral Hoodie* — Starting at ₹999
Our bestselling handmade hoodie! Each piece features:
• Real pipe cleaner flowers hand-bent and stitched by our artisans
• Premium soft 300 GSM cotton fleece base
• Available in Soft Cream, Blossom Pink, Soft Lilac & Sage Green
• Sizes: S, M, L (XL +₹100)
• Add a custom name/word embroidered in Script, Modern, or Classic Serif font (+₹150)
• Optional: Premium Floral Embroidery upgrade (+₹300) or Gold Leaf Accenting (+₹150)

Each hoodie takes ~2–3 days to handcraft. No two pieces are exactly alike. 🌸`,

    keychain: `🔑 *Resin Keychain* — Starting at ₹399
Our most trending item! Handpoured UV-stable resin with real botanicals:
• Shape: Initial Letter A–Z, Heart, or Hexagon
• Resin tints: Crystal Clear, Soft Blush, or Ocean Breeze (+₹30)
• Genuine gold flakes included by default (+₹50 value, free!)
• Add-ons: Premium Mini Daisies (+₹100), Pearl Shimmer Dust (+₹40)
• Custom name or word engraved in Elegant Cursive or Minimalist Block (+₹50)

Each keychain is hand-poured in small batches and UV-cured for maximum clarity. ✨`,

    phonecase: `📱 *Pressed Flower Phone Case* — Starting at ₹599
A real botanical art piece for your phone:
• Shockproof polycarbonate clear shell base
• Real dried & pressed flowers arranged by hand
• Available for iPhone 13/14/15 Pro and Galaxy S23/S24 Ultra (+₹50–100)
• Flower themes: Mixed Pastel Florals, Lavender Fields (+₹80), Crimson Red Roses (+₹100)
• Custom text in Gold Script or Silver Modern font (+₹100)
• Optional: Scattered Gold Leaf (+₹60), Holographic Glitter (+₹40)

The flowers are sealed under optically clear resin — waterproof & durable. 🌷`,

    frame: `🖼️ *Pressed Flower Resin Frame* — Starting at ₹1,199
A handcrafted tabletop treasure for the home:
• Crystal-clear UV-stable resin plaque format
• Sizes: Mini 4×6" / Classic 5×7" (+₹200) / Grand 8×10" (+₹500)
• Background: Translucent, Solid Milk White (+₹50), or Soft Blush Cream (+₹50)
• Personalized quote up to 50 characters (+₹150) in Elegant Script, Classic Serif, or Modernist Sans
• Add Premium Miniature Roses (+₹300) or Metallic Gold Painted Border (+₹200)

Perfect for anniversaries, weddings, or as a memorial keepsake. 💐`,

    bouquet: `💐 *Handmade Yarn Bouquet* — Starting at ₹799
Everlasting bouquets that never wither or wilt:
• Pipe cleaner tulips, daisies, lavender & baby's breath — fully handmade
• Sizes: Standard 5 Blooms / Deluxe 9 Blooms (+₹400) / Grand Royal 15 Blooms (+₹900)
• Colour palettes: Spring Tulip Melody, Lavender Dream (+₹50), Sunflower Radiance (+₹50)
• Wrapped in handfolded craft paper with a raffia bow
• Optional: Interwoven LED Fairy Lights (+₹150), Personalized Handwritten Card (+₹50)

These bouquets last forever — no water, no sunlight needed. 🌿`,
  },

  materials: `🧪 *What Materials Do We Use?*

**Pipe Cleaner Flowers (Chenille Wire):**
Soft, premium chenille-coated aluminium wire, bent and shaped petal-by-petal by hand. The wire holds shape permanently and feels plush to the touch.

**Resin (UV & Epoxy):**
We use high-clarity, UV-resistant epoxy resin with zero yellowing. It's non-toxic once cured, waterproof, and lasts decades. Our keychains and phone cases use polished dome-top molds.

**Real Dried Flowers:**
We source and press real botanicals — baby's breath, daisies, lavender, and roses — and dry them in silica gel to preserve colour and shape.

**Gold Flakes:**
Genuine metallic foil gold flakes, not imitation. They catch light beautifully inside resin.

**Fabrics:**
Our hoodies use 300 GSM cotton-polyester fleece — thick, warm, and durable. Pre-washed for softness.`,

  process: `🎨 *Our Handmade Process*

1. **You Design** — Use our live customizer to pick colors, text, add-ons, and see your item render in real-time.

2. **We Handcraft** — Our artisans receive your order and begin:
   • Hoodies: wire-bending flowers, stitching, text embroidery (2–3 days)
   • Resin items: mold prep, botanical placement, hand-pouring, UV-curing, sanding & polishing (3–4 days)
   • Bouquets: flower forming, wrapping, lighting & card (1–2 days)

3. **Quality Check** — Every piece is inspected before packing.

4. **Packed & Shipped** — Gift-boxed with tissue paper and a handwritten note.

We don't mass-produce. Every order is made fresh, just for you.`,

  pricing: `💰 *Our Pricing Breakdown*

| Product | Base Price |
|---|---|
| Floral Hoodie | ₹999 |
| Resin Keychain | ₹399 |
| Pressed Flower Phone Case | ₹599 |
| Resin Frame | ₹1,199 |
| Yarn Bouquet | ₹799 |

Common add-on costs:
• Custom name/text: ₹50–₹150 depending on product
• Premium floral upgrade: ₹300
• Gold leaf flakes: ₹50–₹60
• LED fairy lights: ₹150
• Gift card: ₹50

Prices are fixed and transparent — no hidden charges. What you see in the customizer is the final price. ✅`,

  shipping: `📦 *Shipping & Delivery*

• **Crafting time:** 3–5 working days (all items are made to order)
• **Shipping time:** 3–5 additional working days across India
• **Carrier:** Delhivery / Bluedart / India Post depending on your pin code
• **Tracking:** You receive a tracking link on your WhatsApp/email once dispatched
• **Free shipping** on orders above ₹1,500!
• We currently ship **PAN-India** 🇮🇳. International shipping coming soon.

Need it urgently? Message us on Instagram @bloomcraft.in and we'll try our best! 🙏`,

  returns: `↩️ *Returns & Replacement Policy*

We want you to love your item. Here's how we handle issues:

✅ **Damaged in transit?** — Share a photo within 48 hours of delivery. We'll remake it at no cost.
✅ **Wrong item received?** — We'll send the correct one immediately.
✅ **Customization error on our end?** — Full remake, free of charge.

❌ **Not returnable:** Custom pieces cannot be returned if the details were entered correctly by you, since they're made specifically for you.

❌ **Colour variation:** Resin colours may vary slightly from screen due to lighting — minor differences are not considered defects.

To raise an issue: DM us on Instagram or email priyankabhoi23@gmail.com 📧`,

  care: `🧼 *Product Care Guide*

**🧥 Floral Hoodie:**
• Turn inside-out before washing
• Hand wash or gentle machine cycle in cold water (≤30°C)
• Do NOT tumble dry — pipe cleaner flowers may deform
• Air dry flat on a clean surface
• Do not wring or iron the flower areas directly
• Store folded — not hung — to maintain flower shape

**🔑 Resin Keychain:**
• Keep away from prolonged direct sunlight to prevent UV tinting
• Clean with a soft damp microfiber cloth — no abrasive cleaners
• Do not submerge in water for long periods
• If scratched lightly, use a tiny amount of car polish to buff it

**📱 Pressed Flower Phone Case:**
• The resin surface is waterproof — wipe clean with a dry cloth
• Avoid dropping on rough concrete — the shell can crack at the edges
• Do not put stickers directly on the floral side

**🖼️ Resin Frame:**
• Keep away from direct sunlight and heat sources
• Dust with a soft dry cloth
• Do not use chemical cleaners near the floral inserts

**💐 Yarn Bouquet:**
• No water, no sunlight needed — truly maintenance-free!
• Gently reshape any bent wire petals with your fingers
• Dust with a dry cloth or use a hairdryer on cool setting`,

  custom: `✏️ *How to Customise Your Order*

1. Visit our **Live Customizer** at /designer
2. Choose your base product (Hoodie, Keychain, Phone Case, Frame, or Bouquet)
3. Pick your colour, size, shape, or phone model
4. Add personal text (name, date, quote, or initials)
5. Select add-ons like gold flakes, fairy lights, or premium florals
6. See your price update in real-time ⚡
7. Add to cart and checkout!

You can also DM us on Instagram (@bloomcraft.in) for fully custom requests outside of the standard options — like a specific flower type, colour combo, or size.`,

  gift: `🎁 *Perfect Gift Ideas*

• **Birthday:** Resin Keychain with their initial + Personalized Hoodie
• **Anniversary:** Pressed Flower Frame with your date & quote + Yarn Bouquet
• **Valentine's Day:** Heart-shaped Keychain + Red Rose Phone Case
• **Graduation:** Floral Hoodie in their college colours (custom request)
• **Best Friend:** Matching keychains with each other's initials!
• **Wedding/Engagement:** Grand Royal Bouquet + Resin Frame as centrepiece

All items can be gift-boxed with a handwritten message card (+₹50). 🎀`,

  bulk: `📋 *Bulk & Corporate Orders*

We accept bulk orders for:
• Weddings & events (100+ bouquets or favours)
• Corporate gifting (branded keychains, custom frames)
• College fests and farewell gifts

For bulk orders:
• 10% discount on 10+ identical items
• 20% discount on 25+ items
• Custom branding available on resin pieces

Contact: priyankabhoi23@gmail.com | Instagram: @bloomcraft.in
We respond within 24 hours! 🙏`,

  contact: `📞 *Get in Touch with Us*

**Instagram:** @bloomcraft.in (fastest response, usually within 1–2 hours)
**Email:** priyankabhoi23@gmail.com
**Working hours:** Mon–Sat, 10am–8pm IST

For urgent orders, DM on Instagram is always fastest. We're a small team and we personally handle every query with care. 💛`,

  fallback: [
    "That's a great question! 🌸 I'm not 100% sure about that one — could you try rephrasing? Or tap one of the quick buttons below!",
    "Hmm, I might not have the answer for that yet! Try asking about our products, materials, care instructions, or shipping. 🌿",
  ],
};

// ─── Intent Matching ──────────────────────────────────────────────────────────
function getResponse(input) {
  const t = input.toLowerCase();

  if (/\b(hi|hello|hey|namaste|hii|helo)\b/.test(t))
    return KB.greet[Math.floor(Math.random() * KB.greet.length)];

  if (/hoodie|jacket|sweatshirt|sweater|floral wear|top/.test(t))
    return KB.products.hoodie;
  if (/keychain|key chain|initial|resin key|pendant/.test(t))
    return KB.products.keychain;
  if (/phone case|cover|mobile case|iphone|samsung|galaxy/.test(t))
    return KB.products.phonecase;
  if (/frame|plaque|resin frame|wall|tabletop|photo|display/.test(t))
    return KB.products.frame;
  if (/bouquet|flowers|bunch|floral|yarn|tulip|daisy|lavender/.test(t) && !/hoodie/.test(t))
    return KB.products.bouquet;

  if (/material|made of|wire|resin|fabric|chenille|pipe cleaner|epoxy|what is/.test(t))
    return KB.materials;
  if (/how.*made|process|handcraft|handmade|artisan|how.*work|craft/.test(t))
    return KB.process;
  if (/price|cost|how much|rate|pricing|charges|fees|rupee|₹/.test(t))
    return KB.pricing;
  if (/ship|deliver|track|dispatch|how long|days|arrive|reach/.test(t))
    return KB.shipping;
  if (/return|refund|replace|exchange|damage|wrong|issue|problem/.test(t))
    return KB.returns;
  if (/wash|clean|care|maintain|laundry|dry|store|dust|protect/.test(t))
    return KB.care;
  if (/custom|design|personaliz|name|text|inscript|engrav|create|own|configur/.test(t))
    return KB.custom;
  if (/gift|present|birthday|anniversary|valentine|wedding|graduation|friend/.test(t))
    return KB.gift;
  if (/bulk|wholesale|corporate|event|wedding order|large order|quantity/.test(t))
    return KB.bulk;
  if (/contact|email|instagram|phone number|reach|support|help|talk|agent/.test(t))
    return KB.contact;

  return KB.fallback[Math.floor(Math.random() * KB.fallback.length)];
}

// ─── Quick Reply Chips ─────────────────────────────────────────────────────────
const CHIPS = [
  { label: "🧥 Floral Hoodie", query: "tell me about the floral hoodie" },
  { label: "🔑 Resin Keychain", query: "tell me about the resin keychain" },
  { label: "📱 Phone Case", query: "tell me about the phone case" },
  { label: "💐 Bouquet", query: "tell me about the yarn bouquet" },
  { label: "🎨 How to Customise", query: "how to customise my order" },
  { label: "📦 Shipping Info", query: "how does shipping work" },
  { label: "🧼 Care Guide", query: "how to care for my product" },
  { label: "💰 Pricing", query: "what are your prices" },
  { label: "↩️ Returns Policy", query: "what is your return policy" },
  { label: "🎁 Gift Ideas", query: "I need a gift idea" },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 🌸 I'm Bloom — BloomCraft's handcraft assistant.\n\nI know everything about our handmade products, materials, pricing, shipping & care. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
    }
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasOpened]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate realistic typing delay based on response length
    const response = getResponse(text);
    const delay = Math.min(600 + response.length * 1.5, 2200);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: response,
          timestamp: new Date(),
        },
      ]);
    }, delay);
  };

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <button
        id="chatbot-trigger"
        onClick={() => setIsOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: isOpen
            ? "#1C1917"
            : "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "none",
          cursor: "pointer",
          zIndex: 9999,
          transition: "all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
          border: "none",
        }}
        title="Chat with Bloom"
        aria-label="Open BloomCraft chat assistant"
      >
        {isOpen ? (
          <X style={{ width: "22px", height: "22px" }} />
        ) : (
          <MessageCircle style={{ width: "26px", height: "26px" }} />
        )}
      </button>

      {/* ── Unread Badge Dot ── */}
      {!isOpen && !hasOpened && (
        <span
          style={{
            position: "fixed",
            bottom: "68px",
            right: "20px",
            width: "14px",
            height: "14px",
            backgroundColor: "#22C55E",
            borderRadius: "50%",
            border: "2px solid white",
            zIndex: 10000,
            animation: "pulseGreen 2s infinite",
          }}
        />
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          id="chatbot-window"
          style={{
            position: "fixed",
            bottom: "96px",
            right: "24px",
            width: "390px",
            maxWidth: "calc(100vw - 40px)",
            height: "580px",
            maxHeight: "calc(100vh - 120px)",
            borderRadius: "24px",
            backgroundColor: "#FEFEFE",
            border: "1px solid var(--border-color)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(214,123,136,0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            animation: "slideUpChat 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, var(--primary) 0%, #C26371 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                🌸
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.2, margin: 0 }}>
                  Bloom
                </p>
                <p style={{ fontSize: "0.72rem", margin: "3px 0 0 0", opacity: 0.85, display: "flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#4ADE80",
                      display: "inline-block",
                      animation: "pulseGreen 2s infinite",
                    }}
                  />
                  BloomCraft Assistant • Always here to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: "white", opacity: 0.8, background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              aria-label="Close chat"
            >
              <X style={{ width: "20px", height: "20px" }} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#FAFAF9",
            }}
            className="scrollbar-chat"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: "8px",
                }}
              >
                {msg.sender === "bot" && (
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--primary-light) 0%, #FDE8EC 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      flexShrink: 0,
                    }}
                  >
                    🌸
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "11px 15px",
                    borderRadius:
                      msg.sender === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, var(--primary) 0%, #C26371 100%)"
                        : "white",
                    color: msg.sender === "user" ? "white" : "var(--text-dark)",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    boxShadow:
                      msg.sender === "user"
                        ? "0 2px 8px rgba(214,123,136,0.25)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                    border: msg.sender === "bot" ? "1px solid var(--border-color)" : "none",
                    whiteSpace: "pre-line",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary-light) 0%, #FDE8EC 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  🌸
                </div>
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "white",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      className="dot-typing"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              backgroundColor: "white",
              flexShrink: 0,
            }}
            className="scrollbar-none"
          >
            {CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleSend(chip.query)}
                style={{
                  padding: "7px 13px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-primary)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--text-medium)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                className="chat-chip"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            style={{
              padding: "12px 14px",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "white",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about products, shipping, care..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                border: "1.5px solid var(--border-color)",
                borderRadius: "20px",
                padding: "10px 16px",
                fontSize: "0.88rem",
                outline: "none",
                boxShadow: "none",
                transition: "border-color 0.2s",
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-dark)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: inputValue.trim()
                  ? "linear-gradient(135deg, var(--primary) 0%, #C26371 100%)"
                  : "var(--border-color)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: inputValue.trim() ? "pointer" : "default",
                transition: "all 0.2s ease",
                border: "none",
                flexShrink: 0,
              }}
              aria-label="Send message"
            >
              <Send style={{ width: "15px", height: "15px" }} />
            </button>
          </form>

          {/* Footer note */}
          <div
            style={{
              padding: "6px 16px 10px",
              backgroundColor: "white",
              textAlign: "center",
              fontSize: "0.7rem",
              color: "var(--text-light)",
            }}
          >
            Powered by BloomCraft 🌸 • Handcrafted with love in India
          </div>
        </div>
      )}

      {/* ── Global Styles ── */}
      <style jsx global>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
          50% { box-shadow: 0 0 0 5px rgba(74, 222, 128, 0); }
        }

        .dot-typing {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--text-light);
          animation: dotBounce 1.4s infinite ease-in-out both;
        }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .chat-chip:hover {
          border-color: var(--primary) !important;
          color: var(--primary) !important;
          background-color: var(--primary-light) !important;
        }

        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

        .scrollbar-chat::-webkit-scrollbar { width: 4px; }
        .scrollbar-chat::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-chat::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
