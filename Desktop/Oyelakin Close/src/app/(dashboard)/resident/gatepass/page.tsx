import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '@/components/ui/SubmitButton'

async function generatePass(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return
  
  const visitorName = formData.get('visitor_name') as string
  const date = formData.get('date') as string
  const accessCode = Math.floor(100000 + Math.random() * 900000).toString() // 6 digit code
  
  await supabase.from('visitors').insert({
    resident_id: user.id,
    visitor_name: visitorName,
    date: date,
    access_code: accessCode,
    status: 'pending'
  })
  
  revalidatePath('/resident/gatepass')
}

export default async function GatePassPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: visitors } = await supabase
    .from('visitors')
    .select('*')
    .eq('resident_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Gate Pass Management</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Generate Pass */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Generate Gate Pass</h2>
          <form action={generatePass} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="visitor_name">Visitor Name</label>
              <input type="text" id="visitor_name" name="visitor_name" required placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="date">Expected Date</label>
              <input type="date" id="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <SubmitButton className="btn btn-primary" style={{ marginTop: '0.5rem' }} loadingText="Generating...">
              Generate 6-Digit Pass
            </SubmitButton>
          </form>
        </div>

        {/* Recent Passes */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>My Passes</h2>
          {visitors && visitors.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {visitors.map((v: any) => (
                <li key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{v.visitor_name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{v.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '2px', color: 'var(--primary)' }}>{v.access_code}</div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', padding: '0.1rem 0.4rem', borderRadius: '4px', background: v.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: v.status === 'pending' ? '#eab308' : '#22c55e' }}>
                      {v.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>No passes generated yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
