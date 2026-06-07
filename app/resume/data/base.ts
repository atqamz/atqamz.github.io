import type { ResumeData } from "../types";

const base: ResumeData = {
  name: "ATQA MUNZIR",
  role: "Coder",
  contact: [
    { label: "atqamz@gmail.com", href: "mailto:atqamz@gmail.com" },
    { label: "linkedin.com/in/atqamunzir", href: "https://linkedin.com/in/atqamunzir" },
    { label: "github.com/atqamz", href: "https://github.com/atqamz" },
  ],
  summary:
    "Coder with experience shipping titles across mobile and web platforms using Unity and Unreal Engine. Specializes in online infrastructure and platform integrations: real-time multiplayer backends in Go, GitOps CI/CD, and Infrastructure as Code across multiple data centers. Comfortable across the full stack, from in-game systems and platform SDKs to DevSecOps and production observability. Proven ability to lead small teams and deliver end-to-end.",
  sections: [
    {
      title: "Experience",
      entries: [
        {
          org: "YES2GAMES",
          location: "Singapore",
          roles: [
            {
              title: "Senior Programmer - Full-time (Remote)",
              date: "May 2026 - Present",
              items: [
                "Lead online and infrastructure engineering for a cross-platform racing title, scaling its backend from a single barebone server to fully reproducible Infrastructure as Code across two data centers.",
                "Migrated all deployments from manual SSH and ad-hoc scripts to fully automated GitOps CI/CD with GitHub Actions, rootless Podman/Quadlet containers, SOPS-encrypted secrets, and health-checked auto-rollback.",
                "Stood up production observability with Grafana Cloud (metrics, logs, blackbox probes) and alerting, plus OpenTofu-provisioned VMs and Cloudflare DNS.",
                "Re-architected online modules into scalable services (Go multiplayer server, backend API, IAP validation, management dashboard) and brought online support to every shipping platform.",
              ],
            },
            {
              title: "Junior Programmer - Full-time (Remote)",
              date: "Jul 2025 - Apr 2026",
              items: [
                "Ported a cross-platform racing title to web/H5 platforms (Poki, Yandex Games, Azerion, Playgama, YouTube Playables) and mobile (Google Play; App Store in progress), meeting each platform's certification and SDK requirements.",
                "Integrated monetization, analytics, and platform SDKs across build profiles for web and mobile in Unity 6.",
                "Set up CI/CD pipelines, automated tests, and DevSecOps practices, replacing manual builds and deployments.",
                "Modernized client UIs to match competing titles and refactored unstructured online code into maintainable, scalable modules.",
              ],
            },
          ],
        },
        {
          org: "BlankOn Linux",
          location: "Indonesia",
          roles: [
            {
              title: "Open Source Contributor (Remote)",
              date: "Dec 2025 - Present",
              items: [
                "Contribute to the build and packaging toolchain of an Indonesian Linux distribution, including the distributed build farm, APT repository tooling, and live ISO builder.",
                "Help modernize project infrastructure toward GitOps on a bare-metal Proxmox cluster, with containerization and Infrastructure as Code.",
              ],
            },
          ],
        },
        {
          org: "Timedoor Academy",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Programming Teacher - Part-time (On-site)",
              date: "May 2025 - Present",
              items: [
                "Delivered instruction using an adaptive learning methodology to small groups of 1-5 students in 60-to-90-minute sessions.",
                "Instructed students on a wide range of programming topics from basic to advanced levels, including Scratch, Scratch Junior, Construct, Roblox Studio, Python, PyGame, Web Development (HTML, CSS, JS), and MIT App Inventor.",
                "Provided detailed progress reports to parents after each learning session to ensure clear communication and tracking of student development.",
              ],
            },
          ],
        },
        {
          org: "HAGE Games",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Cheerleader - Part-time (Remote)",
              date: "Jan 2025 - Present",
              items: [
                "Mentor and advise student engineering teams within a university game-technology research group.",
                "Provide technical direction and architecture/code review across their game and infrastructure projects.",
              ],
            },
          ],
        },
        {
          org: "Sepay Studio",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Game Programmer - Part-time (Remote)",
              date: "Feb 2024 - Sep 2024",
              items: [
                "Developed and integrated features in Unreal Engine based on pre-defined designs, with a focus on backend operations.",
                "Worked on cross-platform payment utilities using a one-gate system, ensuring smooth backend integration with various third-party services.",
                "Designed and implemented CI/CD pipelines across Unreal Engine 4, Native Android, Native iOS, and Unity platforms, streamlining the developer workflow.",
                "Created comprehensive documentation for implemented features, detailing technical procedures for future development and maintenance.",
              ],
            },
          ],
        },
        {
          org: "Miracle Gates Entertainment",
          location: "Bali, Indonesia",
          roles: [
            {
              title: "Junior Game Programmer - Full-time (On-site)",
              date: "Feb 2024 - May 2024",
              items: [
                "Designed and integrated backend systems used as online services within the game, such as referral codes, matchmaking, chat systems, gacha mechanics, and more.",
                "Maintained and continually added new content to the game, ensuring seamless integration with existing content.",
                "Iterated on previously developed features and optimized backend-related functionality to enhance performance and efficiency.",
                "Created comprehensive documentation detailing completed, ongoing, and planned features to support team coordination.",
              ],
            },
          ],
        },
        {
          org: "Gameloft Indonesia",
          location: "Yogyakarta, Indonesia",
          roles: [
            {
              title: "C++ Programmer Trainee - Internship (On-site)",
              date: "Dec 2023 - Jan 2024",
              items: [
                "Completed tasks ranging from basic to advanced levels in C++, utilizing references and programming techniques taught during the internship.",
                "Learned the company's workflow and organizational culture.",
                "Studied technical aspects used by the development team and implemented acquired knowledge into assigned tasks.",
              ],
            },
          ],
        },
        {
          org: "Lion Core Studio",
          location: "Yogyakarta, Indonesia",
          roles: [
            {
              title: "Junior Game Programmer - Part-time (Remote)",
              date: "Sep 2023 - Dec 2023",
              items: [
                "Designed and implemented an existing game design in collaboration with a senior programmer.",
                "Collaborated with game artists to integrate technical art into the game.",
                "Created UI related to the designed dialog system mechanics until it functioned seamlessly.",
                "Designed algorithms and implemented enemy AI and boss characters.",
              ],
            },
          ],
        },
        {
          org: "Electronic Engineering Polytechnic Institute of Surabaya (EEPIS)",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Lecturer's Teaching Assistant - Part-time (On-site)",
              date: "Jul 2023 - Dec 2023",
              items: [
                "Developed a comprehensive 16-week learning curriculum by aligning weekly topics with assignments.",
                "Delivered engaging interactions while adhering to the curriculum.",
                "Assessed and provided constructive feedback on student assignments.",
                "Generated weekly teaching reports to ensure alignment between activities and the curriculum.",
              ],
            },
          ],
        },
        {
          org: "Game for Education and Cultural Heritage - EEPIS Research Group",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Game Director - Full-time (On-site)",
              date: "Jul 2023 - Aug 2023",
              items: [
                "Led and directed the development direction of a game themed around traditional food stalls.",
                "Managed a team of 14 across Programmers, Artists, Game Designers, and Social Media Specialists.",
                "Ensured clarity and updates in documentation from each division of the team.",
                "Resolved and discussed issues related to the overall development.",
              ],
            },
            {
              title: "Lead Game Programmer - Full-time (On-site)",
              date: "Jan 2023 - Feb 2023",
              items: [
                "Led a technical programming team of three to design and implement an existing game design.",
                "Coordinated and collaborated with other roles within the project.",
                "Developed development strategies and team workflows using Technical Design Documents.",
              ],
            },
          ],
        },
        {
          org: "Al-Falah Elementary School",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Programming Teacher - Part-time (On-site)",
              date: "Jul 2022 - Aug 2022",
              items: [
                "Instructed 20 students on the basics of programming using the Scratch application.",
                "Reviewed and evaluated the work of each student.",
                "Conducted fun sessions to engage students and spark interest in the topics being covered.",
              ],
            },
          ],
        },
        {
          org: "Sepay Studio",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Programmer - Part-time (Remote)",
              date: "Aug 2021 - Jul 2022",
              items: [
                "Implemented the design of a backend application for game development needs.",
                "Executed the design of a website from the provided design into a fully functional website.",
              ],
            },
          ],
        },
        {
          org: "Webmedia Training Center",
          location: "Medan, Indonesia",
          roles: [
            {
              title: "Web Developer Trainee - Internship (On-site)",
              date: "Aug 2019 - Nov 2019",
              items: [
                "Learned and designed landing page websites using HTML, CSS, and JavaScript.",
                "Created internship report documents for school reporting purposes and designed websites.",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Education",
      entries: [
        {
          org: "Electronic Engineering Polytechnic Institute of Surabaya (EEPIS)",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Bachelor of Applied Science - BASc, Game Technology",
              date: "Aug 2021 - Aug 2025",
            },
          ],
        },
        {
          org: "Telkom Vocational High School",
          location: "Medan, Indonesia",
          roles: [
            {
              title: "High School Diploma, Software Engineering",
              date: "Aug 2018 - Aug 2021",
            },
          ],
        },
      ],
    },
    {
      title: "Organization",
      entries: [
        {
          org: "EEPIS Semi-Autonomous Body of Game Technology Students' Association",
          location: "Surabaya, Indonesia",
          roles: [
            {
              title: "Head of Research and Technology Division",
              date: "Aug 2023 - Aug 2024",
            },
            {
              title: "Staff of Research and Technology Division",
              date: "Aug 2022 - Aug 2023",
            },
          ],
        },
      ],
    },
  ],
};

export default base;
