import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductControls } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { QuoteButton, QuoteSheet } from "@/components/quote-sheet";
import { RootsMark, WhatsAppGlyph } from "@/components/roots-mark";
import {
  FACTORY_ADDRESS,
  SITE_URL,
  WA_DISPLAY,
  WA_PHONE,
  getProduct,
  waIntro,
} from "@/lib/catalog";
import { emptyDraft, rehydrateOrder, useOrder } from "@/lib/order-store";

export const Route = createFileRoute("/m/$id")({
  component: ModelPage,
  head: ({ params }) => {
    const product = getProduct(params.id);
    const title = product
      ? `${product.name}${product.code ? ` ${product.code}` : ""} | ROOTS SLIPPERS`
      : "الموديل غير موجود | ROOTS SLIPPERS";
    const description = product
      ? `${product.name} من تشكيلة روتس سليبرز. اطلب عرض سعر للجملة على واتساب. الأسعار غير منشورة على الموقع.`
      : "موديل غير موجود في كتالوج روتس سليبرز.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/m/${params.id}` }],
    };
  },
});

function ModelPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const draft = useOrder((state) => (product ? state.drafts[product.id] : undefined)) ?? emptyDraft();
  const lineCount = useOrder((state) => state.lines.length);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    rehydrateOrder();
  }, []);

  const schema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.summary,
        image: product.images.map((image) => `${SITE_URL}${image.src}`),
        brand: { "@type": "Brand", name: "ROOTS SLIPPERS" },
        ...(product.code || product.pair
          ? { sku: product.code ?? `${product.pair?.girl} / ${product.pair?.baby}` }
          : {}),
      }
    : null;

  return (
    <div className="min-h-screen bg-cream text-fg">
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
      <header className="sticky top-0 z-40 border-b border-gold/40 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5 text-gold">
            <RootsMark className="size-11 shrink-0" />
            <span className="font-display text-2xl leading-none tracking-wide">ROOTS</span>
          </Link>
          <div className="flex items-center gap-2">
            <QuoteButton count={lineCount} onClick={() => setQuoteOpen(true)} />
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

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/" hash="catalog" className="text-sm font-semibold text-gold-deep">
          رجوع للكتالوج
        </Link>
        {product ? (
          <article className="mt-4 grid min-w-0 items-start gap-6 md:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-paper">
              <ProductGallery
                eager
                images={product.images}
                name={product.name}
                badge={
                  product.pair
                    ? draft.audience === "girl"
                      ? product.pair.girl
                      : draft.audience === "baby"
                        ? product.pair.baby
                        : `${product.pair.girl} / ${product.pair.baby}`
                    : (product.code ?? "يُضاف")
                }
              />
            </div>
            <div className="rounded-2xl border border-line bg-paper p-4">
              <ProductControls product={product} titleTag="h1" />
            </div>
          </article>
        ) : (
          <div className="mt-8">
            <h1 className="text-2xl font-extrabold">الموديل ده مش في الكتالوج</h1>
            <p className="mt-2 text-stone">ارجع للتشكيلة واختار موديل ظاهر.</p>
          </div>
        )}
        <p className="mt-8 text-sm text-stone">
          {FACTORY_ADDRESS} ·{" "}
          <a href={`tel:+${WA_PHONE}`} className="font-semibold tabular-nums">
            {WA_DISPLAY}
          </a>
        </p>
      </main>
      <QuoteSheet open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
