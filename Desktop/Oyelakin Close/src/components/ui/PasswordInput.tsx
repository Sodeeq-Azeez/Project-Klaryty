'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        {...props}
        type={show ? 'text' : 'password'}
        style={{ ...props.style, paddingRight: '2.5rem' }}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        style={{
          position: 'absolute',
          right: '0.75rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--muted-foreground)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0
        }}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
