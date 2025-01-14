import React from "react";
import MainHeader from "@/components/main-header/main-header";

export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="page">
      <MainHeader />
      {children}
    </div>
  );
}
