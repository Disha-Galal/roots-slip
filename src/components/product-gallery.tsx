import { useEffect, useState } from "react";
import type { ProductImage } from "@/lib/catalog";

export function ProductGallery({
  images,
  name,
  badge,
  eager = false,
}: {
  images: ProductImage[];
  name: string;
  badge: string;
  eager?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = images[Math.min(index, images.length - 1)] ?? images[0];

  useEffect(() => {
    if (!zoom) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoom(false);
      if (event.key === "ArrowLeft") setIndex((value) => (value + 1) % images.length);
      if (event.key === "ArrowRight") setIndex((value) => (value - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, images.length]);

  if (!current) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="relative block aspect-square w-full bg-cream-2"
      >
        <img
          src={current.src}
          alt={current.alt}
          width={960}
          height={960}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-contain"
        />
        <span className="absolute bottom-3 start-3 rounded-md bg-ink px-2.5 py-1 text-sm font-bold text-gold">
          {badge}
        </span>
      </button>
      {images.length > 1 ? (
        <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto p-3">
          {images.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              aria-label={`صورة ${imageIndex + 1} من ${name}`}
              aria-pressed={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
              className={
                "size-16 shrink-0 overflow-hidden rounded-lg border bg-cream-2 " +
                (imageIndex === index ? "border-gold-deep ring-2 ring-gold-deep" : "border-line")
              }
            >
              <img src={image.src} alt="" className="size-full object-contain" />
            </button>
          ))}
        </div>
      ) : null}
      {zoom ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-cream">{name}</p>
            <button
              type="button"
              onClick={() => setZoom(false)}
              className="min-h-11 rounded-lg bg-gold px-4 text-sm font-bold text-ink"
            >
              إغلاق
            </button>
          </div>
          <img
            src={current.src}
            alt={current.alt}
            className="m-auto max-h-[70vh] w-full object-contain"
          />
          {images.length > 1 ? (
            <div className="mt-3 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)}
                className="min-h-11 rounded-lg border border-cream px-4 text-sm font-bold text-cream"
              >
                السابقة
              </button>
              <button
                type="button"
                onClick={() => setIndex((value) => (value + 1) % images.length)}
                className="min-h-11 rounded-lg border border-cream px-4 text-sm font-bold text-cream"
              >
                التالية
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}