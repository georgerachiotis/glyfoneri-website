import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "../data/photos";
import { useLocale } from "../lib/i18n";
import { assetUrl } from "../lib/assets";
export default function GalleryGrid({ items }: { items: Photo[] }) {
  const { lang, t } = useLocale();
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const close = () => {
    setSelected(null);
    opener.current?.focus();
  };
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  const move = (by: number) =>
    setSelected((current) =>
      current === null ? null : (current + by + items.length) % items.length,
    );
  return (
    <>
      <div className="gallery-grid">
        {items.map((photo, index) => (
          <button
            key={photo.id}
            aria-label={`${t.image} ${index + 1}: ${photo.alt[lang]}`}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setSelected(index);
            }}
          >
            <img
              src={assetUrl(photo.src)}
              alt={photo.alt[lang]}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 600px) 100vw, 50vw"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={t.galleryTitle}
        onCancel={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        <button
          className="icon-button dialog-close"
          onClick={close}
          aria-label={t.close}
        >
          <X />
        </button>
        {selected !== null && (
          <>
            <img
              src={assetUrl(items[selected].src)}
              alt={items[selected].alt[lang]}
            />
            <div className="lightbox-controls">
              <button
                className="icon-button"
                aria-label={t.previous}
                onClick={() => move(-1)}
              >
                <ChevronLeft />
              </button>
              <p aria-live="polite">
                {selected + 1} / {items.length}
                <br />
                {items[selected].alt[lang]}
              </p>
              <button
                className="icon-button"
                aria-label={t.next}
                onClick={() => move(1)}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
