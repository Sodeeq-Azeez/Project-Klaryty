'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/app/(dashboard)/dashboard.module.css'
import { LogOut, Home, Users, CreditCard, Shield, Bell, Key } from 'lucide-react'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { signOutAction } from '@/app/auth/actions'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface SidebarProps {
  role: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === '/admin' && pathname !== '/admin') return false;
    if (path === '/resident' && pathname !== '/resident') return false;
    if (path === '/security' && pathname !== '/security') return false;
    return pathname.startsWith(path)
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Oyelakin Close</span>
        <ThemeToggle />
      </div>
      
      <nav className={styles.nav}>
        {role === 'admin' && (
          <>
            <Link href="/admin" className={`${styles.navLink} ${isActive('/admin') ? styles.navLinkActive : ''}`}>
              <Home size={18} style={{ marginRight: '10px' }} /> Overview
            </Link>
            <Link href="/admin/users" className={`${styles.navLink} ${isActive('/admin/users') ? styles.navLinkActive : ''}`}>
              <Users size={18} style={{ marginRight: '10px' }} /> Manage Users
            </Link>
            <Link href="/admin/residents" className={`${styles.navLink} ${isActive('/admin/residents') ? styles.navLinkActive : ''}`}>
              <Home size={18} style={{ marginRight: '10px' }} /> Houses
            </Link>
            <Link href="/admin/dues" className={`${styles.navLink} ${isActive('/admin/dues') ? styles.navLinkActive : ''}`}>
              <CreditCard size={18} style={{ marginRight: '10px' }} /> Dues
            </Link>
            <Link href="/admin/notices" className={`${styles.navLink} ${isActive('/admin/notices') ? styles.navLinkActive : ''}`}>
              <Bell size={18} style={{ marginRight: '10px' }} /> Notices
            </Link>
          </>
        )}

        {role === 'resident' && (
          <>
            <Link href="/resident" className={`${styles.navLink} ${isActive('/resident') ? styles.navLinkActive : ''}`}>
              <Home size={18} style={{ marginRight: '10px' }} /> Dashboard
            </Link>
            <Link href="/resident/gatepass" className={`${styles.navLink} ${isActive('/resident/gatepass') ? styles.navLinkActive : ''}`}>
              <Key size={18} style={{ marginRight: '10px' }} /> Gate Pass
            </Link>
            <Link href="/resident/dues" className={`${styles.navLink} ${isActive('/resident/dues') ? styles.navLinkActive : ''}`}>
              <CreditCard size={18} style={{ marginRight: '10px' }} /> My Dues
            </Link>
          </>
        )}

        {role === 'security' && (
          <>
            <Link href="/security" className={`${styles.navLink} ${isActive('/security') ? styles.navLinkActive : ''}`}>
              <Shield size={18} style={{ marginRight: '10px' }} /> Verify Pass
            </Link>
          </>
        )}
      </nav>
      
      <form action={signOutAction} style={{ marginTop: 'auto' }}>
         <SubmitButton className="btn btn-secondary btn-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--destructive)' }} loadingText="Signing out...">
           <LogOut size={18} style={{ marginRight: '10px' }} /> Sign Out
         </SubmitButton>
      </form>
    </aside>
  )
}
