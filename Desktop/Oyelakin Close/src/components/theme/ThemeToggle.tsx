'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: '40px', height: '40px' }} />
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn"
      style={{
        background: 'rgba(var(--card), 0.5)',
        border: '1px solid var(--border)',
        color: 'var(--foreground)',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px'
      }}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}
