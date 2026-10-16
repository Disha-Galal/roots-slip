import { useEffect, useState } from "react";
import {
  AUDIENCE_OPTIONS,
  SPEC_OPTIONS,
  getProduct,
  quoteMessage,
  resolveCode,
  waLink,
  type AudienceId,
  type SpecChoice,
} from "@/lib/catalog";
import { useOrder } from "@/lib/order-store";
import { WhatsAppGlyph } from "@/components/roots-mark";

export function QuoteButton({ onClick, count }: { onClick: () => void; count: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gold px-3 text-sm font-bold text-gold"
    >
      طلب الجملة
      <span className="tabular-nums text-cream">{count}</span>
    </button>
  );
}

export function QuoteSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lines = useOrder((state) => state.lines);
  const meta = useOrder((state) => state.meta);
  const updateLine = useOrder((state) => state.updateLine);
  const removeLine = useOrder((state) => state.removeLine);
  const setMeta = useOrder((state) => state.setMeta);
  const [openedWa, setOpenedWa] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const total = lines.reduce((sum, line) => sum + line.qty, 0);
  const href = lines.length ? waLink(quoteMessage(lines, meta)) : "#wholesale";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 sm:items-center" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-paper text-fg sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <h2 id="quote-title" className="text-lg font-extrabold">
              طلب تسعير الجملة
            </h2>
            <p className="text-sm text-stone">
              {lines.length ? `${lines.length} بنود · الكمية ${total}` : "لسه مفيش بنود"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-lg border border-line px-3 text-sm font-bold"
          >
            إغلاق
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {lines.length === 0 ? (
            <p className="text-sm leading-relaxed text-stone">
              اضغط «أضف لطلب الجملة» من أي موديل. اللون والمقاس مش إجباريين.
            </p>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => {
                const product = getProduct(line.productId);
                if (!product) return null;
                const code = resolveCode(product, line.audience);
                return (
                  <li key={line.key} className="rounded-2xl border border-line p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold leading-snug">{product.name}</p>
                        <p className="text-sm text-gold-deep">
                          {code ? `الكود: ${code}` : "الكود: لم يُسجَّل بعد"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        className="min-h-11 shrink-0 text-sm font-bold text-gold-deep"
                      >
                        حذف
                      </button>
                    </div>
                    {product.pair ? (
                      <label className="mt-3 block text-sm font-semibold">
                        الفئة
                        <select
                          value={line.audience}
                          onChange={(event) =>
                            updateLine(line.key, { audience: event.target.value as AudienceId })
                          }
                          className="mt-1 h-11 w-full rounded-lg border border-line bg-cream px-2 text-base"
                        >
                          {AUDIENCE_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <label className="text-sm font-semibold">
                        اللون
                        <select
                          value={line.color}
                          onChange={(event) =>
                            updateLine(line.key, { color: event.target.value as SpecChoice })
                          }
                          className="mt-1 h-11 w-full rounded-lg border border-line bg-cream px-2 text-base"
                        >
                          {SPEC_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="text-sm font-semibold">
                        المقاس
                        <select
                          value={line.size}
                          onChange={(event) =>
                            updateLine(line.key, { size: event.target.value as SpecChoice })
                          }
                          className="mt-1 h-11 w-full rounded-lg border border-line bg-cream px-2 text-base"
                        >
                          {SPEC_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-semibold">الكمية</span>
                      <button
                        type="button"
                        aria-label="تقليل الكمية"
                        onClick={() => updateLine(line.key, { qty: line.qty - 1 })}
                        className="min-h-11 min-w-11 rounded-lg border border-line text-lg font-bold"
                      >
                        −
                      </button>
                      <input
                        inputMode="numeric"
                        aria-label="كمية البند"
                        value={line.qty}
                        onChange={(event) => updateLine(line.key, { qty: Number(event.target.value) })}
                        className="h-11 w-20 rounded-lg border border-line text-center text-base font-semibold tabular-nums"
                      />
                      <button
                        type="button"
                        aria-label="زيادة الكمية"
                        onClick={() => updateLine(line.key, { qty: line.qty + 1 })}
                        className="min-h-11 min-w-11 rounded-lg border border-line text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="grid gap-3">
            <Field
              label="اسم المحل"
              value={meta.shop}
              onChange={(shop) => setMeta({ shop })}
            />
            <Field
              label="المحافظة"
              value={meta.governorate}
              onChange={(governorate) => setMeta({ governorate })}
            />
            <label className="text-sm font-semibold">
              ملاحظات (اختياري)
              <textarea
                value={meta.notes}
                onChange={(event) => setMeta({ notes: event.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-base"
              />
            </label>
          </div>
        </div>

        <div className="border-t border-line px-4 py-3">
          <a
            href={href}
            target={lines.length ? "_blank" : undefined}
            rel={lines.length ? "noopener noreferrer" : undefined}
            aria-disabled={lines.length === 0}
            onClick={(event) => {
              if (!lines.length) {
                event.preventDefault();
                return;
              }
              setOpenedWa(true);
            }}
            className={
              "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-base font-bold " +
              (lines.length ? "bg-gold text-ink" : "bg-cream-2 text-stone")
            }
          >
            <WhatsAppGlyph className="size-5" />
            أرسل طلب التسعير على واتساب
          </a>
          <p className="mt-2 text-center text-xs leading-relaxed text-stone">
            {openedWa
              ? "واتساب اتفتح عندك. الرسالة لسه متبعتتش غير لما تدوس إرسال من الموبايل."
              : "فتح واتساب مش معناه إن المصنع استلم الطلب."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-sm font-semibold">
      {label} <span className="font-normal text-stone">(اختياري)</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-11 w-full rounded-lg border border-line bg-cream px-3 text-base"
      />
    </label>
  );
}
