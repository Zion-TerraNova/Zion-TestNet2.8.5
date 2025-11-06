'use client'

import { useEffect, useState, useMemo } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content?: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  const headings = useMemo(() => {
    // If content is provided, parse from content
    if (content) {
      const headingRegex = /^#{1,6}\s+(.+)$/gm
      const extractedHeadings: Heading[] = []
      let match

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[0].split('#').length - 1
        const text = match[1].trim()
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

        extractedHeadings.push({ id, text, level })
      }

      return extractedHeadings
    }

    // Only parse from DOM on client side
    if (typeof window === 'undefined') {
      return []
    }

    // Otherwise, parse from DOM
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const extractedHeadings: Heading[] = []

    headingElements.forEach((element) => {
      const level = parseInt(element.tagName.charAt(1))
      const text = element.textContent || ''
      const id = element.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

      if (id) {
        extractedHeadings.push({ id, text, level })
      }
    })

    return extractedHeadings
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sticky top-4">
      <h3 className="text-lg font-semibold text-cyan-400 mb-3">Table of Contents</h3>
      <nav>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-sm hover:text-cyan-400 transition-colors duration-200 ${
                  activeId === heading.id
                    ? 'text-cyan-400 font-medium'
                    : 'text-gray-300'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}