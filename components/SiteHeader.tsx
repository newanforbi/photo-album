"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSON_NAME } from "@/lib/site";
import styles from "./SiteHeader.module.css";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/album", label: "Album" },
  { href: "/music", label: "Music" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>BN</span>
          <span className={styles.brandName}>{PERSON_NAME}</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? styles.active : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
