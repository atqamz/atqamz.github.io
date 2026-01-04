import type { MDXComponents } from 'mdx/types'

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ')

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, className, ...props }) => (
      <h1 {...props} className={cx("text-3xl font-bold mt-8 mb-4", className)}>
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }) => (
      <h2 {...props} className={cx("text-2xl font-bold mt-6 mb-3", className)}>
        {children}
      </h2>
    ),
    p: ({ children, className, ...props }) => (
      <p {...props} className={cx("mb-4 leading-relaxed", className)}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul {...props} className={cx("list-disc list-inside mb-4", className)}>
        {children}
      </ul>
    ),
    a: ({ children, className, ...props }) => (
      <a {...props} className={cx("text-blue-600 dark:text-blue-400 hover:underline", className)}>
        {children}
      </a>
    ),
    ...components,
  }
}
