import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <div className="space-y-4">
        {/* In a real app, you'd map through posts here */}
        <article className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <Link href="/blog/hello-world" className="block group">
            <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors">Hello World</h2>
            <p className="text-gray-500 text-sm mt-1">December 4, 2025</p>
            <p className="mt-3 text-gray-600">This is my first blog post using MDX in Next.js...</p>
          </Link>
        </article>
      </div>
    </div>
  );
}
