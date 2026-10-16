/** Counted Arabic: 1 / 2 / 3–10 / 11+. Zero uses the caller's empty phrase. */
export function arabicCount(n: number, forms: { one: string; two: string; few: string; many: string }) {
  if (n === 1) return forms.one;
  if (n === 2) return forms.two;
  if (n >= 3 && n <= 10) return `${n} ${forms.few}`;
  return `${n} ${forms.many}`;
}

export function modelCountLabel(n: number) {
  if (n === 0) return "مفيش نتائج";
  return arabicCount(n, { one: "موديل واحد", two: "موديلان", few: "موديلات", many: "موديلًا" });
}

export function lineCountLabel(n: number) {
  if (n === 0) return "مفيش بنود";
  return arabicCount(n, { one: "بند واحد", two: "بندان", few: "بنود", many: "بندًا" });
}
