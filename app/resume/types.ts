export interface ContactItem {
  label: string;
  href: string;
}

export interface ResumeEntry {
  org: string;
  role: string;
  location: string;
  date: string;
  items?: string[];
}

export interface ResumeSection {
  title: string;
  entries: ResumeEntry[];
}

export interface ResumeData {
  name: string;
  role: string;
  contact: ContactItem[];
  summary: string;
  sections: ResumeSection[];
}
