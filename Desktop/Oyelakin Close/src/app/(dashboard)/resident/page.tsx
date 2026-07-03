import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Key, CreditCard, Bell } from 'lucide-react'

export default async function ResidentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch notices
  const { data: notices } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(3)

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Resident Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <Link href="/resident/gatepass" style={{ textDecoration: 'none' }}>
           <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--foreground)' }}>Generate Pass</h3>
             <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Book a visitor and generate a secure entry code.</p>
           </div>
        </Link>
        <Link href="/resident/dues" style={{ textDecoration: 'none' }}>
           <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--foreground)' }}>View Dues</h3>
             <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Review your payment history and outstanding balance.</p>
           </div>
        </Link>
      </div>
      
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Notice Board</h2>
      
      <div className="glass" style={{ padding: 0 }}>
        {notices && notices.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {notices.map((notice: any, index: number) => (
              <li key={notice.id} style={{ padding: '1rem 1.5rem', borderBottom: index !== notices.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <h4 style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.25rem' }}>{notice.title}</h4>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{notice.content}</p>
                <small style={{ color: 'var(--muted-foreground)', display: 'block', marginTop: '0.5rem' }}>
                   {new Date(notice.created_at).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
            No recent notices.
          </div>
        )}
      </div>
    </div>
  )
}
