import styles from "./TagList.module.css";

export default function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className={styles.list}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
