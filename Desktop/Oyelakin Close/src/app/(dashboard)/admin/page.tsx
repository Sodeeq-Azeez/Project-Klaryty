import { createClient } from '@/utils/supabase/server'
import { Users, UserCheck, Bell, CreditCard } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get total residents
  const { count: residentsCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'resident')
    
  // Get total houses registered
  const { count: housesCount } = await supabase
    .from('houses')
    .select('*', { count: 'exact', head: true })

  // Get total notices
  const { count: noticesCount } = await supabase
    .from('notices')
    .select('*', { count: 'exact', head: true })

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>Total Residents</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)' }}>{residentsCount || 0}</div>
        </div>
        
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>Houses Registered</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)' }}>{housesCount || 0}</div>
        </div>

        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>Active Notices</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)' }}>{noticesCount || 0}</div>
        </div>
      </div>
    </div>
  )
}
