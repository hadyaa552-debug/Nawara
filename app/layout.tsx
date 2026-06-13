import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "بارك سايت العاصمة الإدارية — الكازار | Park Sight New Capital Il Cazar",
  description:
    "بارك سايت الكازار في العاصمة الإدارية الجديدة — Park Sight Ilcazar. ١٤٠ فدان، الحي R4، إطلالة النهر الأخضر. شقق وتاون هاوس وبنتهاوس من ٤.٢ مليون. ١٠٪ مقدم وتقسيط حتى ١٠ سنوات.",
  keywords:
    "بارك سايت,بارك سايت العاصمة,بارك سايت الكازار,Park Sight,Park Sight New Capital,Ilcazar,Il Cazar,الكازار,العاصمة الإدارية الجديدة,R4,بارك سايت الكازار للتطوير العقاري",
  openGraph: {
    title: "بارك سايت — الكازار | Park Sight Ilcazar العاصمة الإدارية",
    description:
      "بارك سايت الكازار: مجتمع سكني على ١٤٠ فدان في R4 العاصمة الإدارية. إطلالة النهر الأخضر، ٤٠+ فدان خضرة، تسليم ٤ سنوات.",
    locale: "ar_EG",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        {/* ── Google Ads Tag ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18214662091" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18214662091');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
