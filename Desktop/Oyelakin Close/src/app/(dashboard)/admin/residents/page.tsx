import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '@/components/ui/SubmitButton'

async function registerHouse(formData: FormData) {
  'use server'
  const supabase = await createClient()
  
  const houseNumber = formData.get('house_number') as string
  const residentId = formData.get('resident_id') as string
  
  await supabase.from('houses').insert({ 
    house_number: houseNumber, 
    resident_id: residentId 
  })
  
  revalidatePath('/admin/residents')
}

export default async function AdminResidentsPage() {
  const supabase = await createClient()
  
  // Fetch residents
  const { data: residents } = await supabase.from('users').select('*').eq('role', 'resident')
  
  // Fetch houses
  const { data: houses } = await supabase.from('houses').select(`
    id, house_number,
    users ( full_name, phone )
  `).order('house_number')

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Residents & Houses</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Register House</h3>
          <form action={registerHouse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="house_number">House Number</label>
              <input type="text" id="house_number" name="house_number" required placeholder="Block A, Plot 5 or 12B" />
            </div>
            <div>
              <label htmlFor="resident_id">Assign to Resident</label>
              <select id="resident_id" name="resident_id" required>
                <option value="">Select Resident...</option>
                {residents?.map((res: any) => (
                  <option key={res.id} value={res.id}>
                    {res.full_name}
                  </option>
                ))}
              </select>
            </div>
            <SubmitButton className="btn btn-primary" style={{ marginTop: '0.5rem' }} loadingText="Registering...">
              Register & Assign
            </SubmitButton>
          </form>
        </div>
        
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Estate Houses</h3>
          {houses && houses.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem 0' }}>House</th>
                    <th style={{ padding: '0.75rem 0' }}>Resident</th>
                  </tr>
                </thead>
                <tbody>
                  {houses.map((house: any) => (
                     <tr key={house.id} style={{ borderBottom: '1px solid var(--border)' }}>
                       <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{house.house_number}</td>
                       <td style={{ padding: '1rem 0', color: 'var(--muted-foreground)' }}>{house.users?.full_name || 'Unassigned'}</td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>No houses registered yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
