"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/lib/photos";
import styles from "./Lightbox.module.css";

export default function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, [index]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={photo.title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {photo.width > 0 && photo.height > 0 ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className={styles.image}
            sizes="100vw"
            priority
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.alt} className={styles.image} />
        )}
        <div className={styles.caption}>
          <p className={styles.title}>{photo.title}</p>
          <p className={styles.captionText}>{photo.caption}</p>
          <Link
            href={`/photo/${photo.date}/${photo.slug}`}
            className={styles.detailsLink}
          >
            View full details &rarr;
          </Link>
        </div>
        {hasPrev && (
          <button
            type="button"
            className={styles.prev}
            onClick={onPrev}
            aria-label="Previous photo"
          >
            &lsaquo;
          </button>
        )}
        {hasNext && (
          <button
            type="button"
            className={styles.next}
            onClick={onNext}
            aria-label="Next photo"
          >
            &rsaquo;
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
