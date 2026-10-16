import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Factory, Gem, MessagesSquare, Scissors } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { QuoteButton, QuoteSheet } from "@/components/quote-sheet";
import { RootsMark, WhatsAppGlyph } from "@/components/roots-mark";
import {
  AD_POSTER,
  AD_VIDEO,
  CATALOG_PDF,
  FACTORY_ADDRESS,
  FILTERS,
  PRODUCTS,
  SITE_URL,
  WA_DISPLAY,
  WA_PHONE,
  productMatches,
  waIndividual,
  waIntro,
  type CategoryId,
} from "@/lib/catalog";
import { modelCountLabel } from "@/lib/arabic-count";
import { rehydrateOrder, useOrder } from "@/lib/order-store";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ROOTS SLIPPERS | كتالوج الجملة — مصنع شباشب وسابوه" },
      {
        name: "description",
        content:
          "روتس سليبرز — مصنع شباشب وسابوه في شبرا الخيمة للتجار والمحلات. تصفح تشكيلة الموسم واطلب عرض سعر الجملة على واتساب.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
});

const FEATURES = [
  {
    icon: Factory,
    title: "تصنيع مباشر",
    text: "من المصنع للتاجر والمحل، من غير وسيط في التسعير.",
  },
  {
    icon: Gem,
    title: "خامات التشكيلة",
    text: "فرو، قطيفة، لوفر شتوي، وبوت فرو — حسب الموديل الظاهر في الكتالوج.",
  },
  {
    icon: Scissors,
    title: "تقفيل المصنع",
    text: "تقفيل المصنع على موديلات التشكيلة. أي تفصيلة إضافية تتأكد مع عرض السعر.",
  },
  {
    icon: MessagesSquare,
    title: "عرض سعر للجملة",
    text: "مفيش أسعار على الموقع. ابعت الموديلات والكميات ونرجّع لك عرض السعر.",
  },
];

const NAV = [
  { href: "#catalog", label: "الكتالوج" },
  { href: "#wholesale", label: "الجملة" },
  { href: "#ad", label: "الإعلان" },
  { href: "#factory", label: "التواصل" },
];

const BUSINESS = {
  "@context": "https://schema.org",
  "@type": ["ShoeStore", "LocalBusiness"],
  name: "ROOTS SLIPPERS",
  alternateName: "روتس سليبرز",
  url: SITE_URL,
  image: `${SITE_URL}/brand/logo.png`,
  telephone: `+${WA_PHONE}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "شارع الفرن العربي - الوحدة العربية",
    addressLocality: "شبرا الخيمة",
    addressCountry: "EG",
  },
};

function Home() {
  const [filter, setFilter] = useState<"all" | CategoryId>("all");
  const [query, setQuery] = useState("");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const quoteOpener = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function openQuote(event: MouseEvent<HTMLElement>) {
    quoteOpener.current = event.currentTarget;
    setQuoteOpen(true);
  }
  const lineCount = useOrder((state) => state.lines.length);

  useEffect(() => {
    rehydrateOrder();
  }, []);

  const visible = useMemo(
    () =>
      PRODUCTS.filter(
        (item) => (filter === "all" || item.category === filter) && productMatches(item, query),
      ),
    [filter, query],
  );

  return (
    <div id="top" className="min-h-screen bg-cream text-fg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS) }} />
      <header className="sticky top-0 z-40 border-b border-gold/40 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
          <a href="#top" className="flex items-center gap-2.5 text-gold">
            <RootsMark className="size-11 shrink-0" />
            <span>
              <span className="block font-display text-2xl leading-none tracking-wide">ROOTS</span>
              <span className="mt-0.5 block text-xs tracking-widest text-cream">SLIPPERS</span>
            </span>
          </a>
          <nav className="chip-row order-3 flex w-full min-w-0 max-w-full gap-4 overflow-x-auto md:order-none md:w-auto">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-cream"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <QuoteButton count={lineCount} onClick={openQuote} />
            <a
              href={waIntro()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-gold px-3 text-sm font-bold text-ink"
            >
              <WhatsAppGlyph className="size-5" />
              واتساب
            </a>
          </div>
        </div>
      </header>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-sm font-semibold tracking-wide text-gold">
              ROOTS SLIPPERS · SHOP & FACTORY
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-cream md:text-5xl">
              روتس.. الأصل بيفرق في كل خطوة
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/90">
              مصنع شباشب وسابوه. تصنيع مباشر وتوريد جملة للتجار والمحلات. التشكيلة قدامك، وجهّز طلب التسعير على واتساب.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#catalog"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-5 text-center text-base font-bold text-ink"
              >
                تصفح التشكيلة
              </a>
              <button
                type="button"
                onClick={openQuote}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cream px-5 text-center text-base font-bold text-cream"
              >
                طلب تسعير الجملة
              </button>
            </div>
          </div>
          <figure className="flex min-w-0 justify-center">
            <img
              src="/brand/logo.png"
              alt="شعار ROOTS SLIPPERS SHOP & FACTORY"
              width={480}
              height={850}
              className="h-auto max-h-96 w-auto max-w-full"
            />
          </figure>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-extrabold text-fg">ليه روتس للتجار؟</h2>
        <p className="mt-2 max-w-2xl text-stone">تصنيع مباشر، وتشكيلة متنوعة، والتسعير بيتأكد على واتساب.</p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="rounded-2xl border border-line bg-paper p-4">
              <feature.icon className="size-6 text-gold-deep" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold leading-snug">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-stone">{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="catalog" className="border-t border-line bg-cream-2">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold">كتالوج الموسم</h2>
              <p className="mt-2 max-w-2xl text-stone">
                دور بالاسم أو الكود. اللون والمقاس اختياريان لطلب التسعير: «يُحدّد لاحقًا» أو «تشكيلة مختلطة». الأسعار غير منشورة هنا.
              </p>
            </div>
            <p className="text-sm font-semibold text-gold-deep">{modelCountLabel(visible.length)}</p>
          </div>

          <label className="mt-5 block text-sm font-semibold">
            بحث
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="اسم الموديل أو الكود"
              className="mt-2 h-12 w-full rounded-lg border border-line bg-paper px-3 text-base"
            />
          </label>

          <div className="chip-row mt-4 flex min-w-0 max-w-full gap-2 overflow-x-auto" role="group" aria-label="تصفية الأقسام">
            {FILTERS.map((item) => {
              const count = PRODUCTS.filter(
                (product) =>
                  (item.id === "all" || product.category === item.id) && productMatches(product, query),
              ).length;
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item.id)}
                  className={
                    "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-bold " +
                    (active ? "bg-ink text-cream" : "border border-line bg-paper text-fg")
                  }
                >
                  {item.label}
                  <span className={active ? "text-gold" : "text-stone"}>{count}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-stone">
            <a href={waIndividual()} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
              للاستفسارات الفردية، تواصل معنا على الخاص
            </a>
          </p>

          {visible.length === 0 ? (
            <p className="mt-8 text-base font-semibold">مفيش موديل مطابق للبحث ده.</p>
          ) : (
            <ul className="mt-6 grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section id="wholesale" className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold text-gold">للتجار والمحلات</p>
            <h2 className="mt-2 text-3xl font-extrabold">اطلب عرض سعر للجملة</h2>
            <p className="mt-4 leading-relaxed text-cream/90">
              مفيش سعر منشور على الموقع. جمّع الموديلات والكمية المطلوبة، وابعت طلب التسعير على واتساب.
              اللون والمقاس تقدر تسيبهم «يُحدّد لاحقًا» أو تختار تشكيلة مختلطة.
            </p>
          </div>
          <div className="rounded-2xl border border-gold/40 p-5">
            <ul className="space-y-3 text-sm leading-relaxed">
              <li>تصنيع مباشر من المصنع.</li>
              <li>نفس أسماء وأكواد كتالوج الموسم.</li>
              <li>الشحن والتوافر بيتأكدوا مع عرض السعر.</li>
            </ul>
            <button
              type="button"
              onClick={openQuote}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 text-base font-bold text-ink"
            >
              افتح طلب التسعير
            </button>
          </div>
        </div>
      </section>

      <section id="ad" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-extrabold">إعلان الموسم والكتالوج</h2>
        <p className="mt-2 max-w-2xl text-stone">شاهد إعلان الموسم.</p>
        <div className="mt-6 grid min-w-0 items-start gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster={AD_POSTER}
              className="max-h-[70vh] w-full max-w-full rounded-2xl bg-ink object-contain"
            >
              <source src={AD_VIDEO} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={() => void videoRef.current?.play()}
              className="mt-3 inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-4 text-sm font-bold text-ink"
            >
              تشغيل الإعلان
            </button>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-5">
            <h3 className="text-lg font-bold">ملف الكتالوج</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              نفس تشكيلة الموقع. للحصول على عرض سعر الجملة، تواصل مع المصنع.
            </p>
            <a
              href={CATALOG_PDF}
              download
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-4 text-sm font-bold text-cream"
            >
              تحميل كتالوج الموسم PDF
            </a>
          </div>
        </div>
      </section>

      <footer id="factory" className="border-t border-gold/30 bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <img
              src="/brand/logo.png"
              alt="شعار ROOTS SLIPPERS"
              width={480}
              height={850}
              className="h-40 w-auto"
            />
            <p className="mt-3 text-sm leading-relaxed text-cream/85">
              مصنع شباشب وسابوه. الجملة هي مسار الطلب الأساسي.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-gold">عنوان المصنع</h2>
            <p className="mt-3 text-lg font-semibold leading-relaxed">{FACTORY_ADDRESS}</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-gold">تواصل</h2>
            <a href={`tel:+${WA_PHONE}`} className="mt-3 block text-lg font-semibold tabular-nums">
              {WA_DISPLAY}
            </a>
            <a
              href={waIntro()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold"
            >
              <WhatsAppGlyph className="size-5" />
              افتح واتساب
            </a>
            <a
              href={waIndividual()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-cream/80"
            >
              للاستفسارات الفردية، تواصل معنا على الخاص
            </a>
          </div>
        </div>
        <div className="border-t border-gold/20 px-4 py-4 text-center text-xs text-cream/70">
          ROOTS SLIPPERS · شبرا الخيمة
        </div>
      </footer>
      <QuoteSheet open={quoteOpen} onClose={() => setQuoteOpen(false)} returnFocusRef={quoteOpener} />
    </div>
  );
}
