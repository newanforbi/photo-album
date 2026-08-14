import Link from "next/link";
import { MUSIC_LINKS, PERSON_NAME, PERSON_TAGLINE, SAME_AS_LINKS } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{PERSON_NAME}</p>
          <p className={styles.tagline}>{PERSON_TAGLINE}</p>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/album">Album</Link>
          <Link href="/music">Music</Link>
          <Link href="/copyright">Copyright</Link>
        </nav>
        {SAME_AS_LINKS.length > 0 && (
          <div className={styles.links}>
            {MUSIC_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                rel="me noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className={`container ${styles.legal}`}>
        <p>
          &copy; {new Date().getFullYear()} {PERSON_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
