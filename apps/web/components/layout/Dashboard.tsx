'use client';
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  FileText,
  CreditCard,
  Building2,
  Settings,
  LogOut,
  ChevronDown,
  Building,
  Search,
  Bell,
  ChevronRight,
  KeyRound,
  Globe,
  Palette,
  BellRing,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { destroySession } from '@/lib/session';

// You can install lucide-react by running: npm install lucide-react
export const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    name: 'Dashboard',
    href: '/dashboard',
  },
  { icon: <Users size={20} />, name: 'CRM', href: '/dashboard/crm' },
  { icon: <Briefcase size={20} />, name: 'HR', href: '/dashboard/hr' },
  {
    icon: <Package size={20} />,
    name: 'Inventory',
    href: '/dashboard/inventory',
  },
  {
    icon: <FileText size={20} />,
    name: 'Accounting',
    href: '/dashboard/accounting',
  },
  { icon: <Package size={20} />, name: 'Modules', href: '/dashboard/modules' },
  {
    icon: <CreditCard size={20} />,
    name: 'Billing',
    href: '/dashboard/billing',
  },
  {
    icon: <Building2 size={20} />,
    name: 'Organization',
    href: '/dashboard/organization',
  },
  {
    icon: <Settings size={20} />,
    name: 'Settings',
    href: '/dashboard/settings',
  },
];

export const Sidebar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    await destroySession();
    window.location.href = '/';
  };
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen bg-white text-gray-700 w-64 p-4 border-r border-gray-200 shrink-0">
      {/* Logo */}
      <div className="flex items-center mb-10 shrink-0">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Building size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold ml-3 text-gray-800">ModularERP</h1>
      </div>

      {/* Menu */}
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={index} className="mb-2">
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-4 font-medium">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Org/User */}
      <div className="mb-4 shrink-0">
        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center">
            <FileText size={20} className="text-gray-500" />
            <div className="ml-3">
              <p className="font-semibold text-sm text-gray-800">Acme Corp</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
              Owner
            </span>
            <ChevronDown size={16} className="ml-2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-lg w-full cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} className="text-gray-500" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export const Navbar = ({
  activeMenu,
}: {
  activeMenu: { icon: React.ReactNode; name: string; href: string };
}) => {
  return (
    <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-8 shrink-0">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500">
        <Link
          href={activeMenu?.href || '#'}
          className="flex items-center hover:text-gray-700"
        >
          {activeMenu?.icon}
          <span className="ml-2">{activeMenu?.name}</span>
        </Link>
        <ChevronRight size={16} className="mx-2" />
      </div>

      {/* Search and User Actions */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
        </div>
        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
          {/* Placeholder for user avatar */}
        </div>
      </div>
    </header>
  );
};

export const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('General');
  const tabs = [
    { name: 'General', icon: <Settings size={16} /> },
    { name: 'API Keys', icon: <KeyRound size={16} /> },
    { name: 'Localization', icon: <Globe size={16} /> },
    { name: 'Appearance', icon: <Palette size={16} /> },
  ];
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      <p className="text-gray-500 mt-1">
        Manage your application preferences and configurations
      </p>

      <div className="mt-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.name
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on active tab */}
        <div className="mt-8">
          {activeTab === 'General' && (
            <div className="space-y-8">
              {/* General Preferences Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  General Preferences
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Configure your basic application settings
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form fields would go here */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Eastern Time (ET)
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Auto-save
                    </label>
                    <p className="text-sm text-gray-600 mt-1">Enabled</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date Format
                    </label>
                    <p className="text-sm text-gray-600 mt-1">MM/DD/YYYY</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Compact mode
                    </label>
                    <p className="text-sm text-gray-600 mt-1">Disabled</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Default Currency
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      USD - US Dollar
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Show tooltips
                    </label>
                    <p className="text-sm text-gray-600 mt-1">Enabled</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Save General Settings
                  </button>
                </div>
              </div>

              {/* Notifications Card */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <BellRing size={20} className="text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Configure how you receive notifications
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700">
                    Email notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
