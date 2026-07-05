import { FC, PropsWithChildren } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="px-6 py-8 bg-white">{children}</main>
    </SidebarProvider>
  );
};

export default AdminLayout;
