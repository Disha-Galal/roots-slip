import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = images[Math.min(index, images.length - 1)] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <button
        type="button"
        ref={openRef}
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
        {badge ? (
          <span className="absolute bottom-3 start-3 rounded-md bg-ink px-2.5 py-1 text-sm font-bold text-gold">
            {badge}
          </span>
        ) : null}
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
      <Dialog.Root open={zoom} onOpenChange={setZoom}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/95" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col p-4 outline-none"
            aria-describedby="zoom-desc"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              closeRef.current?.focus();
            }}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              openRef.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") setIndex((value) => (value + 1) % images.length);
              if (event.key === "ArrowRight") setIndex((value) => (value - 1 + images.length) % images.length);
            }}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <Dialog.Title className="text-sm font-semibold text-cream">{name}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  ref={closeRef}
                  type="button"
                  className="min-h-11 rounded-lg bg-gold px-4 text-sm font-bold text-ink"
                >
                  إغلاق
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description id="zoom-desc" className="sr-only">
              تكبير صورة {name}
            </Dialog.Description>
            <img src={current.src} alt={current.alt} className="m-auto max-h-[70vh] w-full object-contain" />
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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}