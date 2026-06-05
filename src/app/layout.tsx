import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ka Wai Man Road — Flat Floor Plan Viewer & 3D Modeler",
  description:
    "Interactive 2D/3D floor plan viewer for HK Housing Authority standard flats. Place custom furniture blocks into rooms.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
