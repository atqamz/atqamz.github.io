import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Personal Space</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I'm a developer passionate about building simple, effective software. 
          This is where I share my thoughts and professional journey.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/blog" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-2">📝 Blog</h2>
          <p className="text-gray-600 dark:text-gray-300">Read my latest thoughts on technology, coding, and life.</p>
        </Link>

        <Link href="/resume" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-2">💼 Resume</h2>
          <p className="text-gray-600 dark:text-gray-300">Check out my professional experience, skills, and projects.</p>
        </Link>
      </div>
    </div>
  );
}
