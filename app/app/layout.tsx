import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import PageTracker from "@/components/layout/PageTracker";

export const metadata: Metadata = {
  title: "LettreMagique — Votre courrier administratif rédigé en 2 minutes",
  description:
    "Résiliation, réclamation, mise en demeure, contestation — générez un courrier personnalisé et professionnel en 2 minutes grâce à l'IA. Export PDF immédiat.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18033703584"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18033703584');` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        {/* Cookie banner */}
        <link rel="stylesheet" href="/silktide-consent-manager.css" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <ScrollReveal />
        <PageTracker />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Cookie banner script */}
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  var s = document.createElement('script');
  s.src = '/silktide-consent-manager.js';
  s.onload = function() {
    silktideCookieBannerManager.updateCookieBannerConfig({
  background: { showBackground: true },
  cookieIcon: { position: "bottomLeft" },
  cookieTypes: [
    {
      id: "necessary",
      name: "Nécessaires",
      description: "<p>Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>",
      required: true,
      onAccept: function() {}
    },
    {
      id: "analytics",
      name: "Analytiques",
      description: "<p>Ces cookies nous aident à améliorer le site en mesurant les pages les plus visitées et les parcours des utilisateurs.</p>",
      defaultValue: true,
      onAccept: function() {
        gtag('consent', 'update', { analytics_storage: 'granted' });
        dataLayer.push({ event: 'consent_accepted_analytics' });
      },
      onReject: function() {
        gtag('consent', 'update', { analytics_storage: 'denied' });
      }
    },
    {
      id: "advertising",
      name: "Publicitaires",
      description: "<p>Ces cookies permettent d'afficher des publicités personnalisées en fonction de votre navigation.</p>",
      onAccept: function() {
        gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
        dataLayer.push({ event: 'consent_accepted_advertising' });
      },
      onReject: function() {
        gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      }
    }
  ],
  text: {
    banner: {
      description: "<p>Nous utilisons des cookies pour améliorer votre expérience, personnaliser le contenu et analyser notre trafic. <a href=\\"/politique-cookies\\" target=\\"_blank\\">Politique de cookies.</a></p>",
      acceptAllButtonText: "Tout accepter",
      acceptAllButtonAccessibleLabel: "Accepter tous les cookies",
      rejectNonEssentialButtonText: "Refuser les non-essentiels",
      rejectNonEssentialButtonAccessibleLabel: "Refuser les cookies non-essentiels",
      preferencesButtonText: "Préférences",
      preferencesButtonAccessibleLabel: "Gérer mes préférences"
    },
    preferences: {
      title: "Personnalisez vos préférences",
      description: "<p>Nous respectons votre vie privée. Vous pouvez choisir de ne pas autoriser certains types de cookies. Vos préférences s'appliquent sur l'ensemble du site.</p>",
      creditLinkText: "Obtenir cette bannière gratuitement",
      creditLinkAccessibleLabel: "Obtenir cette bannière gratuitement"
    }
  },
  position: { banner: "bottomLeft" }
});
  };
  document.body.appendChild(s);
})();
        ` }} />
      </body>
    </html>
  );
}
