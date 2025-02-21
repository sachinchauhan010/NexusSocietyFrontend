import { lazy, Suspense } from 'react'

const AdminSidebar = lazy(() => import('@/components/app/Admin/Sidebar'));

function Admin() {
  return (
    <div>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px', backgroundColor:'red' }}>Loading...</div>}>
        <AdminSidebar />
      </Suspense>
    
    </div>
  )
}

export default Admin
