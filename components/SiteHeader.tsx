import Link from "next/link";
import { PERSON_NAME_FULL } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        {PERSON_NAME_FULL}
      </Link>
      <nav className={styles.nav}>
        <Link href="/album">Album</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
