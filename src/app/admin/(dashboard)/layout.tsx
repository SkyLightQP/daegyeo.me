import { FC, PropsWithChildren } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '../../../components/ui/sonner';

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1 min-w-0 px-6 py-8 bg-white">{children}</main>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
};

export default AdminLayout;
