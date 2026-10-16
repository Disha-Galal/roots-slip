import assert from "node:assert/strict";
import test from "node:test";
import { getProduct, quoteMessage, waLink } from "./catalog.ts";

test("whatsapp quote links each model and keeps pair codes apart", () => {
  const text = quoteMessage(
    [
      { productId: "loafer", audience: "unset", color: "later", size: "mixed", qty: 12 },
      { productId: "g24", audience: "girl", color: "later", size: "later", qty: 2 },
      { productId: "g24", audience: "baby", color: "mixed", size: "later", qty: 1 },
    ],
    { shop: "محل النور", governorate: "القليوبية", notes: "بدون ألوان دلوقتي" },
  );
  assert.match(text, /https:\/\/roots-slip\.grok\.me\/m\/loafer/);
  assert.match(text, /https:\/\/roots-slip\.grok\.me\/m\/g24/);
  assert.match(text, /اسم المحل: محل النور/);
  assert.match(text, /المحافظة: القليوبية/);
  assert.match(text, /ملاحظات: بدون ألوان دلوقتي/);
  assert.match(text, /الكمية: 12/);
  assert.match(text, /اللون: تشكيلة مختلطة/);
  assert.match(text, /الكود: G24/);
  assert.match(text, /الكود: B24/);
  assert.match(text, /الفئة: بناتي/);
  assert.match(text, /الفئة: بيبي/);
  assert.doesNotMatch(text, /جنيه|EGP|\$\d/);
  assert.match(text, /استفسار تسعير فقط/);
  const unset = quoteMessage(
    [{ productId: "g24", audience: "unset", color: "later", size: "later", qty: 3 }],
    { shop: "", governorate: "", notes: "" },
  );
  assert.match(unset, /الكود: G24 \/ B24/);
  assert.match(unset, /الفئة: غير محددة/);
  assert.doesNotMatch(unset, /الكود: G24\n/);
  assert.doesNotMatch(unset, /الكود: B24\n/);
  const loafer = getProduct("loafer");
  assert.equal(loafer?.code, null);
  assert.match(text, /الكود: غير مضاف في الكتالوج/);

  const href = waLink(text);
  const decoded = new URL(href).searchParams.get("text") ?? "";
  assert.equal(decoded, text);
  assert.match(href, /^https:\/\/wa\.me\/201012861612\?text=/);
  assert.match(decodeURIComponent(href.split("text=")[1]), /محل النور/);
});
