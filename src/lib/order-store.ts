import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getProduct, type AudienceId, type SpecChoice } from "@/lib/catalog";
import { QTY_MAX, parseQtyInput } from "@/lib/qty";

export type Draft = {
  audience: AudienceId;
  color: SpecChoice;
  size: SpecChoice;
  qty: number;
};

export type QuoteLine = Draft & {
  key: string;
  productId: string;
};

export type OrderMeta = {
  shop: string;
  governorate: string;
  notes: string;
};

type OrderState = {
  drafts: Record<string, Draft>;
  lines: QuoteLine[];
  meta: OrderMeta;
  hydrated: boolean;
  setDraft: (productId: string, patch: Partial<Draft>) => void;
  addLine: (productId: string) => void;
  updateLine: (key: string, patch: Partial<Draft>) => void;
  removeLine: (key: string) => void;
  setMeta: (patch: Partial<OrderMeta>) => void;
};

export const emptyDraft = (): Draft => ({
  audience: "unset",
  color: "later",
  size: "later",
  qty: 1,
});

function acceptedQty(value: number) {
  const parsed = parseQtyInput(String(value));
  return parsed.ok ? parsed.qty : null;
}

function sumQty(left: number, right: number) {
  return Math.min(QTY_MAX, left + right);
}

function lineKey(productId: string, draft: Draft, hasPair: boolean) {
  return [productId, hasPair ? draft.audience : "unset", draft.color, draft.size].join("|");
}

export const useOrder = create<OrderState>()(
  persist(
    (set, get) => ({
      drafts: {},
      lines: [],
      meta: { shop: "", governorate: "", notes: "" },
      hydrated: false,
      setDraft: (productId, patch) => {
        const current = get().drafts[productId] ?? emptyDraft();
        const next = { ...current, ...patch };
        if (patch.qty !== undefined) {
          const qty = acceptedQty(patch.qty);
          if (qty === null) return;
          next.qty = qty;
        }
        set({ drafts: { ...get().drafts, [productId]: next } });
      },
      addLine: (productId) => {
        const product = getProduct(productId);
        if (!product) return;
        const draft = get().drafts[productId] ?? emptyDraft();
        const qty = acceptedQty(draft.qty);
        if (qty === null) return;
        const key = lineKey(productId, draft, Boolean(product.pair));
        const lines = get().lines;
        const found = lines.find((line) => line.key === key);
        if (found) {
          const merged = sumQty(found.qty, qty);
          set({
            lines: lines.map((line) =>
              line.key === key ? { ...line, qty: merged } : line,
            ),
          });
          return;
        }
        set({
          lines: [
            ...lines,
            {
              key,
              productId,
              audience: product.pair ? draft.audience : "unset",
              color: draft.color,
              size: draft.size,
              qty,
            },
          ],
        });
      },
      updateLine: (key, patch) => {
        const lines = get().lines;
        const index = lines.findIndex((line) => line.key === key);
        if (index < 0) return;
        const current = lines[index];
        const product = getProduct(current.productId);
        if (!product) return;
        let qty = current.qty;
        if (patch.qty !== undefined) {
          const nextQty = acceptedQty(patch.qty);
          if (nextQty === null) {
            if (patch.audience === undefined && patch.color === undefined && patch.size === undefined) return;
          } else {
            qty = nextQty;
          }
        }
        const nextDraft: Draft = {
          audience: patch.audience ?? current.audience,
          color: patch.color ?? current.color,
          size: patch.size ?? current.size,
          qty,
        };
        const nextKey = lineKey(current.productId, nextDraft, Boolean(product.pair));
        if (nextKey === key) {
          const copy = lines.slice();
          copy[index] = { ...current, ...nextDraft, key };
          set({ lines: copy });
          return;
        }
        const without = lines.filter((line) => line.key !== key);
        const twinIndex = without.findIndex((line) => line.key === nextKey);
        if (twinIndex >= 0) {
          const copy = without.slice();
          const twin = copy[twinIndex];
          copy[twinIndex] = { ...twin, qty: sumQty(twin.qty, nextDraft.qty) };
          set({ lines: copy });
          return;
        }
        const copy = lines.slice();
        copy[index] = { ...nextDraft, key: nextKey, productId: current.productId };
        set({ lines: copy });
      },
      removeLine: (key) => set({ lines: get().lines.filter((line) => line.key !== key) }),
      setMeta: (patch) => set({ meta: { ...get().meta, ...patch } }),
    }),
    {
      name: "roots-wholesale-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        drafts: state.drafts,
        lines: state.lines,
        meta: state.meta,
      }),
      onRehydrateStorage: () => () => {
        useOrder.setState({ hydrated: true });
      },
    },
  ),
);

export function rehydrateOrder() {
  if (typeof window === "undefined") return;
  if (useOrder.persist.hasHydrated()) {
    useOrder.setState({ hydrated: true });
    return;
  }
  void useOrder.persist.rehydrate();
}
