import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PrevNextNav.module.css";

export default function PrevNextNav({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: {
  prevHref?: string | null;
  prevLabel?: ReactNode;
  nextHref?: string | null;
  nextLabel?: ReactNode;
}) {
  return (
    <nav className={styles.nav}>
      {prevHref ? (
        <Link href={prevHref} className={styles.link}>
          {prevLabel}
        </Link>
      ) : (
        <span />
      )}
      {nextHref ? (
        <Link href={nextHref} className={styles.link}>
          {nextLabel}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
