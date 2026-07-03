import { createAdminClient } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const adminClient = await createAdminClient()
  
  const email = 'admin@oyelakin.com'
  const password = 'AdminPassword123!'
  
  // Check if admin already exists
  const { data: existingUser } = await adminClient.from('users').select('id').eq('role', 'admin').limit(1)
  
  if (existingUser && existingUser.length > 0) {
    return NextResponse.json({ message: 'Admin already exists', email })
  }

  const { data: authData, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })
  
  if (error || !authData.user) {
    return NextResponse.json({ error: error?.message || 'Failed to create auth user' }, { status: 500 })
  }
  
  const { error: profileError } = await adminClient.from('users').insert({
    id: authData.user.id,
    full_name: 'Estate Administrator',
    role: 'admin',
    phone: '0000000000'
  })
  
  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }
  
  return NextResponse.json({ 
    message: 'Successfully created demo admin account',
    email,
    password
  })
}
