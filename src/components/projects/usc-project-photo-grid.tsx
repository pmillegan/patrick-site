"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type UscPhoto = {
  src: string;
  alt: string;
  label: string;
};

type UscProjectPhotoGridProps = {
  photos: UscPhoto[];
};

export default function UscProjectPhotoGrid({ photos }: UscProjectPhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<UscPhoto | null>(null);

  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto]);

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5">
        {photos.map((photo) => (
          <button
            key={`${photo.src}-${photo.label}`}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            className="relative aspect-[16/10] cursor-pointer overflow-hidden rounded-lg border border-zinc-200 text-left transition hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <Image src={photo.src} alt={photo.alt} fill className="object-cover object-center" sizes="(max-width: 1023px) 45vw, 22vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-x-2 bottom-2">
              <p className="text-xs font-semibold leading-4 text-white">{photo.label}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPhoto.label} photo modal`}
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg font-semibold text-white transition hover:bg-black/85"
              aria-label="Close image modal"
            >
              ×
            </button>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-700 bg-black">
              <Image src={selectedPhoto.src} alt={selectedPhoto.alt} fill className="object-contain" sizes="90vw" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
