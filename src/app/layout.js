import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import StoreShell from "@/components/StoreShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "BloomCraft | Custom Handmade Gifts & Live 3D Preview",
  description:
    "Create and customize your own floral hoodies, resin keychains, custom phone cases, and pressed flower frames with real-time pricing and live previews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AuthProvider>
          <CartProvider>
            <StoreShell>{children}</StoreShell>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
