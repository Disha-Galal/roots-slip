import { i as __toESM } from "../_runtime.mjs";
import { a as FACTORY_ADDRESS, c as SITE_URL, d as WA_PHONE, p as getProduct, u as WA_DISPLAY, v as waIntro } from "./catalog-Cm385f5d.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-DhJ2vBEn.mjs";
import { a as QuoteSheet, c as emptyDraft, i as QuoteButton, l as rehydrateOrder, n as ProductControls, o as RootsMark, r as ProductGallery, s as WhatsAppGlyph, u as useOrder } from "./quote-sheet-CQ2W8Ewf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/m._id-Cz5rkC3g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ModelPage() {
	const { id } = Route.useParams();
	const product = getProduct(id);
	const draft = useOrder((state) => product ? state.drafts[product.id] : void 0) ?? emptyDraft();
	const lineCount = useOrder((state) => state.lines.length);
	const [quoteOpen, setQuoteOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		rehydrateOrder();
	}, []);
	const schema = product ? {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		description: product.summary,
		image: product.images.map((image) => `${SITE_URL}${image.src}`),
		brand: {
			"@type": "Brand",
			name: "ROOTS SLIPPERS"
		},
		...product.code || product.pair ? { sku: product.code ?? `${product.pair?.girl} / ${product.pair?.baby}` } : {}
	} : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream text-fg",
		children: [
			schema ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-gold/40 bg-ink text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5 text-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootsMark, { className: "size-11 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl leading-none tracking-wide",
							children: "ROOTS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteButton, {
							count: lineCount,
							onClick: () => setQuoteOpen(true)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waIntro(),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex min-h-11 items-center gap-2 rounded-lg bg-gold px-3 text-sm font-bold text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppGlyph, { className: "size-5" }), "واتساب"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "catalog",
						className: "text-sm font-semibold text-gold-deep",
						children: "رجوع للكتالوج"
					}),
					product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-4 grid min-w-0 items-start gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 overflow-hidden rounded-2xl border border-line bg-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGallery, {
								eager: true,
								images: product.images,
								name: product.name,
								badge: product.pair ? draft.audience === "girl" ? product.pair.girl : draft.audience === "baby" ? product.pair.baby : `${product.pair.girl} / ${product.pair.baby}` : product.code ?? "يُضاف"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-line bg-paper p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductControls, {
								product,
								titleTag: "h1"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-extrabold",
							children: "الموديل ده مش في الكتالوج"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-stone",
							children: "ارجع للتشكيلة واختار موديل ظاهر."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-sm text-stone",
						children: [
							FACTORY_ADDRESS,
							" ·",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:+${WA_PHONE}`,
								className: "font-semibold tabular-nums",
								children: WA_DISPLAY
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteSheet, {
				open: quoteOpen,
				onClose: () => setQuoteOpen(false)
			})
		]
	});
}
//#endregion
export { ModelPage as component };
