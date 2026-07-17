import Link from "next/link";
import { PERSON_NAME, PERSON_NAME_ALTERNATE, SAME_AS_LINKS } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} {PERSON_NAME} ({PERSON_NAME_ALTERNATE})
        {" — "}
        <Link href="/copyright">Copyright &amp; Licensing</Link>
      </p>
      {SAME_AS_LINKS.length > 0 && (
        <div className={styles.links}>
          {SAME_AS_LINKS.map((href) => (
            <a key={href} href={href} rel="me noopener noreferrer" target="_blank">
              {new URL(href).hostname.replace(/^www\./, "")}
            </a>
          ))}
        </div>
      )}
    </footer>
  );
}
