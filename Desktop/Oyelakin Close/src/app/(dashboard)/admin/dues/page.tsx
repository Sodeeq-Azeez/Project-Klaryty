import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '@/components/ui/SubmitButton'

async function recordDue(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const houseId = formData.get('house_id') as string
  const amount = formData.get('amount') as string
  const datePaid = formData.get('date_paid') as string
  
  await supabase.from('dues').insert({
    house_id: houseId,
    amount: parseFloat(amount),
    status: 'cleared',
    date_paid: datePaid,
    recorded_by: user?.id
  })
  
  revalidatePath('/admin/dues')
}

export default async function AdminDuesPage() {
  const supabase = await createClient()
  
  // Fetch houses
  const { data: houses } = await supabase.from('houses').select(`
    id, house_number,
    users ( full_name )
  `)
  
  // Fetch recent dues
  const { data: dues } = await supabase.from('dues').select(`
    *,
    houses ( house_number )
  `).order('created_at', { ascending: false }).limit(10)

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Dues Management</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Record Payment (Offline)</h3>
          <form action={recordDue} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="house_id">House</label>
              <select id="house_id" name="house_id" required>
                <option value="">Select a house...</option>
                {houses?.map((h: any) => (
                  <option key={h.id} value={h.id}>
                    {h.house_number} {h.users?.full_name ? `(${h.users.full_name})` : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="amount">Amount Paid (₦)</label>
              <input type="number" id="amount" name="amount" required min="0" step="1000" placeholder="e.g. 50000" />
            </div>
            
            <div>
              <label htmlFor="date_paid">Date Paid</label>
              <input type="date" id="date_paid" name="date_paid" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            
            <SubmitButton className="btn btn-primary" style={{ marginTop: '1rem' }} loadingText="Recording...">
              Record Payment
            </SubmitButton>
          </form>
        </div>
        
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Records</h3>
          {dues && dues.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {dues.map((due: any) => (
                <li key={due.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{due.houses?.house_number}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{new Date(due.date_paid).toLocaleDateString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold' }}>₦{due.amount?.toLocaleString()}</div>
                    <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>CLEARED</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>No dues recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
