import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "EmotionAI - AI-Powered Emotion Detection",
  description: "Detect human emotions in real-time using advanced AI technology. Webcam detection, image analysis, and analytics dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Header />
          <div className="pt-[56px]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
