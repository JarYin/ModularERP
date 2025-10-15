'use client';
import Head from 'next/head';
import { menuItems, Navbar, Sidebar, subMenuItems } from '../../components/layout/Dashboard';
import { usePathname } from 'next/navigation';
import { Toaster } from '../ui/sonner';

export default function ClientBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeMenu = menuItems.find((item) => item.href === pathname) ?? menuItems[0];
  const subMenu = subMenuItems.find((item) => item.href === pathname)
  if (!activeMenu) {
    return <div>No menu items available.</div>;
  }
  return (
    <>
      <Head>
        <title>Dashboard | ModularERP</title>
        <meta
          name="description"
          content="Manage your ERP modules efficiently with ModularERP."
        />
      </Head>
      <div className="flex h-screen bg-gray-50 font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar activeMenu={activeMenu} subMenu={subMenu} />
          <main className="flex-1 overflow-auto" role="main">
            {children}
          </main>
          <Toaster />
        </div>
      </div>
    </>
  );
}
