import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ToastProvider } from "@/components/ui/Toast";
import NetworkStatus, { InstallPrompt } from "@/components/ui/NetworkStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Columns Coffee + Kitchen",
  description: "Order your favorites for pickup or delivery from our kitchen to yours.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Columns Coffee",
  },
};

export const viewport: Viewport = {
  themeColor: "#5C8D4D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <NetworkStatus />
          <Header />
          <main>{children}</main>
          <InstallPrompt />
        </ToastProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('SW registered:', reg.scope))
                    .catch(err => console.log('SW registration failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
