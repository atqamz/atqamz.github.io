export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export const posts: PostMeta[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    date: "2025-12-04",
    description: "My first blog post using MDX in Next.js.",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
