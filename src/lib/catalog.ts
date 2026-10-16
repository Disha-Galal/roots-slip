export const SITE_URL = "https://roots-slip.grok.me";
export const WA_PHONE = "201012861612";
export const WA_DISPLAY = "01012861612";
export const FACTORY_ADDRESS = "شبرا الخيمة — شارع الفرن العربي - الوحدة العربية";

export const AD_VIDEO = "/media/roots-ad.mp4";
export const AD_POSTER = "/media/roots-ad-poster.jpg";
export const CATALOG_PDF = "/media/ROOTS-catalog.pdf";

export type CategoryId = "women" | "girls" | "kids";
export type AudienceId = "girl" | "baby" | "unset";
export type SpecChoice = "later" | "mixed";

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  summary: string;
  images: ProductImage[];
  /** Confirmed single code. Null means the catalog still says «يُضاف». */
  code: string | null;
  pair?: { girl: string; baby: string };
  note?: string;
};

export const FILTERS: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "women", label: "سابوه حريمي" },
  { id: "girls", label: "بناتي وبيبي" },
  { id: "kids", label: "أطفالي" },
];

export const SPEC_OPTIONS: { id: SpecChoice; label: string }[] = [
  { id: "later", label: "يُحدّد لاحقًا" },
  { id: "mixed", label: "تشكيلة مختلطة" },
];

export const AUDIENCE_OPTIONS: { id: AudienceId; label: string }[] = [
  { id: "unset", label: "غير محددة" },
  { id: "girl", label: "بناتي" },
  { id: "baby", label: "بيبي" },
];

export const PRODUCTS: Product[] = [
  {
    id: "d75",
    name: "سابوه حريمي أرنب فرو",
    category: "women",
    summary: "فرو مقفول على شكل أرنب.",
    code: "D75",
    images: [{ src: "/products/c/d75.jpg", alt: "سابوه حريمي أرنب فرو كود D75 من كتالوج روتس" }],
  },
  {
    id: "d78",
    name: "سابوه حريمي فرو بفيونكات",
    category: "women",
    summary: "فرو مقفول بفيونكات صغيرة.",
    code: "D78",
    images: [{ src: "/products/c/d78.jpg", alt: "سابوه حريمي فرو مقفول بفيونكات كود D78 من كتالوج روتس" }],
  },
  {
    id: "loafer",
    name: "لوفر شتوي مبطّن بالفرو",
    category: "women",
    summary: "لوفر شتوي ببطانة فرو.",
    code: null,
    images: [{ src: "/products/c/loafer.jpg", alt: "لوفر شتوي مبطن بالفرو من كتالوج روتس" }],
  },
  {
    id: "d55",
    name: "سابوه حريمي شخصيات مجسّمة",
    category: "women",
    summary: "شخصيات فرو مجسّمة.",
    code: "D55",
    images: [{ src: "/products/c/d55.jpg", alt: "سابوه حريمي شخصيات مجسمة كود D55 من كتالوج روتس" }],
  },
  {
    id: "d69",
    name: "سابوه حريمي فرو بقلب",
    category: "women",
    summary: "فرو مقفول بفيونكة على شكل قلب.",
    code: "D69",
    images: [{ src: "/products/c/d69.jpg", alt: "سابوه حريمي فرو بقلب كود D69 من كتالوج روتس" }],
  },
  {
    id: "d74",
    name: "سابوه حريمي دب فرو",
    category: "women",
    summary: "فرو مقفول على شكل دب.",
    code: "D74",
    images: [{ src: "/products/c/d74.jpg", alt: "سابوه حريمي دب فرو كود D74 من كتالوج روتس" }],
  },
  {
    id: "open-bow",
    name: "سابوه فرو مفتوح بفيونكة",
    category: "women",
    summary: "سابوه مفتوح بفيونكة كبيرة.",
    code: null,
    images: [{ src: "/products/c/open-bow.jpg", alt: "سابوه فرو مفتوح بفيونكة من كتالوج روتس" }],
  },
  {
    id: "bow-heart",
    name: "سابوه فرو بفيونكة وقلب",
    category: "women",
    summary: "فرو بفيونكة وعلى الصدر قلب.",
    code: null,
    images: [{ src: "/products/c/bow-heart.jpg", alt: "سابوه فرو بفيونكة وقلب من كتالوج روتس" }],
  },
  {
    id: "face-bow",
    name: "سابوه فرو وجه بفيونكة",
    category: "women",
    summary: "وجه فرو مجسّم مع فيونكة.",
    code: null,
    images: [{ src: "/products/c/face-bow.jpg", alt: "سابوه فرو وجه بفيونكة من كتالوج روتس" }],
  },
  {
    id: "d30",
    name: "سابوه حريمي وجوه فرو",
    category: "women",
    summary: "وجوه فرو مجسّمة بألوان مختلفة في صورة الكتالوج.",
    code: "D30",
    images: [{ src: "/products/c/d30.jpg", alt: "سابوه حريمي وجوه فرو كود D30 من كتالوج روتس" }],
  },
  {
    id: "boot-pom",
    name: "بوت فرو بكرات وفيونكة",
    category: "women",
    summary: "بوت فرو بكرات وفيونكة.",
    code: null,
    images: [{ src: "/products/c/boot-pom.jpg", alt: "بوت فرو بكرات وفيونكة من كتالوج روتس" }],
  },
  {
    id: "boot-high",
    name: "بوت فرو بنعل مرتفع",
    category: "women",
    summary: "بوت فرو بنعل مرتفع.",
    code: null,
    images: [{ src: "/products/c/boot-high.jpg", alt: "بوت فرو بنعل مرتفع من كتالوج روتس" }],
  },
  {
    id: "g24",
    name: "سابوه بناتي وبيبي بفيونكة",
    category: "girls",
    summary: "شخصيات فرو بفيونكة.",
    code: null,
    pair: { girl: "G24", baby: "B24" },
    images: [
      { src: "/products/c/g24-a.jpg", alt: "سابوه بناتي وبيبي بفيونكة، كود G24 و B24، من كتالوج روتس" },
      { src: "/products/c/g24-b.jpg", alt: "صورة ثانية من الكتالوج لسابوه بناتي وبيبي بفيونكة، كود G24 و B24" },
    ],
  },
  {
    id: "g18",
    name: "سابوه لابوبو مجسّم",
    category: "kids",
    summary: "شخصية لابوبو مجسّمة.",
    code: null,
    pair: { girl: "G18", baby: "B18" },
    images: [{ src: "/products/c/g18.jpg", alt: "سابوه لابوبو مجسم كود G18 و B18 من كتالوج روتس" }],
  },
  {
    id: "g26",
    name: "سابوه أطفالي وجوه مجسّمة",
    category: "kids",
    summary: "وجوه فرو مجسّمة للأطفال.",
    code: null,
    pair: { girl: "G26", baby: "B26" },
    images: [{ src: "/products/c/g26.jpg", alt: "سابوه أطفالي وجوه مجسمة كود G26 و B26 من كتالوج روتس" }],
  },
  {
    id: "dog-face",
    name: "سابوه فرو وجه كلب",
    category: "kids",
    summary: "فرو على شكل وجه كلب.",
    code: null,
    images: [{ src: "/products/c/dog-face.jpg", alt: "سابوه فرو وجه كلب من كتالوج روتس" }],
  },
  {
    id: "kuromi",
    name: "سابوه كورومي مبطّن",
    category: "kids",
    summary: "سابوه مبطّن مطبوع بشخصية كورومي.",
    code: null,
    images: [{ src: "/products/c/kuromi.jpg", alt: "سابوه كورومي مبطن من كتالوج روتس" }],
  },
  {
    id: "kitty",
    name: "سابوه كيتي فرو وردي",
    category: "kids",
    summary: "فرو وردي على شكل كيتي.",
    code: null,
    images: [{ src: "/products/c/kitty.jpg", alt: "سابوه كيتي فرو وردي من كتالوج روتس" }],
  },
  {
    id: "dog-white",
    name: "سابوه فرو وجه كلب أبيض",
    category: "kids",
    summary: "فرو وجه كلب أبيض.",
    code: null,
    images: [{ src: "/products/c/dog-white.jpg", alt: "سابوه فرو وجه كلب أبيض من كتالوج روتس" }],
  },
];

export function getProduct(id: string) {
  return PRODUCTS.find((item) => item.id === id);
}

export function specLabel(choice: SpecChoice) {
  return choice === "mixed" ? "تشكيلة مختلطة" : "غير محدد (يُحدَّد لاحقًا)";
}

export function audienceLabel(audience: AudienceId) {
  if (audience === "girl") return "بناتي";
  if (audience === "baby") return "بيبي";
  return "غير محددة";
}

export function resolveCode(product: Product, audience: AudienceId) {
  if (product.pair) {
    if (audience === "girl") return product.pair.girl;
    if (audience === "baby") return product.pair.baby;
    return `${product.pair.girl} / ${product.pair.baby}`;
  }
  return product.code;
}

export function codeCaption(product: Product, audience: AudienceId) {
  const code = resolveCode(product, audience);
  if (!code) return "";
  if (product.pair && audience === "unset") return `الكود: ${code} — الفئة غير محددة`;
  return `الكود: ${code}`;
}

export function waLink(text: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

export function waIntro() {
  return waLink("السلام عليكم، تواصل معاكم من موقع روتس سليبرز.");
}

export function waIndividual() {
  return waLink("السلام عليكم، عندي استفسار فردي من موقع روتس سليبرز.");
}

export type QuoteLineInput = {
  productId: string;
  audience: AudienceId;
  color: SpecChoice;
  size: SpecChoice;
  qty: number;
};

export function quoteMessage(
  lines: QuoteLineInput[],
  meta: { shop: string; governorate: string; notes: string },
) {
  const parts = ["السلام عليكم، طلب تسعير جملة من موقع روتس سليبرز:"];
  if (meta.shop.trim()) parts.push(`اسم المحل: ${meta.shop.trim()}`);
  if (meta.governorate.trim()) parts.push(`المحافظة: ${meta.governorate.trim()}`);
  if (meta.notes.trim()) parts.push(`ملاحظات: ${meta.notes.trim()}`);
  parts.push("");
  lines.forEach((line, index) => {
    const product = getProduct(line.productId);
    if (!product) return;
    const code = resolveCode(product, line.audience);
    parts.push(`${index + 1}) ${product.name}`);
    parts.push(`الصفحة: ${SITE_URL}/m/${product.id}`);
    parts.push(code ? `الكود: ${code}` : "الكود: غير مضاف في الكتالوج");
    if (product.pair) parts.push(`الفئة: ${audienceLabel(line.audience)}`);
    parts.push(`الكمية: ${line.qty}`);
    parts.push(`اللون: ${specLabel(line.color)}`);
    parts.push(`المقاس: ${specLabel(line.size)}`);
    parts.push("");
  });
  parts.push("استفسار تسعير فقط، ولسه مش تأكيد طلب.");
  return parts.join("\n");
}

export function normalizeQuery(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, "");
}

export function productMatches(product: Product, query: string) {
  const needle = normalizeQuery(query);
  if (!needle) return true;
  const hay = normalizeQuery(
    [
      product.name,
      product.summary,
      product.code ?? "",
      product.pair ? `${product.pair.girl}${product.pair.baby}` : "",
      product.code ? "" : "يضاف",
    ].join(" "),
  );
  return hay.includes(needle);
}
