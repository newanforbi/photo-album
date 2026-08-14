import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={`container ${styles.page}`}>
      <PageHeader eyebrow="404" title="Page not found">
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      </PageHeader>
      <p>
        <Link href="/" className="button">
          Return home
        </Link>
      </p>
    </div>
  );
}
