import assert from "node:assert/strict";
import test from "node:test";
import { lineCountLabel, modelCountLabel } from "./arabic-count.ts";

test("model counts use the arabic numbered forms", () => {
  assert.equal(modelCountLabel(0), "مفيش نتائج");
  assert.equal(modelCountLabel(1), "موديل واحد");
  assert.equal(modelCountLabel(2), "موديلان");
  assert.equal(modelCountLabel(3), "3 موديلات");
  assert.equal(modelCountLabel(10), "10 موديلات");
  assert.equal(modelCountLabel(11), "11 موديلًا");
  assert.equal(modelCountLabel(19), "19 موديلًا");
});

test("quote line counts use the arabic numbered forms", () => {
  assert.equal(lineCountLabel(0), "مفيش بنود");
  assert.equal(lineCountLabel(1), "بند واحد");
  assert.equal(lineCountLabel(2), "بندان");
  assert.equal(lineCountLabel(5), "5 بنود");
  assert.equal(lineCountLabel(12), "12 بندًا");
});
