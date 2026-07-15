import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <p>
        <Link href="/">Return home</Link>
      </p>
    </>
  );
}
