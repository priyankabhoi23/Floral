"use client";

import React from "react";
import Link from "next/link";
import { Heart, Sparkles, UserCheck, Sprout, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div style={{ padding: "40px 0 80px 0" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "56px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            The Story of BloomCraft
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "700", fontFamily: "var(--font-serif)" }}>Handcrafted Eternal Art</h1>
          <p style={{ color: "var(--text-medium)", fontSize: "1.05rem", maxWidth: "600px", lineHeight: "1.6" }}>
            Preserving nature's fleeting beauty in cozy everyday wear and crystal clear resin keepsakes, designed by you.
          </p>
          <div style={{ width: "80px", height: "3px", backgroundColor: "var(--primary)", borderRadius: "2px", marginTop: "8px" }}></div>
        </div>

        {/* Narrative Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px", lineHeight: "1.75", color: "var(--text-medium)", fontSize: "1.02rem" }}>
          <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px", alignItems: "center" }} className="about-grid">
            <div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--text-dark)", marginBottom: "16px", fontFamily: "var(--font-serif)" }}>
                Our Beginning
              </h2>
              <p style={{ marginBottom: "16px" }}>
                BloomCraft started in a cozy attic workshop with a simple idea: <strong>Why should beautiful flower gifts fade away in a week?</strong> We wanted to combine the comfort of custom crocheted textiles with the preservation qualities of crystal clear organic resins.
              </p>
              <p>
                By building a bridge between natural botanical arts and personalized technology, we developed an interactive customizer that empowers you to design custom keepsakes, previewing them in real-time before they are carefully handcrafted.
              </p>
            </div>
            <div style={{ height: "300px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=800&auto=format&fit=crop"
                alt="Workspace desk with dried flowers and resin tools"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </section>

          {/* Our Process steps */}
          <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "48px", marginTop: "16px" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--text-dark)", marginBottom: "28px", textAlign: "center", fontFamily: "var(--font-serif)" }}>
              The Crafting Process
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>1</div>
                  <div style={{ flex: 1, width: "2px", backgroundColor: "var(--border-color)", margin: "8px 0" }}></div>
                </div>
                <div style={{ paddingBottom: "16px" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Botanical Harvesting & Pressing</h3>
                  <p style={{ fontSize: "0.95rem" }}>We harvest fresh, wild daisies, baby's breath, and lavender. Each petal is individually flattened and dried in custom wooden flower presses for 14-21 days to seal in natural hues.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>2</div>
                  <div style={{ flex: 1, width: "2px", backgroundColor: "var(--border-color)", margin: "8px 0" }}></div>
                </div>
                <div style={{ paddingBottom: "16px" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Precision Stitching & Pouring</h3>
                  <p style={{ fontSize: "0.95rem" }}>For hoodies and bouquets, yarn is hand-woven by local crochet artisans. For keychains and frames, flowers are laid out and locked in layers of low-odor, UV-stabilized resin blocks that prevent yellowing.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>3</div>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Curing & Gift Wrap</h3>
                  <p style={{ fontSize: "0.95rem" }}>Each piece cures for 48 hours, is hand-sanded to a glassy finish, packaged in custom cardboard box wraps with an artisan card, and shipped out to you.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "48px", marginTop: "16px" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--text-dark)", marginBottom: "32px", textAlign: "center", fontFamily: "var(--font-serif)" }}>
              Our Values
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
              <div style={{ textAlign: "center", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <Heart style={{ width: "32px", height: "32px", color: "var(--primary)" }} />
                <h4 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-dark)" }}>Made with Care</h4>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>No rush, no compromises. We inspect every flower petal and stitch before it leaves our table.</p>
              </div>

              <div style={{ textAlign: "center", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <Sprout style={{ width: "32px", height: "32px", color: "var(--primary)" }} />
                <h4 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-dark)" }}>Sustainable Sourcing</h4>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>Our wood bases are reclaimed timber, resin is plant-derived, and cardboard wrappers are 100% recyclable.</p>
              </div>

              <div style={{ textAlign: "center", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <UserCheck style={{ width: "32px", height: "32px", color: "var(--primary)" }} />
                <h4 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-dark)" }}>Supporting Artisans</h4>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>We pay fair wages to local home-knitters and botanical experts who construct our bases.</p>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section
            style={{
              backgroundColor: "var(--bg-secondary)",
              padding: "40px",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              marginTop: "24px",
              border: "1px solid var(--border-color)"
            }}
          >
            <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-dark)", fontFamily: "var(--font-serif)" }}>
              Ready to Design Your Keepsake?
            </h2>
            <p style={{ fontSize: "0.95rem", maxWidth: "500px" }}>
              Head over to our Customizer Studio to choose your product and customize it live.
            </p>
            <Link href="/designer" className="btn-primary" style={{ marginTop: "8px" }}>
              Start Customizer <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
          </section>
        </div>

      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </div>
  );
}
