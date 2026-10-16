import assert from "node:assert/strict";
import test from "node:test";
import { parseQtyInput } from "./qty.ts";

test("english, arabic-indic and persian digits are the same quantity", () => {
  assert.deepEqual(parseQtyInput("12"), { ok: true, qty: 12 });
  assert.deepEqual(parseQtyInput("١٢"), { ok: true, qty: 12 });
  assert.deepEqual(parseQtyInput("۱۲"), { ok: true, qty: 12 });
  assert.deepEqual(parseQtyInput("  ١٢  "), { ok: true, qty: 12 });
});

test("an emptied field stays empty instead of becoming 1", () => {
  assert.deepEqual(parseQtyInput(""), { ok: false, reason: "empty" });
  assert.deepEqual(parseQtyInput("   "), { ok: false, reason: "empty" });
});

test("invalid quantities are rejected instead of rewritten", () => {
  for (const raw of ["0", "00", "1.5", "12a", "١a", "-3", "10000", "9999.1"]) {
    assert.equal(parseQtyInput(raw).ok, false, raw);
  }
  assert.deepEqual(parseQtyInput("1"), { ok: true, qty: 1 });
  assert.deepEqual(parseQtyInput("9999"), { ok: true, qty: 9999 });
});
