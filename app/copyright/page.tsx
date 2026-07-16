import type { Metadata } from "next";
import { PERSON_NAME_FULL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Copyright & Licensing",
  description: `Copyright and licensing information for photos and videos on this site, owned by ${PERSON_NAME_FULL}.`,
  alternates: { canonical: "/copyright" },
};

export default function CopyrightPage() {
  return (
    <>
      <h1>Copyright &amp; Licensing</h1>
      <p>
        All photos on this site are &copy; {PERSON_NAME_FULL}, all rights
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
    </>
  );
}
