import type { ResumeData } from "./types";
import styles from "./resume.module.css";

export default function ResumeRenderer({ data }: { data: ResumeData }) {
  return (
    <section className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.role}>{data.role}</p>
        <p className={styles.contact}>
          {data.contact.map((item, i) => (
            <span key={item.href}>
              {i > 0 && <span className={styles.contactSep}> | </span>}
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </span>
          ))}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.summary}>{data.summary}</p>
      </section>

      {data.sections.map((section) => (
        <section key={section.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          {section.entries.map((entry, i) => (
            <article key={`${entry.org}-${i}`} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <p className={styles.entryOrg}>{entry.org}</p>
                  <p className={styles.entryRole}>{entry.role}</p>
                </div>
                <div className={styles.entryMeta}>
                  <p className={styles.entryLocation}>{entry.location}</p>
                  <p className={styles.entryDate}>{entry.date}</p>
                </div>
              </div>
              {entry.items && entry.items.length > 0 && (
                <ul className={styles.list}>
                  {entry.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      ))}
    </section>
  );
}
