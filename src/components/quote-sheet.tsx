import { useRef, useState, type MouseEvent, type RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { lineCountLabel } from "@/lib/arabic-count";
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
import { QtyField, type QtyCommit } from "@/components/qty-field";

export function QuoteButton({
  onClick,
  count,
}: {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  count: number;
}) {
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

export function QuoteSheet({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement | null>;
}) {
  const lines = useOrder((state) => state.lines);
  const meta = useOrder((state) => state.meta);
  const updateLine = useOrder((state) => state.updateLine);
  const removeLine = useOrder((state) => state.removeLine);
  const setMeta = useOrder((state) => state.setMeta);
  const [openedWa, setOpenedWa] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const qtyApis = useRef(new Map<string, QtyCommit>());

  const total = lines.reduce((sum, line) => sum + line.qty, 0);

  function sendQuote() {
    for (const line of lines) {
      const api = qtyApis.current.get(line.key);
      if (api && !api.commit()) return;
    }
    const latest = useOrder.getState();
    if (!latest.lines.length) return;
    setOpenedWa(true);
    window.open(waLink(quoteMessage(latest.lines, latest.meta)), "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/70" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-[60] flex max-h-[100dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-paper text-fg outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[92vh] sm:w-[min(36rem,calc(100%-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            closeRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            const opener = returnFocusRef?.current;
            if (!opener) return;
            event.preventDefault();
            opener.focus();
          }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <Dialog.Title className="text-lg font-extrabold">طلب تسعير الجملة</Dialog.Title>
              <Dialog.Description className="text-sm text-stone">
                {lines.length
                  ? `${lineCountLabel(lines.length)} · الكمية المطلوبة ${total}`
                  : "لسه مفيش بنود"}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                ref={closeRef}
                type="button"
                className="min-h-11 rounded-lg border border-line px-3 text-sm font-bold"
              >
                إغلاق
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {lines.length === 0 ? (
              <p className="text-sm leading-relaxed text-stone">
                أضف موديلًا من الكتالوج. اللون والمقاس مش مطلوبين لطلب التسعير.
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
                          {code ? <p className="text-sm text-gold-deep">الكود: {code}</p> : null}
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
                      <div className="mt-3">
                        <QtyField
                          value={line.qty}
                          inputLabel="كمية البند"
                          fieldId={line.key}
                          onCommit={(qty) => updateLine(line.key, { qty })}
                          onReady={(api) => {
                            qtyApis.current.set(line.key, api);
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="grid gap-3">
              <Field label="اسم المحل" value={meta.shop} onChange={(shop) => setMeta({ shop })} />
              <Field
                label="المحافظة"
                value={meta.governorate}
                onChange={(governorate) => setMeta({ governorate })}
              />
              <label className="text-sm font-semibold">
                ملاحظات <span className="font-normal text-stone">(اختياري)</span>
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
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={sendQuote}
              className={
                "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-base font-bold " +
                (lines.length ? "bg-gold text-ink" : "bg-cream-2 text-stone")
              }
            >
              <WhatsAppGlyph className="size-5" />
              أرسل طلب التسعير على واتساب
            </button>
            <p className="mt-2 text-center text-xs leading-relaxed text-stone">
              {openedWa
                ? "واتساب اتفتح عندك. الرسالة لسه متبعتتش غير لما تدوس إرسال من الموبايل."
                : "فتح واتساب مش معناه إن المصنع استلم الطلب."}
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
