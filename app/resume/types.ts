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
  contact: string;
  summary: string;
  sections: ResumeSection[];
}
