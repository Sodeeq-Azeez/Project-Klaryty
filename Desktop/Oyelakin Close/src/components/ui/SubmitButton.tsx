'use client'

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  loadingText?: string
}

export function SubmitButton({ children, className = 'btn btn-primary', loadingText = 'Loading...', ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button 
      {...props}
      type="submit" 
      className={className}
      disabled={pending || props.disabled}
      style={{ ...props.style, position: 'relative', opacity: pending ? 0.8 : 1, cursor: pending ? 'not-allowed' : 'pointer' }}
    >
      {pending ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
           <span className="spinner"></span>
           {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
