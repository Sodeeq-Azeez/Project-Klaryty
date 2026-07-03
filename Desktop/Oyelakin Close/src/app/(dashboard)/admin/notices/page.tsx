import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { SubmitButton } from '@/components/ui/SubmitButton'

async function postNotice(formData: FormData) {
  'use server'
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  await supabase.from('notices').insert({ title, content })
  revalidatePath('/admin/notices')
}

async function deleteNotice(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const id = formData.get('id') as string
  
  await supabase.from('notices').delete().eq('id', id)
  revalidatePath('/admin/notices')
}

export default async function AdminNoticesPage() {
  const supabase = await createClient()
  const { data: notices } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(20)

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Notice Board Management</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Post New Notice</h3>
          <form action={postNotice} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required placeholder="Important Update" />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea id="content" name="content" required rows={5} placeholder="Write the notice content here..."></textarea>
            </div>
            <SubmitButton className="btn btn-primary" style={{ marginTop: '0.5rem' }} loadingText="Broadcasting...">
              Broadcast Notice
            </SubmitButton>
          </form>
        </div>
        
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Notices</h3>
          {notices && notices.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notices.map((notice: any) => (
                <li key={notice.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <h4 style={{ fontWeight: '600' }}>{notice.title}</h4>
                    <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem', fontSize: '0.875rem' }}>{notice.content}</p>
                    <small style={{ color: 'var(--muted-foreground)', display: 'block', marginTop: '0.5rem' }}>
                       {new Date(notice.created_at).toLocaleDateString()}
                    </small>
                  </div>
                  <form action={deleteNotice}>
                    <input type="hidden" name="id" value={notice.id} />
                    <SubmitButton className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} loadingText="Deleting...">
                      Delete
                    </SubmitButton>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>No notices posted yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
