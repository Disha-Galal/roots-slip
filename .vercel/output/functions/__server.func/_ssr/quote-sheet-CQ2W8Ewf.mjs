import { i as __toESM } from "../_runtime.mjs";
import { f as codeCaption, g as resolveCode, h as quoteMessage, l as SPEC_OPTIONS, p as getProduct, r as AUDIENCE_OPTIONS, y as waLink } from "./catalog-Cm385f5d.mjs";
import { q as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-sheet-CQ2W8Ewf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyDraft = () => ({
	audience: "unset",
	color: "later",
	size: "later",
	qty: 1
});
function clampQty(value) {
	if (!Number.isFinite(value)) return 1;
	return Math.max(1, Math.min(9999, Math.round(value)));
}
function lineKey(productId, draft, hasPair) {
	return [
		productId,
		hasPair ? draft.audience : "unset",
		draft.color,
		draft.size
	].join("|");
}
var useOrder = create()(persist((set, get) => ({
	drafts: {},
	lines: [],
	meta: {
		shop: "",
		governorate: "",
		notes: ""
	},
	hydrated: false,
	setDraft: (productId, patch) => {
		const next = {
			...get().drafts[productId] ?? emptyDraft(),
			...patch
		};
		if (patch.qty !== void 0) next.qty = clampQty(patch.qty);
		set({ drafts: {
			...get().drafts,
			[productId]: next
		} });
	},
	addLine: (productId) => {
		const product = getProduct(productId);
		if (!product) return;
		const draft = get().drafts[productId] ?? emptyDraft();
		const qty = clampQty(draft.qty);
		const key = lineKey(productId, draft, Boolean(product.pair));
		const lines = get().lines;
		if (lines.find((line) => line.key === key)) {
			set({ lines: lines.map((line) => line.key === key ? {
				...line,
				qty: clampQty(line.qty + qty)
			} : line) });
			return;
		}
		set({ lines: [...lines, {
			key,
			productId,
			audience: product.pair ? draft.audience : "unset",
			color: draft.color,
			size: draft.size,
			qty
		}] });
	},
	updateLine: (key, patch) => {
		const lines = get().lines;
		const index = lines.findIndex((line) => line.key === key);
		if (index < 0) return;
		const current = lines[index];
		const product = getProduct(current.productId);
		if (!product) return;
		const nextDraft = {
			audience: patch.audience ?? current.audience,
			color: patch.color ?? current.color,
			size: patch.size ?? current.size,
			qty: patch.qty !== void 0 ? clampQty(patch.qty) : current.qty
		};
		const nextKey = lineKey(current.productId, nextDraft, Boolean(product.pair));
		if (nextKey === key) {
			const copy = lines.slice();
			copy[index] = {
				...current,
				...nextDraft,
				key
			};
			set({ lines: copy });
			return;
		}
		const without = lines.filter((line) => line.key !== key);
		const twinIndex = without.findIndex((line) => line.key === nextKey);
		if (twinIndex >= 0) {
			const copy = without.slice();
			const twin = copy[twinIndex];
			copy[twinIndex] = {
				...twin,
				qty: clampQty(twin.qty + nextDraft.qty)
			};
			set({ lines: copy });
			return;
		}
		const copy = lines.slice();
		copy[index] = {
			...nextDraft,
			key: nextKey,
			productId: current.productId
		};
		set({ lines: copy });
	},
	removeLine: (key) => set({ lines: get().lines.filter((line) => line.key !== key) }),
	setMeta: (patch) => set({ meta: {
		...get().meta,
		...patch
	} })
}), {
	name: "roots-wholesale-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		drafts: state.drafts,
		lines: state.lines,
		meta: state.meta
	}),
	onRehydrateStorage: () => () => {
		useOrder.setState({ hydrated: true });
	}
}));
function rehydrateOrder() {
	if (typeof window === "undefined") return;
	if (useOrder.persist.hasHydrated()) {
		useOrder.setState({ hydrated: true });
		return;
	}
	useOrder.persist.rehydrate();
}
function ProductGallery({ images, name, badge, eager = false }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [zoom, setZoom] = (0, import_react.useState)(false);
	const current = images[Math.min(index, images.length - 1)] ?? images[0];
	(0, import_react.useEffect)(() => {
		if (!zoom) return;
		const onKey = (event) => {
			if (event.key === "Escape") setZoom(false);
			if (event.key === "ArrowLeft") setIndex((value) => (value + 1) % images.length);
			if (event.key === "ArrowRight") setIndex((value) => (value - 1 + images.length) % images.length);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [zoom, images.length]);
	if (!current) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setZoom(true),
			className: "relative block aspect-square w-full bg-cream-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: current.src,
				alt: current.alt,
				width: 960,
				height: 960,
				loading: eager ? "eager" : "lazy",
				decoding: "async",
				className: "size-full object-contain"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute bottom-3 start-3 rounded-md bg-ink px-2.5 py-1 text-sm font-bold text-gold",
				children: badge
			})]
		}),
		images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-w-0 max-w-full gap-2 overflow-x-auto p-3",
			children: images.map((image, imageIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `صورة ${imageIndex + 1} من ${name}`,
				"aria-pressed": imageIndex === index,
				onClick: () => setIndex(imageIndex),
				className: "size-16 shrink-0 overflow-hidden rounded-lg border bg-cream-2 " + (imageIndex === index ? "border-gold-deep ring-2 ring-gold-deep" : "border-line"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image.src,
					alt: "",
					className: "size-full object-contain"
				})
			}, image.src))
		}) : null,
		zoom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex flex-col bg-ink/95 p-4",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": name,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-cream",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setZoom(false),
						className: "min-h-11 rounded-lg bg-gold px-4 text-sm font-bold text-ink",
						children: "إغلاق"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: current.src,
					alt: current.alt,
					className: "m-auto max-h-[70vh] w-full object-contain"
				}),
				images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIndex((value) => (value - 1 + images.length) % images.length),
						className: "min-h-11 rounded-lg border border-cream px-4 text-sm font-bold text-cream",
						children: "السابقة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIndex((value) => (value + 1) % images.length),
						className: "min-h-11 rounded-lg border border-cream px-4 text-sm font-bold text-cream",
						children: "التالية"
					})]
				}) : null
			]
		}) : null
	] });
}
function ChoiceRow({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-sm font-semibold text-fg",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((option) => {
			const selected = value === option.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": selected,
				onClick: () => onChange(option.id),
				className: "min-h-11 rounded-lg px-3 text-sm font-semibold " + (selected ? "bg-ink text-cream" : "border border-line bg-cream text-fg"),
				children: option.label
			}, option.id);
		})
	})] });
}
function ProductControls({ product, titleTag = "h3" }) {
	const draft = useOrder((state) => state.drafts[product.id]) ?? emptyDraft();
	const setDraft = useOrder((state) => state.setDraft);
	const addLine = useOrder((state) => state.addLine);
	const [notice, setNotice] = (0, import_react.useState)("");
	function patch(next) {
		setDraft(product.id, next);
		setNotice("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: product.summary
				}),
				titleTag === "h1" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-extrabold leading-snug text-fg",
					children: product.name
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-lg font-bold leading-snug text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/m/$id",
						params: { id: product.id },
						className: "underline-offset-4 hover:underline",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-semibold text-gold-deep",
					children: codeCaption(product, draft.audience)
				}),
				product.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-stone",
					children: product.note
				}) : null
			] }),
			product.pair ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
				label: "الفئة",
				value: draft.audience,
				options: AUDIENCE_OPTIONS,
				onChange: (id) => patch({ audience: id })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
				label: "اللون",
				value: draft.color,
				options: SPEC_OPTIONS,
				onChange: (id) => patch({ color: id })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
				label: "المقاس",
				value: draft.size,
				options: SPEC_OPTIONS,
				onChange: (id) => patch({ size: id })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-stone",
				children: "الألوان والمقاسات في الكتالوج لسه «تُحدَّد عند الطلب». مش لازم تختارهم عشان تسأل على سعر الجملة."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-semibold text-fg",
				children: "الكمية"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "تقليل الكمية",
						onClick: () => patch({ qty: draft.qty - 1 }),
						className: "min-h-11 min-w-11 rounded-lg border border-line bg-cream text-lg font-bold text-fg",
						children: "−"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						"aria-label": "الكمية",
						value: draft.qty,
						onChange: (event) => patch({ qty: Number(event.target.value) }),
						className: "h-11 w-20 rounded-lg border border-line bg-paper text-center text-base font-semibold tabular-nums"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "زيادة الكمية",
						onClick: () => patch({ qty: draft.qty + 1 }),
						className: "min-h-11 min-w-11 rounded-lg border border-line bg-cream text-lg font-bold text-fg",
						children: "+"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-col gap-2",
				children: [notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-gold-deep",
					role: "status",
					children: notice
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-stone",
					children: "السعر: اطلب عرض سعر للجملة. مفيش رقم على الموقع."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						addLine(product.id);
						setNotice("اتضاف لطلب التسعير. لو زودت نفس التشكيلة تاني، الكمية هتتجمع.");
					},
					className: "inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-3 text-center text-sm font-bold text-ink",
					children: "أضف لطلب الجملة"
				})]
			})
		]
	});
}
function ProductCard({ product }) {
	const draft = useOrder((state) => state.drafts[product.id]) ?? emptyDraft();
	const badge = product.pair ? draft.audience === "girl" ? product.pair.girl : draft.audience === "baby" ? product.pair.baby : `${product.pair.girl} / ${product.pair.baby}` : product.code ?? "يُضاف";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-shadow flex flex-col overflow-hidden rounded-2xl border border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGallery, {
			images: product.images,
			name: product.name,
			badge
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 flex-col p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductControls, { product })
		})]
	});
}
function RootsMark({ className = "size-11" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/brand/mark.png",
		alt: "",
		width: 320,
		height: 320,
		className: `${className} object-contain`
	});
}
function WhatsAppGlyph({ className = "size-5" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.5 3.5A11 11 0 0 0 2.05 17.85L1 23l5.3-1.15A11 11 0 0 0 20.5 3.5ZM12 20.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.15.68.67-3.07-.2-.32A8.15 8.15 0 1 1 12 20.1Zm4.55-6.12c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.16-.48-.29Z" })
	});
}
function QuoteButton({ onClick, count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "inline-flex min-h-11 items-center gap-2 rounded-lg border border-gold px-3 text-sm font-bold text-gold",
		children: ["طلب الجملة", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-cream",
			children: count
		})]
	});
}
function QuoteSheet({ open, onClose }) {
	const lines = useOrder((state) => state.lines);
	const meta = useOrder((state) => state.meta);
	const updateLine = useOrder((state) => state.updateLine);
	const removeLine = useOrder((state) => state.removeLine);
	const setMeta = useOrder((state) => state.setMeta);
	const [openedWa, setOpenedWa] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	const total = lines.reduce((sum, line) => sum + line.qty, 0);
	const href = lines.length ? waLink(quoteMessage(lines, meta)) : "#wholesale";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 sm:items-center",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "quote-title",
			className: "flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-paper text-fg sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "quote-title",
						className: "text-lg font-extrabold",
						children: "طلب تسعير الجملة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-stone",
						children: lines.length ? `${lines.length} بنود · الكمية ${total}` : "لسه مفيش بنود"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "min-h-11 rounded-lg border border-line px-3 text-sm font-bold",
						children: "إغلاق"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4 overflow-y-auto px-4 py-4",
					children: [lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-stone",
						children: "اضغط «أضف لطلب الجملة» من أي موديل. اللون والمقاس مش إجباريين."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: lines.map((line) => {
							const product = getProduct(line.productId);
							if (!product) return null;
							const code = resolveCode(product, line.audience);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl border border-line p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold leading-snug",
											children: product.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-gold-deep",
											children: code ? `الكود: ${code}` : "الكود: لم يُسجَّل بعد"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeLine(line.key),
											className: "min-h-11 shrink-0 text-sm font-bold text-gold-deep",
											children: "حذف"
										})]
									}),
									product.pair ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mt-3 block text-sm font-semibold",
										children: ["الفئة", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: line.audience,
											onChange: (event) => updateLine(line.key, { audience: event.target.value }),
											className: "mt-1 h-11 w-full rounded-lg border border-line bg-cream px-2 text-base",
											children: AUDIENCE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: option.id,
												children: option.label
											}, option.id))
										})]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-semibold",
											children: ["اللون", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: line.color,
												onChange: (event) => updateLine(line.key, { color: event.target.value }),
												className: "mt-1 h-11 w-full rounded-lg border border-line bg-cream px-2 text-base",
												children: SPEC_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: option.id,
													children: option.label
												}, option.id))
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-semibold",
											children: ["المقاس", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: line.size,
												onChange: (event) => updateLine(line.key, { size: event.target.value }),
												className: "mt-1 h-11 w-full rounded-lg border border-line bg-cream px-2 text-base",
												children: SPEC_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: option.id,
													children: option.label
												}, option.id))
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold",
												children: "الكمية"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "تقليل الكمية",
												onClick: () => updateLine(line.key, { qty: line.qty - 1 }),
												className: "min-h-11 min-w-11 rounded-lg border border-line text-lg font-bold",
												children: "−"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												inputMode: "numeric",
												"aria-label": "كمية البند",
												value: line.qty,
												onChange: (event) => updateLine(line.key, { qty: Number(event.target.value) }),
												className: "h-11 w-20 rounded-lg border border-line text-center text-base font-semibold tabular-nums"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "زيادة الكمية",
												onClick: () => updateLine(line.key, { qty: line.qty + 1 }),
												className: "min-h-11 min-w-11 rounded-lg border border-line text-lg font-bold",
												children: "+"
											})
										]
									})
								]
							}, line.key);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "اسم المحل",
								value: meta.shop,
								onChange: (shop) => setMeta({ shop })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "المحافظة",
								value: meta.governorate,
								onChange: (governorate) => setMeta({ governorate })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-semibold",
								children: ["ملاحظات (اختياري)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: meta.notes,
									onChange: (event) => setMeta({ notes: event.target.value }),
									rows: 3,
									className: "mt-1 w-full rounded-lg border border-line bg-cream px-3 py-2 text-base"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href,
						target: lines.length ? "_blank" : void 0,
						rel: lines.length ? "noopener noreferrer" : void 0,
						"aria-disabled": lines.length === 0,
						onClick: (event) => {
							if (!lines.length) {
								event.preventDefault();
								return;
							}
							setOpenedWa(true);
						},
						className: "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-base font-bold " + (lines.length ? "bg-gold text-ink" : "bg-cream-2 text-stone"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppGlyph, { className: "size-5" }), "أرسل طلب التسعير على واتساب"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-xs leading-relaxed text-stone",
						children: openedWa ? "واتساب اتفتح عندك. الرسالة لسه متبعتتش غير لما تدوس إرسال من الموبايل." : "فتح واتساب مش معناه إن المصنع استلم الطلب."
					})]
				})
			]
		})
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-sm font-semibold",
		children: [
			label,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-normal text-stone",
				children: "(اختياري)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: "mt-1 h-11 w-full rounded-lg border border-line bg-cream px-3 text-base"
			})
		]
	});
}
//#endregion
export { QuoteSheet as a, emptyDraft as c, QuoteButton as i, rehydrateOrder as l, ProductControls as n, RootsMark as o, ProductGallery as r, WhatsAppGlyph as s, ProductCard as t, useOrder as u };
