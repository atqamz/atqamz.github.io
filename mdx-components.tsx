import type { MDXComponents } from 'mdx/types'

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ')

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, className, ...props }) => (
      <h1 {...props} className={cx("terminal-title", className)}>
        {children}
      </h1>
    ),
    h2: ({ children, className, ...props }) => (
      <h2 {...props} className={cx("terminal-section", className)}>
        {children}
      </h2>
    ),
    p: ({ children, className, ...props }) => (
      <p {...props} className={cx("terminal-paragraph", className)}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul {...props} className={cx("terminal-list", className)}>
        {children}
      </ul>
    ),
    a: ({ children, className, ...props }) => (
      <a {...props} className={cx("terminal-link", className)}>
        {children}
      </a>
    ),
    ...components,
  }
}
