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
                <p className={styles.entryOrg}>{entry.org}</p>
                <p className={styles.entryLocation}>{entry.location}</p>
              </div>
              <div
                className={styles.roles}
                data-multi={entry.roles.length > 1 ? "" : undefined}
              >
                {entry.roles.map((role, j) => (
                  <div
                    key={`${role.title}-${j}`}
                    className={styles.roleBlock}
                    data-current={j === 0 ? "" : undefined}
                  >
                    <div className={styles.roleHeader}>
                      <p className={styles.roleTitle}>{role.title}</p>
                      <p className={styles.roleDate}>{role.date}</p>
                    </div>
                    {role.items && role.items.length > 0 && (
                      <ul className={styles.list}>
                        {role.items.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      ))}
    </section>
  );
}
