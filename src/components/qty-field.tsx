import { useEffect, useState, type RefObject } from "react";
import { QTY_MAX, QTY_MIN, parseQtyInput, qtyErrorMessage } from "@/lib/qty";

export type QtyCommit = { commit: () => boolean };

export function QtyField({
  value,
  onCommit,
  inputLabel,
  apiRef,
  onReady,
  fieldId,
}: {
  value: number;
  onCommit: (qty: number) => void;
  inputLabel: string;
  apiRef?: RefObject<QtyCommit | null>;
  onReady?: (api: QtyCommit) => void;
  fieldId?: string;
}) {
  const [text, setText] = useState(String(value));
  const [error, setError] = useState("");
  const errorId = `${fieldId ?? inputLabel}-error`;

  useEffect(() => {
    setText(String(value));
    setError("");
  }, [value]);

  function commit(raw = text) {
    const parsed = parseQtyInput(raw);
    if (!parsed.ok) {
      setError(qtyErrorMessage(parsed.reason));
      return false;
    }
    setError("");
    setText(String(parsed.qty));
    if (parsed.qty !== value) onCommit(parsed.qty);
    return true;
  }

  const api = { commit: () => commit(text) };
  if (apiRef) apiRef.current = api;
  onReady?.(api);

  function step(delta: number) {
    const parsed = parseQtyInput(text);
    const base = parsed.ok ? parsed.qty : value;
    const next = base + delta;
    if (next < QTY_MIN || next > QTY_MAX) {
      setError(qtyErrorMessage("invalid"));
      return;
    }
    setError("");
    onCommit(next);
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-fg">الكمية المطلوبة</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="تقليل الكمية"
          onClick={() => step(-1)}
          className="min-h-11 min-w-11 rounded-lg border border-line bg-cream text-lg font-bold text-fg"
        >
          −
        </button>
        <input
          inputMode="numeric"
          aria-label={inputLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setError("");
          }}
          onBlur={() => {
            commit(text);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit(text);
            }
          }}
          className="h-11 w-24 rounded-lg border border-line bg-paper text-center text-base font-semibold tabular-nums"
        />
        <button
          type="button"
          aria-label="زيادة الكمية"
          onClick={() => step(1)}
          className="min-h-11 min-w-11 rounded-lg border border-line bg-cream text-lg font-bold text-fg"
        >
          +
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm font-semibold leading-relaxed text-fg">
          {error}
        </p>
      ) : null}
    </div>
  );
}
