

// app/studio/layout.tsx

import { Metadata } from "next";
import "../globals.css"; 

export const metadata: Metadata = {
  title: "E-mart",
  description: "E-mart for online shopping",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     
      <div className="antialiased">{children}</div>
  );
}


