import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { PERSON_NAME } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Copyright & Licensing",
  description: `Copyright and licensing information for photos and videos on this site, owned by ${PERSON_NAME}.`,
  alternates: { canonical: "/copyright" },
};

export default function CopyrightPage() {
  return (
    <div className={`container ${styles.page}`}>
      <PageHeader eyebrow="Legal" title="Copyright & Licensing" />
      <p>
        All photos on this site are &copy; {PERSON_NAME}, all rights
        reserved, unless otherwise noted. No license is granted for reuse,
        reproduction, or redistribution of these images without prior
        written permission from the copyright holder.
      </p>
      <p>
        Videos featured on this site remain the property of their
        respective sources and are linked to YouTube, where they were
        originally published.
      </p>
      <p>
        These images are not currently available for licensing or
        commercial reuse.
      </p>
    </div>
  );
}
