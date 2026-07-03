import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import styles from './dashboard.module.css'
import { Sidebar } from '@/components/layout/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/login')
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar role={profile.role} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  )
}
