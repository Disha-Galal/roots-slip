import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AUDIENCE_OPTIONS,
  SPEC_OPTIONS,
  codeCaption,
  type Product,
} from "@/lib/catalog";
import { emptyDraft, useOrder, type Draft } from "@/lib/order-store";
import { ProductGallery } from "@/components/product-gallery";

function ChoiceRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-fg">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={
                "min-h-11 rounded-lg px-3 text-sm font-semibold " +
                (selected ? "bg-ink text-cream" : "border border-line bg-cream text-fg")
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductControls({
  product,
  titleTag = "h3",
}: {
  product: Product;
  titleTag?: "h1" | "h3";
}) {
  const draft = useOrder((state) => state.drafts[product.id]) ?? emptyDraft();
  const setDraft = useOrder((state) => state.setDraft);
  const addLine = useOrder((state) => state.addLine);
  const [notice, setNotice] = useState("");

  function patch(next: Partial<Draft>) {
    setDraft(product.id, next);
    setNotice("");
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-stone">{product.summary}</p>
        {titleTag === "h1" ? (
          <h1 className="mt-1 text-2xl font-extrabold leading-snug text-fg">{product.name}</h1>
        ) : (
          <h3 className="mt-1 text-lg font-bold leading-snug text-fg">
            <Link to="/m/$id" params={{ id: product.id }} className="underline-offset-4 hover:underline">
              {product.name}
            </Link>
          </h3>
        )}
        <p className="mt-1 text-sm font-semibold text-gold-deep">{codeCaption(product, draft.audience)}</p>
        {product.note ? <p className="mt-1 text-sm leading-relaxed text-stone">{product.note}</p> : null}
      </div>

      {product.pair ? (
        <ChoiceRow
          label="الفئة"
          value={draft.audience}
          options={AUDIENCE_OPTIONS}
          onChange={(id) => patch({ audience: id as Draft["audience"] })}
        />
      ) : null}

      <ChoiceRow
        label="اللون"
        value={draft.color}
        options={SPEC_OPTIONS}
        onChange={(id) => patch({ color: id as Draft["color"] })}
      />
      <ChoiceRow
        label="المقاس"
        value={draft.size}
        options={SPEC_OPTIONS}
        onChange={(id) => patch({ size: id as Draft["size"] })}
      />
      <p className="text-sm leading-relaxed text-stone">
        الألوان والمقاسات في الكتالوج لسه «تُحدَّد عند الطلب». مش لازم تختارهم عشان تسأل على سعر الجملة.
      </p>

      <div>
        <p className="mb-2 text-sm font-semibold text-fg">الكمية</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="تقليل الكمية"
            onClick={() => patch({ qty: draft.qty - 1 })}
            className="min-h-11 min-w-11 rounded-lg border border-line bg-cream text-lg font-bold text-fg"
          >
            −
          </button>
          <input
            inputMode="numeric"
            aria-label="الكمية"
            value={draft.qty}
            onChange={(event) => patch({ qty: Number(event.target.value) })}
            className="h-11 w-20 rounded-lg border border-line bg-paper text-center text-base font-semibold tabular-nums"
          />
          <button
            type="button"
            aria-label="زيادة الكمية"
            onClick={() => patch({ qty: draft.qty + 1 })}
            className="min-h-11 min-w-11 rounded-lg border border-line bg-cream text-lg font-bold text-fg"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        {notice ? (
          <p className="text-sm font-medium text-gold-deep" role="status">
            {notice}
          </p>
        ) : (
          <p className="text-sm text-stone">السعر: اطلب عرض سعر للجملة. مفيش رقم على الموقع.</p>
        )}
        <button
          type="button"
          onClick={() => {
            addLine(product.id);
            setNotice("اتضاف لطلب التسعير. لو زودت نفس التشكيلة تاني، الكمية هتتجمع.");
          }}
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-3 text-center text-sm font-bold text-ink"
        >
          أضف لطلب الجملة
        </button>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const draft = useOrder((state) => state.drafts[product.id]) ?? emptyDraft();
  const badge = product.pair
    ? draft.audience === "girl"
      ? product.pair.girl
      : draft.audience === "baby"
        ? product.pair.baby
        : `${product.pair.girl} / ${product.pair.baby}`
    : (product.code ?? "يُضاف");

  return (
    <article className="card-shadow flex flex-col overflow-hidden rounded-2xl border border-line bg-paper">
      <ProductGallery images={product.images} name={product.name} badge={badge} />
      <div className="flex flex-1 flex-col p-4">
        <ProductControls product={product} />
      </div>
    </article>
  );
}