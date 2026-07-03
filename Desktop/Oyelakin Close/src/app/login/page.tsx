import { login } from './actions'
import styles from './login.module.css'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  return (
    <div className={styles.wrapper}>
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <ThemeToggle />
      </div>
      <form className={`${styles.loginCard} glass`}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
            Oyelakin Close
          </h1>
          <p style={{ color: 'var(--muted-foreground)' }}>Sign in to your estate account</p>
        </div>

        {message && <div className={styles.message} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--destructive)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{message}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <PasswordInput id="password" name="password" required />
        </div>

        <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
          <SubmitButton formAction={login} className="btn btn-primary btn-block" loadingText="Authenticating...">
            Log in
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}
