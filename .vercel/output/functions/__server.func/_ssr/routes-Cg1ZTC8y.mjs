import { i as __toESM } from "../_runtime.mjs";
import { _ as waIndividual, a as FACTORY_ADDRESS, c as SITE_URL, d as WA_PHONE, i as CATALOG_PDF, m as productMatches, n as AD_VIDEO, o as FILTERS, s as PRODUCTS, t as AD_POSTER, u as WA_DISPLAY, v as waIntro } from "./catalog-Cm385f5d.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Factory, i as Gem, n as Scissors, r as MessagesSquare } from "../_libs/lucide-react.mjs";
import { a as QuoteSheet, i as QuoteButton, l as rehydrateOrder, o as RootsMark, s as WhatsAppGlyph, t as ProductCard, u as useOrder } from "./quote-sheet-CQ2W8Ewf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cg1ZTC8y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEATURES = [
	{
		icon: Factory,
		title: "تصنيع مباشر",
		text: "من المصنع للتاجر والمحل، من غير وسيط في التسعير."
	},
	{
		icon: Gem,
		title: "خامات التشكيلة",
		text: "فرو، قطيفة، لوفر شتوي، وبوت فرو — حسب الموديل الظاهر في الكتالوج."
	},
	{
		icon: Scissors,
		title: "تقفيل المصنع",
		text: "التقفيل من شغل المصنع. أي تفصيلة زيادة تتأكد مع عرض السعر، من غير ضمان مكتوب هنا."
	},
	{
		icon: MessagesSquare,
		title: "عرض سعر للجملة",
		text: "مفيش أسعار على الموقع. ابعت الموديلات والكميات ونرجّع لك عرض السعر."
	}
];
var NAV = [
	{
		href: "#catalog",
		label: "الكتالوج"
	},
	{
		href: "#wholesale",
		label: "الجملة"
	},
	{
		href: "#ad",
		label: "الإعلان"
	},
	{
		href: "#factory",
		label: "التواصل"
	}
];
var BUSINESS = {
	"@context": "https://schema.org",
	"@type": ["ShoeStore", "LocalBusiness"],
	name: "ROOTS SLIPPERS",
	alternateName: "روتس سليبرز",
	url: SITE_URL,
	image: `${SITE_URL}/brand/logo.png`,
	telephone: `+${WA_PHONE}`,
	address: {
		"@type": "PostalAddress",
		streetAddress: "شارع الفرن العربي - الوحدة العربية",
		addressLocality: "شبرا الخيمة",
		addressCountry: "EG"
	}
};
function countLabel(n) {
	if (n === 0) return "مفيش نتائج";
	if (n === 1) return "موديل واحد";
	if (n === 2) return "موديلان";
	return `${n} موديلات`;
}
function Home() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [quoteOpen, setQuoteOpen] = (0, import_react.useState)(false);
	const lineCount = useOrder((state) => state.lines.length);
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		rehydrateOrder();
	}, []);
	const visible = (0, import_react.useMemo)(() => PRODUCTS.filter((item) => (filter === "all" || item.category === filter) && productMatches(item, query)), [filter, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "min-h-screen bg-cream text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(BUSINESS) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-gold/40 bg-ink text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "flex items-center gap-2.5 text-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootsMark, { className: "size-11 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-2xl leading-none tracking-wide",
								children: "ROOTS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-xs tracking-widest text-cream",
								children: "SLIPPERS"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "chip-row order-3 flex w-full min-w-0 max-w-full gap-4 overflow-x-auto md:order-none md:w-auto",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.href,
								className: "inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-cream",
								children: item.label
							}, item.href))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-ink text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid min-w-0 max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold tracking-wide text-gold",
							children: "ROOTS SLIPPERS · SHOP & FACTORY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-4xl font-extrabold leading-tight text-cream md:text-5xl",
							children: "روتس.. الأصل بيفرق في كل خطوة"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-base leading-relaxed text-cream/90",
							children: "مصنع شباشب وسابوه للتجار والمحلات. تصنيع مباشر، وتشكيلة الموسم قدامك عشان تجهّز استفسار تسعير جملة على واتساب. القطاعي مش مسار البيع الأساسي."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#catalog",
								className: "inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-5 text-center text-base font-bold text-ink",
								children: "تصفح التشكيلة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQuoteOpen(true),
								className: "inline-flex min-h-12 items-center justify-center rounded-lg border border-cream px-5 text-center text-base font-bold text-cream",
								children: "طلب تسعير الجملة"
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						className: "flex min-w-0 justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/logo.png",
							alt: "شعار ROOTS SLIPPERS SHOP & FACTORY",
							width: 480,
							height: 850,
							className: "h-auto max-h-96 w-auto max-w-full"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "features",
				className: "mx-auto max-w-6xl px-4 py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold text-fg",
						children: "ليه روتس للتجار؟"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-stone",
						children: "تصنيع مباشر، وتشكيلة متنوعة، والتسعير بيتأكد على واتساب."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: FEATURES.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-line bg-paper p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, {
									className: "size-6 text-gold-deep",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 text-base font-bold leading-snug",
									children: feature.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-stone",
									children: feature.text
								})
							]
						}, feature.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "catalog",
				className: "border-t border-line bg-cream-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-extrabold",
								children: "كتالوج الموسم"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-2xl text-stone",
								children: "دور بالاسم أو الكود. اللون والمقاس اختياريين لو لسه بتسأل على سعر الجملة."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-gold-deep",
								children: countLabel(visible.length)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-5 block text-sm font-semibold",
							children: ["بحث", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "اسم الموديل أو الكود",
								className: "mt-2 h-12 w-full rounded-lg border border-line bg-paper px-3 text-base"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "chip-row mt-4 flex min-w-0 max-w-full gap-2 overflow-x-auto",
							role: "group",
							"aria-label": "تصفية الأقسام",
							children: FILTERS.map((item) => {
								const count = PRODUCTS.filter((product) => (item.id === "all" || product.category === item.id) && productMatches(product, query)).length;
								const active = filter === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": active,
									onClick: () => setFilter(item.id),
									className: "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-bold " + (active ? "bg-ink text-cream" : "border border-line bg-paper text-fg"),
									children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: active ? "text-gold" : "text-stone",
										children: count
									})]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-stone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: waIndividual(),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "font-semibold text-gold-deep underline-offset-4 hover:underline",
								children: "للاستفسارات الفردية، تواصل معنا على الخاص"
							})
						}),
						visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-base font-semibold",
							children: "مفيش موديل مطابق للبحث ده."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3",
							children: visible.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product }) }, product.id))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "wholesale",
				className: "bg-ink text-cream",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-gold",
							children: "للتجار والمحلات"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-extrabold",
							children: "اطلب عرض سعر للجملة"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-cream/90",
							children: "مفيش سعر ثابت على الموقع. جمّع الموديلات والكميات، وابعت طلب التسعير على واتساب. اللون والمقاس تقدر تسيبهم «يُحدّد لاحقًا» أو تختار تشكيلة مختلطة."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-gold/40 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3 text-sm leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "تصنيع مباشر من المصنع." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "نفس أسماء وأكواد كتالوج الموسم." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الشحن والتوافر بيتأكدوا مع عرض السعر، من غير مدة أو تكلفة مكتوبين هنا." })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setQuoteOpen(true),
							className: "mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 text-base font-bold text-ink",
							children: "افتح طلب التسعير"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "ad",
				className: "mx-auto max-w-6xl px-4 py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold",
						children: "إعلان الموسم والكتالوج"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-stone",
						children: "الإعلان مش بيشتغل لوحده. اضغط تشغيل لما تحب."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid min-w-0 items-start gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: videoRef,
								controls: true,
								playsInline: true,
								preload: "metadata",
								poster: AD_POSTER,
								className: "max-h-[70vh] w-full max-w-full rounded-2xl bg-ink object-contain",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									src: AD_VIDEO,
									type: "video/mp4"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void videoRef.current?.play(),
								className: "mt-3 inline-flex min-h-12 items-center justify-center rounded-lg bg-gold px-4 text-sm font-bold text-ink",
								children: "تشغيل الإعلان"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-line bg-paper p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold",
									children: "ملف الكتالوج"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-stone",
									children: "نفس تشكيلة الموقع. الأسعار في الملف لسه فاضية، والعرض بيتحدد على واتساب."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: CATALOG_PDF,
									download: true,
									className: "mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-4 text-sm font-bold text-cream",
									children: "تحميل كتالوج الموسم PDF"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				id: "factory",
				className: "border-t border-gold/30 bg-ink text-cream",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/logo.png",
							alt: "شعار ROOTS SLIPPERS",
							width: 480,
							height: 850,
							className: "h-40 w-auto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-cream/85",
							children: "مصنع شباشب وسابوه. الجملة هي مسار الطلب الأساسي."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-gold",
							children: "عنوان المصنع"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg font-semibold leading-relaxed",
							children: FACTORY_ADDRESS
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base font-bold text-gold",
								children: "تواصل"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:+${WA_PHONE}`,
								className: "mt-3 block text-lg font-semibold tabular-nums",
								children: WA_DISPLAY
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: waIntro(),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-gold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppGlyph, { className: "size-5" }), "افتح واتساب"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: waIndividual(),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-2 block text-sm text-cream/80",
								children: "للاستفسارات الفردية، تواصل معنا على الخاص"
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-gold/20 px-4 py-4 text-center text-xs text-cream/70",
					children: "ROOTS SLIPPERS · شبرا الخيمة"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteSheet, {
				open: quoteOpen,
				onClose: () => setQuoteOpen(false)
			})
		]
	});
}
//#endregion
export { Home as component };
