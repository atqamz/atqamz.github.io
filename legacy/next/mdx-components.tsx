import type { MDXComponents } from 'mdx/types'

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ')

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    h3: ({ children, className, ...props }) => (
      <h3 {...props} className={cx("terminal-section", className)}>
        {children}
      </h3>
    ),
    h4: ({ children, className, ...props }) => (
      <h4 {...props} className={cx("terminal-section", className)}>
        {children}
      </h4>
    ),
    h5: ({ children, className, ...props }) => (
      <h5 {...props} className={cx("terminal-section", className)}>
        {children}
      </h5>
    ),
    h6: ({ children, className, ...props }) => (
      <h6 {...props} className={cx("terminal-section", className)}>
        {children}
      </h6>
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
    ol: ({ children, className, ...props }) => (
      <ol {...props} className={className}>
        {children}
      </ol>
    ),
    a: ({ children, className, ...props }) => (
      <a {...props} className={cx("terminal-link", className)}>
        {children}
      </a>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote {...props} className={className}>
        {children}
      </blockquote>
    ),
    pre: ({ children, className, ...props }) => (
      <pre {...props} className={className}>
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => (
      <code {...props} className={className}>
        {children}
      </code>
    ),
    hr: (props) => <hr {...props} className="terminal-divider" />,
    ...components,
  }
}
