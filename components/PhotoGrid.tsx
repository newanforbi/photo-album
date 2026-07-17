"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/photos";
import Lightbox from "./Lightbox";
import styles from "./PhotoGrid.module.css";

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, index: number) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    triggerRef.current = e.currentTarget;
    setOpenIndex(index);
  }

  function handleClose() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  return (
    <div className={styles.grid}>
      {photos.map((photo, index) => (
        <Link
          key={`${photo.date}-${photo.slug}`}
          href={`/photo/${photo.date}/${photo.slug}`}
          className={styles.card}
          onClick={(e) => handleClick(e, index)}
        >
          <div className={styles.imageWrap}>
            {photo.width > 0 && photo.height > 0 ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw"
                className={styles.image}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo.src} alt={photo.alt} className={styles.image} />
            )}
          </div>
          <p className={styles.caption}>{photo.title}</p>
        </Link>
      ))}
      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={handleClose}
          onPrev={() => setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() =>
            setOpenIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i))
          }
        />
      )}
    </div>
  );
}
