"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ══════════════════════════════════════════
   CONFIG — غيّر الرقم والكود هنا فقط
════════════════════════════════════════════ */
const PHONE        = "01011162689";
const PHONE_DISPLAY = "01011162689";
const PHONE_INTL   = "+201011162689";
const WA_NUMBER    = "201011162689";
const WEB3_KEY     = "8a5df6a8-9f44-4c4a-b743-57ac299499b7";
const WA_MSG       = "مرحباً، أريد الاستفسار عن مشروع بارك سايت العاصمة الإدارية من الكازار — Park Sight Ilcazar";
const WA_URL       = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

/* ══════════════════════════════════════════
   TRACKING — أضف كودك هنا
   gtag للمكالمات: trackCall()
   gtag للواتساب: trackWA()
   gtag للفورم: trackLead()
════════════════════════════════════════════ */
function trackCall(label = "call") {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "conversion", {
      send_to: "AW-18214662091/UM8SCO33yr4cEMvftu1D",
      value: 1.0,
      currency: "USD",
      event_callback: () => {},
    });
  }
}
function trackWA(label = "whatsapp") {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "conversion", {
      send_to: "AW-18214662091/iJQnCIT9yr4cEMvftu1D",
      value: 1.0,
      currency: "USD",
      event_callback: () => {},
    });
  }
}
function trackLead(label = "form") {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.gtag) {
    w.gtag("event", "generate_lead", { event_category: "lead", event_label: label });
  }
}

/* ── Image CDN ── */
const CDN = "https://arro-consultancy.com/uploads/2026-06-08-143835-";
const IMGS = {
  logo: CDN + "6a26a9bb6e8d2.png",
  hero: CDN + "6a26a9bb83a8c.webp",
  masterplan: CDN + "6a26a9bb93e80.webp",
  unit2br: CDN + "6a26a9bb99131.webp",
  unit3br: CDN + "6a26a9bb89865.webp",
  penthouse: CDN + "6a26a9bb7ed03.webp",
  townhouse: CDN + "6a26a9bb8ea90.webp",
  waterfront: CDN + "6a26a9bb74b19.webp",
};

type UT = "all" | "apt" | "penthouse" | "townhouse";
const UNITS = [
  { type: "apt" as UT, typeLabel: "شقة", name: "شقق غرفتين نوم", en: "2 Bedrooms Apartment", price: "4.2 مليون", area: "102–124 م²", specs: ["غرفتين نوم", "إطلالة خضراء", "مقدم 50 ألف"], img: IMGS.unit2br },
  { type: "apt" as UT, typeLabel: "شقة", name: "شقق 3 غرف نوم", en: "3 Bedrooms Apartment", price: "4.8 مليون", area: "137–146 م²", specs: ["3 غرف نوم", "4 شقق بالدور", "خصوصية عالية"], img: IMGS.unit3br },
  { type: "penthouse" as UT, typeLabel: "بنتهاوس", name: "وحدات البنتهاوس", en: "Penthouse Units", price: "اتصل للسعر", area: "حتى 185 م²", specs: ["فيو بانورامي", "إطلالة 22 فدان", "خصوصية تامة"], img: IMGS.penthouse },
  { type: "townhouse" as UT, typeLabel: "تاون هاوس", name: "فيلات التاون هاوس", en: "Townhouse Villas", price: "12.7 مليون", area: "تبدأ من 170 م²", specs: ["حديقة خاصة", "مقدم EOI 100 ألف", "حياة هادئة"], img: IMGS.townhouse },
];

const FAQS = [
  { q: "أين يقع بارك سايت الكازار — Park Sight Ilcazar؟", a: "بارك سايت العاصمة الإدارية يقع في الحي السكني R4، بإطلالة مباشرة على النهر الأخضر. موقع استراتيجي في قلب العاصمة الجديدة من الكازار للتطوير العقاري." },
  { q: "ما أنواع وحدات بارك سايت الكازار المتاحة؟", a: "Park Sight Ilcazar يتضمن شقق (غرفتين و٣ غرف)، بنتهاوس بانورامي، وتاون هاوس بحدائق خاصة. جميع الوحدات بتصميمات MIMAR Architects." },
  { q: "كم المقدم في بارك سايت — Park Sight؟", a: "مقدم ١٠٪ مع تقسيط مريح حتى ١٠ سنوات. جدية حجز الشقق ٥٠ ألف جنيه والتاون هاوس ١٠٠ ألف جنيه — وكلها مستردة بالكامل." },
  { q: "ما مساحة مشروع بارك سايت العاصمة من الكازار؟", a: "١٤٠ فدان إجمالي، منها ٤٠+ فدان مساحات خضراء، وحديقة مركزية ٢٢ فدان. المرحلة الأولى مباني G+3 وG+6 بكثافة منخفضة." },
  { q: "متى التسليم في Park Sight الكازار؟", a: "تسليم خلال ٤ سنوات بمتوسط سعر للمتر أقل من ٥٠,٠٠٠ جنيه. بارك سايت الكازار هو أول مشروع للكازار في قلب العاصمة الإدارية." },
];

const NAV = [["#about","عن المشروع"],["#units","الوحدات"],["#payment","السداد"],["#gallery","المعرض"],["#amenities","المرافق"],["#contact","احجز الآن"]];

const PhIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const ChvIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;

export default function Home() {
  const router = useRouter();
  const [uFilter, setUFilter] = useState<UT>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [popup, setPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [showCookie, setShowCookie] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const popupShown = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const popupRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Scroll animations
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fin").forEach(el => obs.observe(el));

    // Header scroll
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cookie
    try { if (!localStorage.getItem("ps_ck")) setShowCookie(true); } catch { setShowCookie(true); }

    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Popup trigger
  useEffect(() => {
    if (popupShown.current) return;
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.55) openPopup();
    };
    const timer = setTimeout(() => openPopup(), 18000);
    window.addEventListener("scroll", onScroll, { passive: true });
    function openPopup() {
      if (popupShown.current) return;
      popupShown.current = true;
      setPopup(true);
      document.body.classList.add("p-on");
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    }
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  function closePopup() { setPopup(false); document.body.classList.remove("p-on"); }

  async function submitForm(ref: React.RefObject<HTMLFormElement | null>, setStatus: (s: any) => void, source: string) {
    if (!ref.current) return;
    setStatus("sending");
    const fd = new FormData(ref.current);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => (payload[k] = v.toString()));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        trackLead(source);
        ref.current.reset();
        if (source === "main_form") {
          setTimeout(() => router.push("/thank-you"), 800);
        }
      } else throw new Error();
    } catch { setStatus("error"); }
  }

  const filtered = uFilter === "all" ? UNITS : UNITS.filter(u => u.type === uFilter);

  return (
    <>
      {/* ── HEADER ── */}
      <header className={`hd ${scrolled ? "scr" : ""}`}>
        <div className="hd-in">
          <a className="hd-logo" href="#hero">
            <img src={IMGS.logo} alt="الكازار Park Sight" />
            <div><div className="hd-logo-t">PARK SIGHT</div><div className="hd-logo-s">Il Cazar · الكازار</div></div>
          </a>
          <nav className="hd-nav">
            {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <div className="hd-acts">
            <a className="hd-call" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("header")}><PhIcon /><span>{PHONE_DISPLAY}</span></a>
            <a className="hd-book" href="#contact">سجل اهتمامك</a>
            <button className="hd-mob" onClick={() => setMobileNav(!mobileNav)}>☰</button>
          </div>
        </div>
        {mobileNav && (
          <div style={{ background: "var(--color-dark2)", padding: "10px 20px" }}>
            {NAV.map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMobileNav(false)}
                style={{ display: "block", padding: "10px 0", color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                {l}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={IMGS.hero} alt="بارك سايت الكازار العاصمة الإدارية — Park Sight Ilcazar New Capital" />
          <div className="hero-ov" />
        </div>
        <div className="hero-ct">
          <span className="hero-tag">🌿 إطلاق بارك سايت — Park Sight · الكازار · R4</span>
          <h1 className="hero-h">
            بارك سايت <em>العاصمة</em>
            <br />Park Sight <em>Il Cazar</em>
          </h1>
          <p className="hero-p">
            بارك سايت الكازار — أول مشروع سكني من الكازار في قلب الحي R4 بالعاصمة الإدارية الجديدة.
            ١٤٠ فدان بإطلالة مباشرة على النهر الأخضر، ٤٠+ فدان خضرة، وتصميمات MIMAR Architects.
          </p>
          <p className="hero-kw">بارك سايت العاصمة · بارك سايت الكازار · Park Sight · Ilcazar New Capital</p>
          <div className="hero-stats">
            <div className="hero-stat"><div className="hero-stat-v">١٤٠ فدان</div><div className="hero-stat-l">مساحة المشروع</div></div>
            <div className="hero-stat"><div className="hero-stat-v">١٠٪ مقدم</div><div className="hero-stat-l">سداد مرن</div></div>
            <div className="hero-stat"><div className="hero-stat-v">١٠ سنوات</div><div className="hero-stat-l">تقسيط مريح</div></div>
            <div className="hero-stat"><div className="hero-stat-v">٤ سنوات</div><div className="hero-stat-l">موعد التسليم</div></div>
          </div>
          <div className="hero-btns">
            <a className="b-gold" href="#contact">سجل اهتمامك الآن</a>
            <a className="b-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("hero")}>💬 واتساب</a>
            <a className="b-ghost" href="#units">استكشف الوحدات</a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-band">
        <div className="trust-in">
          <div className="trust-item"><strong>١٤٠</strong> فدان</div>
          <div className="trust-item"><strong>٢٢</strong> فدان حديقة مركزية</div>
          <div className="trust-item"><strong>٤٠+</strong> فدان خضرة</div>
          <div className="trust-item"><strong>١٠٪</strong> مقدم</div>
          <div className="trust-item"><strong>٤</strong> سنوات تسليم</div>
          <div className="trust-item"><strong>R4</strong> الحي السكني</div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="sec about" id="about"><div className="sec-in">
        <div className="fin" style={{ textAlign: "center" }}>
          <span className="sec-tag">بارك سايت الكازار · Park Sight Ilcazar</span>
          <h2 className="sec-h" style={{ textAlign: "center" }}>حياة تتنفس طبيعة في <em>بارك سايت</em></h2>
          <p className="sec-p c">
            بارك سايت العاصمة الإدارية من الكازار — Park Sight New Capital by Ilcazar — وجهة سكنية فريدة
            في الحي R4 بإطلالة مباشرة على النهر الأخضر. بارك سايت الكازار يجمع التخطيط العمراني الذكي
            مع جمال الطبيعة في ١٤٠ فدان متكاملة.
          </p>
        </div>
        <div className="about-grid fin">
          <div className="about-img">
            <img src={IMGS.masterplan} alt="ماستر بلان بارك سايت الكازار — Park Sight Ilcazar Master Plan" />
          </div>
          <div className="about-pts">
            {[
              { i: "🌿", t: "٤٠+ فدان مساحات خضراء", d: "حديقة مركزية ٢٢ فدان ومسارات مظللة للركض والدراجات في بارك سايت" },
              { i: "🔒", t: "٥ مناطق سكنية ببوابات مزدوجة", d: "خصوصية وأمان تام — ٤ شقق فقط بالدور في بارك سايت الكازار" },
              { i: "🅿️", t: "مواقف تحت الأرض بالكامل", d: "Park Sight توفر مواقف أرضية تغطي مساحة المشروع بالكامل" },
              { i: "🏛️", t: "تصميم MIMAR Architects", d: "بارك سايت العاصمة — تصميمات معمارية راقية على مستوى عالمي" },
            ].map((x, i) => (
              <div key={i} className="about-pt">
                <div className="about-pt-i">{x.i}</div>
                <div><h3>{x.t}</h3><p>{x.d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-stats fin">
          {[
            { v: "140", u: "فدان", l: "مساحة بارك سايت الكازار" },
            { v: "22", u: "فدان", l: "الحديقة المركزية" },
            { v: "<50K", u: "جنيه/م²", l: "متوسط السعر" },
          ].map((s, i) => (
            <div key={i} className="about-stat">
              <div className="about-stat-v">{s.v}<span> {s.u}</span></div>
              <div className="about-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div></section>

      {/* ── MID CTA ── */}
      <div className="midcta">
        <h3>احجز وحدتك في بارك سايت — Park Sight الكازار</h3>
        <p>مقدم ١٠٪ فقط — تقسيط حتى ١٠ سنوات — تسليم ٤ سنوات</p>
        <div className="midcta-btns">
          <a className="b-gold" href="#contact">سجل اهتمامك الآن</a>
          <a className="b-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("midcta")}>💬 واتساب</a>
          <a className="b-ghost" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("midcta")}><PhIcon /> اتصل بنا</a>
        </div>
      </div>

      {/* ── UNITS ── */}
      <section className="sec units" id="units"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">وحدات بارك سايت · Park Sight Units</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          تصميمات عصرية في <em>بارك سايت الكازار</em>
        </h2>
        <p className="sec-p c">
          شقق وتاون هاوس وبنتهاوس بإطلالات خضراء ساحرة في Park Sight Ilcazar العاصمة الإدارية
        </p>
        {/* Filters */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", margin: "20px 0" }}>
          {([["all","الكل"],["apt","شقق"],["penthouse","بنتهاوس"],["townhouse","تاون هاوس"]] as [UT,string][]).map(([k,l]) => (
            <button key={k} onClick={() => setUFilter(k)}
              style={{ padding: "7px 18px", borderRadius: "50px", border: `2px solid ${uFilter===k?"var(--color-forest)":"rgba(27,77,53,.1)"}`, background: uFilter===k?"var(--color-forest)":"transparent", color: uFilter===k?"#fff":"var(--color-dark)", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", transition: ".2s" }}>
              {l}
            </button>
          ))}
        </div>
        <div className="u-grid">
          {filtered.map((u, i) => (
            <div key={i} className="u-card">
              <div className="u-img"><img src={u.img} alt={`${u.name} — بارك سايت الكازار Park Sight`} /></div>
              <div className="u-body">
                <span className="u-type">{u.typeLabel} · Park Sight</span>
                <div className="u-name">{u.name}</div>
                <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 3 }}>يبدأ من</div>
                <div className="u-price">{u.price}</div>
                <div style={{ fontSize: 10, color: "var(--color-forest)", marginBottom: 8 }}>📐 {u.area}</div>
                <div className="u-specs">
                  {u.specs.map((s, j) => <span key={j} className="u-spec">{s}</span>)}
                </div>
                <a href={WA_URL} target="_blank" rel="noopener" className="u-btn" onClick={() => trackWA(`unit_${u.type}`)}>
                  استفسر على واتساب
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="u-note">
          أسعار بارك سايت الكازار — Park Sight Ilcazar استرشادية وقابلة للتغيير. تواصل معنا للحصول على آخر الأسعار.
        </p>
      </div></section>

      {/* ── PAYMENT ── */}
      <section className="sec pay" id="payment"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">خطة السداد · Payment Plan</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>سداد مرن في <em>بارك سايت</em></h2>
        <div className="pay-grid" style={{ textAlign: "right" }}>
          <div className="pay-c">
            <h3>نظام التقسيط</h3>
            <ul className="pay-list">
              <li>١٠٪ مقدم مرن</li>
              <li>تقسيط مريح حتى ١٠ سنوات</li>
              <li>تسليم خلال ٤ سنوات</li>
              <li>متوسط سعر المتر أقل من ٥٠,٠٠٠ جنيه</li>
              <li>مباني G+3 وG+6 منخفضة الكثافة</li>
            </ul>
            <div style={{ marginTop: 16 }}>
              <a className="b-green" href={WA_URL} target="_blank" rel="noopener"
                style={{ width: "100%", justifyContent: "center" }} onClick={() => trackWA("payment")}>
                اطلب تفاصيل السداد
              </a>
            </div>
          </div>
          <div className="pay-c">
            <h3>جدية الحجز EOI</h3>
            {[["شقق (غرفتين و٣ غرف)","50,000 جنيه"],["تاون هاوس","100,000 جنيه"],["بنتهاوس","حسب الوحدة"]].map(([t,v],i) => (
              <div key={i} className="eoi-r"><span className="eoi-t">{t}</span><span className="eoi-v">{v}</span></div>
            ))}
            <p style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 14, lineHeight: 1.6 }}>
              جميع مبالغ EOI مستردة بالكامل — بارك سايت الكازار Park Sight Ilcazar
            </p>
          </div>
        </div>
      </div></section>

      {/* ── GALLERY ── */}
      <section className="sec gal" id="gallery"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">معرض بارك سايت · Park Sight Gallery</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          <em>بارك سايت</em> — بانوراما ساحرة على الخضرة
        </h2>
        <div className="gal-grid">
          <div className="gal-it big">
            <img src={IMGS.hero} alt="بارك سايت العاصمة الإدارية من الكازار — Park Sight Main View" />
            <div className="gal-cap">بارك سايت الكازار — الإطلالة الرئيسية</div>
          </div>
          <div className="gal-it">
            <img src={IMGS.masterplan} alt="ماستر بلان بارك سايت — Park Sight Master Plan" />
            <div className="gal-cap">ماستر بلان Park Sight</div>
          </div>
          <div className="gal-it">
            <img src={IMGS.waterfront} alt="النهر الأخضر بارك سايت Ilcazar" />
            <div className="gal-cap">إطلالة النهر الأخضر</div>
          </div>
          <div className="gal-it">
            <img src={IMGS.unit2br} alt="شقق بارك سايت الكازار غرفتين" />
            <div className="gal-cap">شقق Park Sight — غرفتين</div>
          </div>
          <div className="gal-it">
            <img src={IMGS.penthouse} alt="بنتهاوس بارك سايت Park Sight Penthouse" />
            <div className="gal-cap">بنتهاوس بارك سايت</div>
          </div>
          <div className="gal-it">
            <img src={IMGS.townhouse} alt="تاون هاوس بارك سايت Ilcazar Townhouse" />
            <div className="gal-cap">تاون هاوس Park Sight</div>
          </div>
        </div>
      </div></section>

      {/* ── AMENITIES ── */}
      <section className="am" id="amenities"><div className="am-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag" style={{ color: "var(--color-gold)" }}>مرافق بارك سايت · Amenities</span>
        <h2 className="sec-h" style={{ color: "#fff", textAlign: "center" }}>
          مرافق <em style={{ color: "var(--color-gold)" }}>بارك سايت الكازار</em>
        </h2>
        <div className="am-grid">
          {[
            { i: "🌳", n: "٤٠+ فدان خضرة" }, { i: "🌸", n: "حديقة مركزية ٢٢ فدان" },
            { i: "🏊", n: "كلوب هاوس" }, { i: "🏟️", n: "أرينا خارجية" },
            { i: "🚴", n: "مسارات الدراجات" }, { i: "🏃", n: "مسارات الركض" },
            { i: "🅿️", n: "مواقف أرضية" }, { i: "🔒", n: "بوابات مزدوجة" },
            { i: "🌊", n: "إطلالة النهر الأخضر" }, { i: "🏙️", n: "حي R4" },
            { i: "📐", n: "تصميم MIMAR" }, { i: "⚡", n: "بنية تحتية ذكية" },
          ].map((x, i) => (
            <div key={i} className="am-c"><div className="am-c-i">{x.i}</div><div className="am-c-n">{x.n}</div></div>
          ))}
        </div>
      </div></section>

      {/* ── LOCATION ── */}
      <section className="sec loc" id="location"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <span className="sec-tag">موقع بارك سايت · Location</span>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          موقع <em>بارك سايت الكازار</em> في العاصمة
        </h2>
        <div className="loc-grid" style={{ textAlign: "right" }}>
          <div className="loc-img">
            <img src={IMGS.masterplan} alt="موقع بارك سايت العاصمة الإدارية على الخريطة — Park Sight Location" />
          </div>
          <div className="loc-facts">
            {[
              { t: "الحي السكني R4", d: "قلب العاصمة الإدارية الجديدة — موقع استراتيجي متميز" },
              { t: "إطلالة النهر الأخضر", d: "بارك سايت الكازار بإطلالة مباشرة على النهر الأخضر" },
              { t: "الكازار — Il Cazar", d: "Park Sight هو أول مشروع للكازار في العاصمة الإدارية" },
              { t: "تسليم ٤ سنوات", d: "مباني G+3 وG+6 — ٤ شقق فقط بالدور لأقصى خصوصية" },
            ].map((x, i) => (
              <div key={i} className="loc-f"><h4>{x.t}</h4><p>{x.d}</p></div>
            ))}
          </div>
        </div>
      </div></section>

      {/* ── FAQ ── */}
      <section className="sec faq"><div className="sec-in fin" style={{ textAlign: "center" }}>
        <h2 className="sec-h" style={{ textAlign: "center" }}>
          أسئلة عن <em>بارك سايت</em> — Park Sight FAQ
        </h2>
        <div className="faq-list">
          {FAQS.map((x, i) => (
            <div key={i} className="faq-i">
              <button className={`faq-q ${openFaq===i?"op":""}`} onClick={() => setOpenFaq(openFaq===i?null:i)}>
                <span>{x.q}</span><span className="arr"><ChvIcon /></span>
              </button>
              <div className={`faq-a ${openFaq===i?"op":""}`}><p>{x.a}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      {/* ── CONTACT ── */}
      <section className="ct" id="contact"><div className="sec-in fin">
        <div style={{ textAlign: "center" }}>
          <span className="sec-tag" style={{ color: "var(--color-gold)" }}>سجل اهتمامك · Register</span>
          <h2 className="sec-h" style={{ color: "#fff", textAlign: "center" }}>
            احجز في <em style={{ color: "var(--color-gold)" }}>بارك سايت الكازار</em>
          </h2>
        </div>
        <div className="ct-wrap">
          <div className="ct-left">
            <p>
              سجّل اهتمامك في بارك سايت العاصمة الإدارية من الكازار — Park Sight Ilcazar —
              وفريق المبيعات هيتواصل معك لتفاصيل الأسعار والوحدات المتاحة في الحي R4.
            </p>
            <div className="ct-info">
              <a className="ct-row" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("contact_section")}>
                <PhIcon /> <span>{PHONE_DISPLAY}</span> <span style={{ marginRight: "auto", fontSize: 10, color: "rgba(255,255,255,.4)" }}>اتصل مباشرة</span>
              </a>
              <a className="ct-row" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("contact_section")}>
                <span>💬</span> <span>واتساب — Park Sight</span> <span style={{ marginRight: "auto", fontSize: 10, color: "rgba(255,255,255,.4)" }}>رد سريع</span>
              </a>
              <div className="ct-row" style={{ cursor: "default" }}>
                <span>📍</span> <span style={{ fontSize: 11 }}>الحي R4، العاصمة الإدارية الجديدة</span>
              </div>
            </div>
          </div>
          <div className="ct-form">
            <div className="cf-title">سجل في بارك سايت — Park Sight الكازار</div>
            <form ref={formRef} onSubmit={(e: FormEvent) => { e.preventDefault(); submitForm(formRef, setFormStatus, "main_form"); }} style={{ textAlign: "right" }}>
              <input type="hidden" name="access_key" value={WEB3_KEY} />
              <input type="hidden" name="subject" value="Lead — بارك سايت الكازار Park Sight Ilcazar" />
              <input type="hidden" name="from_name" value="Park Sight Landing" />
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />
              <div className="cf-row">
                <div className="cf-f"><label>الاسم الكامل *</label><input name="name" placeholder="أدخل اسمك" required /></div>
                <div className="cf-f"><label>رقم الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required /></div>
              </div>
              <div className="cf-row">
                <div className="cf-f"><label>البريد الإلكتروني</label><input name="email" type="email" dir="ltr" placeholder="email@example.com" /></div>
                <div className="cf-f"><label>نوع الوحدة</label>
                  <select name="unit_type">
                    <option value="غير محدد">اختر نوع الوحدة</option>
                    <option value="شقة غرفتين">شقة — غرفتين نوم</option>
                    <option value="شقة 3 غرف">شقة — 3 غرف نوم</option>
                    <option value="بنتهاوس">بنتهاوس</option>
                    <option value="تاون هاوس">تاون هاوس</option>
                  </select>
                </div>
              </div>
              {formStatus === "sent" ? (
                <div style={{ textAlign: "center", padding: "18px 0" }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>✓</div>
                  <p style={{ color: "var(--color-gold)", fontSize: 16, fontWeight: 700 }}>تم الاستلام — جاري التحويل...</p>
                </div>
              ) : (
                <button type="submit" className="cf-sub" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "جاري الإرسال..." : "إرسال — سجل في بارك سايت"}
                </button>
              )}
              {formStatus === "error" && (
                <p style={{ color: "#ef4444", fontSize: 11, textAlign: "center", marginTop: 8 }}>
                  حدث خطأ — <a href={WA_URL} target="_blank" rel="noopener" style={{ color: "var(--color-gold)" }}>واتساب</a>
                </p>
              )}
              <p className="cf-prv">
                بإرسال النموذج توافق على{" "}
                <button onClick={() => setShowPrivacy(true)} type="button"
                  style={{ background: "none", border: "none", color: "var(--color-gold)", textDecoration: "underline", cursor: "pointer", fontSize: 9, fontFamily: "var(--font-body)" }}>
                  سياسة الخصوصية
                </button>
              </p>
            </form>
          </div>
        </div>
      </div></section>

      {/* ── FOOTER ── */}
      <footer className="ft"><div className="sec-in">
        <div className="ft-in">
          <div className="ft-brand">
            <img src={IMGS.logo} alt="الكازار Il Cazar Park Sight" />
            <p>
              بارك سايت الكازار — Park Sight Ilcazar، مجتمع سكني على ١٤٠ فدان في الحي R4 بالعاصمة الإدارية الجديدة.
              بارك سايت العاصمة — أسعار استرشادية.
            </p>
          </div>
          <div>
            <div className="ft-h">روابط سريعة</div>
            <div className="ft-links">
              {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
            </div>
          </div>
          <div>
            <div className="ft-h">تواصل معنا</div>
            <div className="ft-links">
              <a href={`tel:${PHONE_INTL}`} onClick={() => trackCall("footer")}>📞 {PHONE_DISPLAY}</a>
              <a href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("footer")}>💬 واتساب</a>
              <span style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}>📍 الحي R4، العاصمة الإدارية</span>
            </div>
          </div>
        </div>
        <div className="ft-bottom">
          <p className="ft-cr">© 2026 بارك سايت — Park Sight by Il Cazar · الكازار للتطوير العقاري · جميع الأسعار استرشادية</p>
          <div className="ft-legal">
            <button onClick={() => setShowPrivacy(true)}>سياسة الخصوصية</button>
            <a href="#about">عن المشروع</a>
          </div>
        </div>
      </div></footer>

      {/* ── POPUP ── */}
      <div className={`p-bk ${popup?"on":""}`} onClick={closePopup} />
      <div className={`p-dlg ${popup?"on":""}`} role="dialog">
        <button className="p-x" onClick={closePopup}>✕</button>
        <span className="p-tag">🌿 بارك سايت الكازار — Park Sight</span>
        <h2 className="p-h">احجز وحدتك في بارك سايت العاصمة</h2>
        <p className="p-desc">
          سجّل دلوقتي في Park Sight Ilcazar واحصل على أولوية اختيار الوحدة في الحي R4 بالعاصمة الإدارية
        </p>
        <ul className="p-perks">
          <li>أولوية اختيار الوحدة والموقع في بارك سايت</li>
          <li>١٠٪ مقدم فقط — تبدأ من ٤.٢ مليون</li>
          <li>فريق بارك سايت الكازار يرد في دقايق</li>
        </ul>
        {popupStatus === "sent" ? (
          <div style={{ textAlign: "center", padding: "14px 0" }}>
            <div style={{ fontSize: 40 }}>✓</div>
            <p style={{ color: "var(--color-gold)", fontWeight: 700, marginTop: 6 }}>تم استلام طلبك</p>
          </div>
        ) : (
          <form className="p-form" ref={popupRef}
            onSubmit={(e: FormEvent) => { e.preventDefault(); submitForm(popupRef, setPopupStatus, "popup").then(() => setTimeout(closePopup, 2500)); }}>
            <input type="hidden" name="access_key" value={WEB3_KEY} />
            <input type="hidden" name="subject" value="Popup — بارك سايت الكازار Park Sight" />
            <input type="hidden" name="from_name" value="Park Sight Popup" />
            <input type="checkbox" name="botcheck" style={{ display: "none" }} />
            <div className="cf-f"><label>الاسم *</label><input name="name" placeholder="اسمك" required /></div>
            <div className="cf-f"><label>الموبايل *</label><input name="phone" type="tel" dir="ltr" placeholder="01012345678" required /></div>
            <div className="cf-f"><label>نوع الوحدة</label>
              <select name="unit_type">
                <option value="غير محدد">اختر</option>
                <option value="شقة">شقة</option>
                <option value="بنتهاوس">بنتهاوس</option>
                <option value="تاون هاوس">تاون هاوس</option>
              </select>
            </div>
            <button type="submit" className="p-sub" disabled={popupStatus === "sending"}>
              {popupStatus === "sending" ? "جاري..." : "احجز في بارك سايت الآن"}
            </button>
            <a className="p-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("popup")}>
              💬 واتساب بارك سايت الكازار
            </a>
          </form>
        )}
      </div>

      {/* ── PRIVACY MODAL ── */}
      {showPrivacy && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,.6)" }} onClick={() => setShowPrivacy(false)} />
          <div style={{ position: "fixed", zIndex: 301, top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(560px,92vw)", maxHeight: "85vh", overflowY: "auto", background: "#fff", borderRadius: 18, padding: "30px 26px", color: "var(--color-dark)" }}>
            <button onClick={() => setShowPrivacy(false)} style={{ position: "absolute", top: 12, left: 12, background: "var(--color-cream)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 600, marginBottom: 14 }}>سياسة الخصوصية</h2>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: "var(--color-muted)" }}>
              <p style={{ marginBottom: 10 }}><strong>١. البيانات:</strong> نجمع الاسم والهاتف والإيميل فقط عند تعبئة النموذج، للتواصل بخصوص بارك سايت الكازار — Park Sight.</p>
              <p style={{ marginBottom: 10 }}><strong>٢. الاستخدام:</strong> حصرياً لتقديم معلومات عن Park Sight Ilcazar وترتيب التواصل مع فريق المبيعات.</p>
              <p style={{ marginBottom: 10 }}><strong>٣. الحماية:</strong> اتصال مشفر HTTPS + Web3Forms. لا نبيع أو نشارك بياناتك مع أطراف ثالثة.</p>
              <p style={{ marginBottom: 10 }}><strong>٤. حقوقك:</strong> يحق لك الاطلاع على بياناتك أو تصحيحها أو حذفها في أي وقت.</p>
              <p><strong>٥. تواصل:</strong> <a href={`tel:${PHONE_INTL}`} style={{ color: "var(--color-forest)" }}>{PHONE_DISPLAY}</a></p>
            </div>
            <p style={{ fontSize: 9, color: "#aaa", marginTop: 14 }}>آخر تحديث: يونيو 2026 · بارك سايت — Park Sight Ilcazar</p>
          </div>
        </>
      )}

      {/* ── COOKIE ── */}
      {showCookie && (
        <div className="ck">
          <p>نستخدم cookies لتحسين تجربتك في بارك سايت. <button onClick={() => setShowPrivacy(true)} style={{ background: "none", border: "none", color: "var(--color-gold)", textDecoration: "underline", cursor: "pointer", fontSize: 10, fontFamily: "var(--font-body)" }}>سياسة الخصوصية</button></p>
          <div className="ck-btns">
            <button className="ck-ok" onClick={() => { setShowCookie(false); try { localStorage.setItem("ps_ck", "1"); } catch {} }}>موافق</button>
            <button className="ck-no" onClick={() => setShowCookie(false)}>رفض</button>
          </div>
        </div>
      )}

      {/* ── MOBILE BAR ── */}
      <nav className="mbar"><div className="mbar-in">
        <a className="m-call" href={`tel:${PHONE_INTL}`} onClick={() => trackCall("mobile_bar")}><PhIcon />{PHONE_DISPLAY}</a>
        <a className="m-wa" href={WA_URL} target="_blank" rel="noopener" onClick={() => trackWA("mobile_bar")}>💬</a>
        <a className="m-book" href="#contact">سجل</a>
      </div></nav>
    </>
  );
}
