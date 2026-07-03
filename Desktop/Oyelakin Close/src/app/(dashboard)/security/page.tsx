import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/ui/SubmitButton'

async function verifyPass(formData: FormData) {
  'use server'
  const code = formData.get('code') as string
  if (code) {
    redirect(`/security?code=${code}`)
  }
}

async function markAsEntered(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const id = formData.get('id') as string
  
  if (id) {
    await supabase.from('visitors').update({ status: 'verified' }).eq('id', id)
    revalidatePath('/security')
  }
}

export default async function SecurityDashboard({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const { code } = await searchParams
  const supabase = await createClient()
  
  let visitor = null
  let resident = null
  
  if (code) {
    const { data } = await supabase.from('visitors').select('*').eq('access_code', code).single()
    visitor = data
    
    if (visitor) {
      const { data: rData } = await supabase.from('users').select('full_name').eq('id', visitor.resident_id).single()
      resident = rData
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Verify Gate Pass</h2>
        <form action={verifyPass} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            name="code" 
            placeholder="Enter 6-digit code" 
            defaultValue={code || ''} 
            maxLength={6} 
            required 
            style={{ fontSize: '1.5rem', letterSpacing: '4px', textAlign: 'center', padding: '1rem' }} 
          />
          <SubmitButton className="btn btn-primary" style={{ padding: '0 2rem' }} loadingText="Checking...">Check</SubmitButton>
        </form>
      </div>

      {code && (
        <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
          {visitor ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{visitor.visitor_name}</h3>
                  <p style={{ color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>Visiting: <strong>{resident?.full_name}</strong></p>
                  <p style={{ color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>Date: {visitor.date}</p>
                </div>
                <div>
                   <span style={{ 
                     display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: 'bold', textTransform: 'uppercase',
                     backgroundColor: visitor.status === 'pending' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(34, 197, 94, 0.2)', 
                     color: visitor.status === 'pending' ? '#eab308' : '#22c55e' 
                   }}>
                     {visitor.status}
                   </span>
                </div>
              </div>
              
              {visitor.status === 'pending' && (
                <form action={markAsEntered}>
                  <input type="hidden" name="id" value={visitor.id} />
                  <SubmitButton className="btn btn-primary btn-block" style={{ padding: '1rem', fontSize: '1.125rem' }} loadingText="Granting...">
                    Grant Access & Mark Verified
                  </SubmitButton>
                </form>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--destructive)', padding: '2rem 0' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Invalid Pass Code</h3>
              <p>No visitor found with code: {code}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
