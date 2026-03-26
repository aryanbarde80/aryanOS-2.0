import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

export const metadata = {
  title: "Aryan Barde | Systems & AI Engineer",
  description: "Portfolio of Aryan Barde - Full-Stack, IoT & AI Engineer building high-performance systems.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased relative">
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <CursorGlow>
          <div className="bg-orb animate-pulse-slow"></div>
          <div className="scanlines-overlay"></div>
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </CursorGlow>
      </body>
    </html>
  );
}
