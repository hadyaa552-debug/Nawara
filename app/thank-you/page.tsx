"use client";
import { useEffect } from "react";

const PHONE_INTL = "+201055978559";
const PHONE_DISPLAY = "0105 597 8559";
const WA_URL = `https://wa.me/201055978559?text=${encodeURIComponent("مرحباً، لسه سجلت استمارة في بارك سايت الكازار وعايز أعرف التفاصيل")}`;
const LOGO = "https://arro-consultancy.com/uploads/2026-06-08-143835-6a26a9bb6e8d2.png";

export default function ThankYou() {
  useEffect(() => {
    // ══════════════════════════════════════
    // Google Ads — Form Conversion Tracking
    // ══════════════════════════════════════
    const w = window as any;
    if (w.gtag) {
      w.gtag("event", "conversion", {
        send_to: "AW-17039137293/Ie3iCOmajL0cEI208rw_",
        value: 1.0,
        currency: "USD",
      });
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f1c14 0%, #172414 100%)",
      padding: "40px 24px", fontFamily: "'IBM Plex Sans Arabic', sans-serif", textAlign: "center"
    }}>
      <img src={LOGO} alt="Park Sight Il Cazar" style={{ height: 56, marginBottom: 24 }} />

      {/* Success Icon */}
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(45,122,82,.15)", border: "2px solid rgba(45,122,82,.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 40, marginBottom: 20,
      }}>✓</div>

      <h1 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 600,
        color: "#fff", marginBottom: 12, lineHeight: 1.2,
      }}>
        شكراً! تم استلام طلبك
      </h1>

      <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", maxWidth: 480, lineHeight: 1.7, marginBottom: 8 }}>
        فريق مبيعات <strong style={{ color: "#c4922a" }}>بارك سايت الكازار — Park Sight Ilcazar</strong> هيتواصل معاك في أقرب وقت.
        ممكن كمان تكلمنا على الواتساب للرد الأسرع.
      </p>

      <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginBottom: 32 }}>
        بارك سايت العاصمة الإدارية الجديدة · الحي R4 · Park Sight New Capital
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
        <a href={WA_URL} target="_blank" rel="noopener" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "14px 28px",
          background: "#25d366", color: "#fff", borderRadius: 12,
          fontSize: 14, fontWeight: 700, textDecoration: "none",
        }}>
          💬 تواصل واتساب الآن
        </a>
        <a href={`tel:${PHONE_INTL}`} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "14px 28px",
          border: "1px solid rgba(196,146,42,.35)", color: "#c4922a",
          borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none", direction: "ltr",
        }}>
          📞 {PHONE_DISPLAY}
        </a>
        <a href="/" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "14px 28px",
          border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)",
          borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: "none",
        }}>
          ← العودة للموقع
        </a>
      </div>

      {/* Project Info */}
      <div style={{
        display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
        background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 14, padding: "18px 24px", maxWidth: 480,
      }}>
        {[["١٤٠ فدان","مساحة المشروع"],["١٠٪","مقدم مرن"],["١٠ سنوات","تقسيط"],["R4","الحي السكني"]].map(([v,l],i) => (
          <div key={i} style={{ textAlign: "center", minWidth: 80 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#c4922a" }}>{v}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 9, color: "rgba(255,255,255,.2)", marginTop: 28 }}>
        © 2026 Park Sight by Il Cazar · بارك سايت الكازار · العاصمة الإدارية الجديدة
      </p>
    </div>
  );
}
