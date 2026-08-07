export interface ContactItem {
  label: string;
  href: string;
}

export interface ResumeRole {
  title: string;
  date: string;
  items?: string[];
}

export interface ResumeEntry {
  org: string;
  location: string;
  roles: ResumeRole[];
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
