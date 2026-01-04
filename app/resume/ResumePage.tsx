import styles from "./resume.module.css";

export default function ResumePage() {
  return (
    <section className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.name}>ATQA MUNZIR</h1>
        <p className={styles.role}>Game Programmer</p>
        <p className={styles.contact}>
          atqamz@gmail.com | linkedin.com/in/atqamunzir | bit.ly/atqamunzir_portfolio | github.com/atqamz
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.summary}>
          A skilled Coder proficient in C#, Unity, C++, Unreal Engine. With hands-on experience in both game programming and full-stack backend development. Demonstrated ability to lead teams and deliver critical in-game systems, such as cross-platform payment utilities and online services. Experienced in building and maintaining CI/CD pipelines to streamline development. Eager to contribute technical expertise and a passion for gaming to a forward-thinking team.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>YES2GAMES</p>
              <p className={styles.entryRole}>Junior Game Programmer - Full-time (Remote)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Singapore</p>
              <p className={styles.entryDate}>Jul 2025 - Present</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>I code stuff.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Timedoor Academy</p>
              <p className={styles.entryRole}>Programming Teacher - Part-time (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>May 2025 - Present</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>
              Delivered instruction using an adaptive learning methodology to small groups of 1-5 students in
              60-to-90-minute sessions.
            </li>
            <li>
              Instructed students on a wide range of programming topics from basic to advanced levels, including
              Scratch, Scratch Junior, Construct, Roblox Studio, Python, PyGame, Web Development (HTML, CSS, JS), and
              MIT App Inventor.
            </li>
            <li>
              Provided detailed progress reports to parents after each learning session to ensure clear communication
              and tracking of student development.
            </li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>HAGE Games</p>
              <p className={styles.entryRole}>Cheerleader - Part-time (Remote)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Jan 2025 - Present</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>I cheerlead stuff.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Sepay Studio</p>
              <p className={styles.entryRole}>Game Programmer - Part-time (Remote)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Feb 2024 - Sep 2024</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>
              Developed and integrated features in Unreal Engine based on pre-defined designs, with a focus on
              backend operations.
            </li>
            <li>
              Worked on cross-platform payment utilities using a one-gate system, ensuring smooth backend integration
              with various third-party services.
            </li>
            <li>
              Designed and implemented CI/CD pipelines across Unreal Engine 4, Native Android, Native iOS, and Unity
              platforms, streamlining the developer workflow.
            </li>
            <li>
              Created comprehensive documentation for implemented features, detailing technical procedures for
              future development and maintenance.
            </li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Miracle Gates Entertainment</p>
              <p className={styles.entryRole}>Junior Game Programmer - Full-time (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Bali, Indonesia</p>
              <p className={styles.entryDate}>Feb 2024 - May 2024</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>
              Designed and integrated backend systems used as online services within the game, such as referral
              codes, matchmaking, chat systems, gacha mechanics, and more.
            </li>
            <li>
              Maintained and continually added new content to the game, ensuring seamless integration with existing
              content.
            </li>
            <li>
              Iterated on previously developed features and optimized backend-related functionality to enhance
              performance and efficiency.
            </li>
            <li>
              Created comprehensive documentation detailing completed, ongoing, and planned features to support team
              coordination.
            </li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Gameloft Indonesia</p>
              <p className={styles.entryRole}>C++ Programmer Trainee - Internship (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Yogyakarta, Indonesia</p>
              <p className={styles.entryDate}>Dec 2023 - Jan 2024</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>
              Completed tasks ranging from basic to advanced levels in C++, utilizing references and programming
              techniques taught during the internship.
            </li>
            <li>Learned the company's workflow and organizational culture.</li>
            <li>
              Studied technical aspects used by the development team and implemented acquired knowledge into
              assigned tasks.
            </li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Lion Core Studio</p>
              <p className={styles.entryRole}>Junior Game Programmer - Part-time (Remote)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Yogyakarta, Indonesia</p>
              <p className={styles.entryDate}>Sep 2023 - Dec 2023</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Designed and implemented an existing game design in collaboration with a senior programmer.</li>
            <li>Collaborated with game artists to integrate technical art into the game.</li>
            <li>Created UI related to the designed dialog system mechanics until it functioned seamlessly.</li>
            <li>Designed algorithms and implemented enemy AI and boss characters.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Electronic Engineering Polytechnic Institute of Surabaya (EEPIS)</p>
              <p className={styles.entryRole}>Lecturer's Teaching Assistant - Part-time (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Jul 2023 - Dec 2023</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Developed a comprehensive 16-week learning curriculum by aligning weekly topics with assignments.</li>
            <li>Delivered engaging interactions while adhering to the curriculum.</li>
            <li>Assessed and provided constructive feedback on student assignments.</li>
            <li>Generated weekly teaching reports to ensure alignment between activities and the curriculum.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Game for Education and Cultural Heritage - EEPIS Research Group</p>
              <p className={styles.entryRole}>Game Director - Full-time (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Jul 2023 - Aug 2023</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Led and directed the development direction of a game themed around traditional food stalls.</li>
            <li>Managed a team of 14 across Programmers, Artists, Game Designers, and Social Media Specialists.</li>
            <li>Ensured clarity and updates in documentation from each division of the team.</li>
            <li>Resolved and discussed issues related to the overall development.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Game for Education and Cultural Heritage - EEPIS Research Group</p>
              <p className={styles.entryRole}>Lead Game Programmer - Full-time (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Jan 2023 - Feb 2023</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Led a technical programming team of three to design and implement an existing game design.</li>
            <li>Coordinated and collaborated with other roles within the project.</li>
            <li>Developed development strategies and team workflows using Technical Design Documents.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Al-Falah Elementary School</p>
              <p className={styles.entryRole}>Programming Teacher - Part-time (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Jul 2022 - Aug 2022</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Instructed 20 students on the basics of programming using the Scratch application.</li>
            <li>Reviewed and evaluated the work of each student.</li>
            <li>Conducted fun sessions to engage students and spark interest in the topics being covered.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Sepay Studio</p>
              <p className={styles.entryRole}>Programmer - Part-time (Remote)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Aug 2021 - Jul 2022</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Implemented the design of a backend application for game development needs.</li>
            <li>Executed the design of a website from the provided design into a fully functional website.</li>
          </ul>
        </article>

        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Webmedia Training Center</p>
              <p className={styles.entryRole}>Web Developer Trainee - Internship (On-site)</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Medan, Indonesia</p>
              <p className={styles.entryDate}>Aug 2019 - Nov 2019</p>
            </div>
          </div>
          <ul className={styles.list}>
            <li>Learned and designed landing page websites using HTML, CSS, and JavaScript.</li>
            <li>Created internship report documents for school reporting purposes and designed websites.</li>
          </ul>
        </article>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Electronic Engineering Polytechnic Institute of Surabaya (EEPIS)</p>
              <p className={styles.entryRole}>Bachelor of Applied Science - BASc, Game Technology</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Aug 2021 - Aug 2025</p>
            </div>
          </div>
        </article>
        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>Telkom Vocational High School</p>
              <p className={styles.entryRole}>High School Diploma, Software Engineering</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Medan, Indonesia</p>
              <p className={styles.entryDate}>Aug 2018 - Aug 2021</p>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Organization</h2>
        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>EEPIS Semi-Autonomous Body of Game Technology Students' Association</p>
              <p className={styles.entryRole}>Head of Research and Technology Division</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Aug 2023 - Aug 2024</p>
            </div>
          </div>
        </article>
        <article className={styles.entry}>
          <div className={styles.entryHeader}>
            <div>
              <p className={styles.entryOrg}>EEPIS Semi-Autonomous Body of Game Technology Students' Association</p>
              <p className={styles.entryRole}>Staff of Research and Technology Division</p>
            </div>
            <div className={styles.entryMeta}>
              <p className={styles.entryLocation}>Surabaya, Indonesia</p>
              <p className={styles.entryDate}>Aug 2022 - Aug 2023</p>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
