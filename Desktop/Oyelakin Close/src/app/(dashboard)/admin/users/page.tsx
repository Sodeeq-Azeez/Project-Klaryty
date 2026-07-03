import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { SubmitButton } from '@/components/ui/SubmitButton'

async function createUser(formData: FormData) {
  'use server'
  const adminClient = await createAdminClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const role = formData.get('role') as string
  const phone = formData.get('phone') as string
  
  // Create user using Supabase Admin API (bypasses RLS and doesn't log them in)
  const { data: authData, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true // Auto confirm email since an admin creates them
  })
  
  if (error || !authData.user) {
    console.error('Failed to create user auth:', error)
    return
  }
  
  // Insert their profile into the users table
  const { error: profileError } = await adminClient.from('users').insert({
    id: authData.user.id,
    full_name: fullName,
    role: role,
    phone: phone
  })
  
  if (profileError) {
    console.error('Failed to create user profile:', profileError)
  }
  
  revalidatePath('/admin/users')
}

export default async function AdminUsersPage() {
  const supabase = await createClient()
  
  const { data: users } = await supabase.from('users').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>User Management</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Create User Form */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add New User</h3>
          <form action={createUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="full_name">Full Name</label>
              <input type="text" id="full_name" name="full_name" required placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="user@example.com" />
            </div>
            <div>
              <label htmlFor="password">Temporary Password</label>
              <PasswordInput id="password" name="password" required placeholder="e.g. Temp1234!" />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select id="role" name="role" required defaultValue="resident">
                <option value="resident">Resident</option>
                <option value="security">Security Personnel</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input type="text" id="phone" name="phone" placeholder="08012345678" />
            </div>
            <SubmitButton className="btn btn-primary" style={{ marginTop: '0.5rem' }} loadingText="Creating...">
              Create User
            </SubmitButton>
          </form>
        </div>

        {/* User List */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Existing Users</h3>
          {users && users.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem 0' }}>Name</th>
                    <th style={{ padding: '0.75rem 0' }}>Role</th>
                    <th style={{ padding: '0.75rem 0' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                     <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                       <td style={{ padding: '1rem 0', fontWeight: '500' }}>
                          {user.full_name}
                          <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>{user.phone || 'No phone'}</div>
                       </td>
                       <td style={{ padding: '1rem 0' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', padding: '0.2rem 0.5rem', borderRadius: '1rem', background: 'var(--muted)', color: 'var(--foreground)' }}>
                             {user.role}
                          </span>
                       </td>
                       <td style={{ padding: '1rem 0', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                          {new Date(user.created_at).toLocaleDateString()}
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>No users found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
