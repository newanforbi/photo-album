"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSON_NAME } from "@/lib/site";
import styles from "./SiteHeader.module.css";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        {PERSON_NAME}
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/album"
          className={isActive(pathname, "/album") ? styles.active : undefined}
          aria-current={isActive(pathname, "/album") ? "page" : undefined}
        >
          Album
        </Link>
        <Link
          href="/music"
          className={isActive(pathname, "/music") ? styles.active : undefined}
          aria-current={isActive(pathname, "/music") ? "page" : undefined}
        >
          Music
        </Link>
        <Link
          href="/about"
          className={isActive(pathname, "/about") ? styles.active : undefined}
          aria-current={isActive(pathname, "/about") ? "page" : undefined}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
