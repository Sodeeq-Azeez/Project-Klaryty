import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
      
    if (profile?.role === 'admin') redirect('/admin')
    if (profile?.role === 'security') redirect('/security')
    if (profile?.role === 'resident') redirect('/resident')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, var(--muted), var(--background))', padding: '2rem' }}>
      <div className="glass" style={{ maxWidth: '600px', width: '100%', padding: '3rem', borderRadius: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Oyelakin Close Platform
        </h1>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
          Secure, digitized estate management for residents and management.
        </p>
        <Link href="/login" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
          Access Portal
        </Link>
      </div>
    </div>
  )
}
