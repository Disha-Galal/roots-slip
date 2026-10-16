export const QTY_MIN = 1;
export const QTY_MAX = 9999;

const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";
const EASTERN_ARABIC = "۰۱۲۳۴۵۶۷۸۹";

/** Western, Arabic-Indic (١٢) and Persian (۱۲) digits become 0-9. */
export function normalizeDigits(value: string) {
  return value.replace(/[٠-٩۰-۹]/g, (digit) => {
    const arabic = ARABIC_INDIC.indexOf(digit);
    if (arabic >= 0) return String(arabic);
    const eastern = EASTERN_ARABIC.indexOf(digit);
    return eastern >= 0 ? String(eastern) : digit;
  });
}

export type QtyParse =
  | { ok: true; qty: number }
  | { ok: false; reason: "empty" | "invalid" };

export function parseQtyInput(raw: string): QtyParse {
  const text = normalizeDigits(raw).trim();
  if (text === "") return { ok: false, reason: "empty" };
  if (!/^\d+$/.test(text)) return { ok: false, reason: "invalid" };
  const qty = Number(text);
  if (!Number.isSafeInteger(qty) || qty < QTY_MIN || qty > QTY_MAX) {
    return { ok: false, reason: "invalid" };
  }
  return { ok: true, qty };
}

export function qtyErrorMessage(reason: "empty" | "invalid") {
  if (reason === "empty") return "اكتب الكمية المطلوبة. الرقم من 1 إلى 9999.";
  return "الكمية لازم تكون رقمًا صحيحًا من 1 إلى 9999.";
}
