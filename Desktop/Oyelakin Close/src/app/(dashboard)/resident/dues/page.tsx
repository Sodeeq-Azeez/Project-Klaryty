import { createClient } from '@/utils/supabase/server'

export default async function ResidentDuesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Find the resident's house
  const { data: house } = await supabase.from('houses').select('id, house_number').eq('resident_id', user?.id).single()
  
  let dues = null
  if (house) {
    const { data } = await supabase
      .from('dues')
      .select('*')
      .eq('house_id', house.id)
      .order('date_paid', { ascending: false })
    dues = data
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>My Dues History</h2>
      
      {house ? (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', maxWidth: '600px' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
             <span style={{ color: 'var(--muted-foreground)' }}>House Number:</span>
             <strong style={{ fontSize: '1.25rem', marginLeft: '0.5rem' }}>{house.house_number}</strong>
          </div>
          
          {dues && dues.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {dues.map((due: any) => (
                <li key={due.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>Estate Dues</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{new Date(due.date_paid).toLocaleDateString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold' }}>₦{due.amount?.toLocaleString()}</div>
                    <span style={{ fontSize: '0.75rem', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
                      {due.status.toUpperCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>No dues recorded for your house yet.</p>
          )}
        </div>
      ) : (
        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
           <p>Your account is not linked to a house yet.</p>
           <p>Please contact the estate admin.</p>
        </div>
      )}
    </div>
  )
}
