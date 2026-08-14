import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className={styles.header}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {children ? <div className={styles.lede}>{children}</div> : null}
    </header>
  );
}
