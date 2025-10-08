'use client';
import { ColumnDef } from '@tanstack/react-table';
import { UserRoleTeamMemberType } from '../../type';
import Image from 'next/image';
import { Pencil } from 'lucide-react';

export const columns: ColumnDef<UserRoleTeamMemberType>[] = [
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <Image
          src={row.original.user.avatar_url || 'https://i.pravatar.cc/150?img=1'}
          alt={row.original.user.avatar_url || 'Avatar'}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className='flex-col'>
          <h3>{row.original.user.first_name} {row.original.user.last_name}</h3>
          <p className="text-muted-foreground">{row.original.user.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'role.name',
    header: 'Role',
    cell: ({ row }) => <span className='capitalize'>{row.original.role.name}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.user.is_active ? 'active' : 'inactive';
      const statusColor =
        status === 'active'
          ? 'bg-green-100 text-green-800'
          : status === 'inactive'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800';

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: 'user.last_login',
    header: 'Last Active',
    cell: ({ row }) => {
      const lastLogin = row.original.user.last_login;
      if (!lastLogin) return <span className="text-muted-foreground">Never</span>;

      const date = new Date(lastLogin);
      return (
        <span>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex gap-2">
        <button
          aria-label="Edit member"
          title="Edit"
          className="p-2 rounded cursor-pointer hover:bg-gray-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          aria-label="Remove member"
          title="Remove"
          className="p-2 rounded hover:bg-gray-100 cursor-pointer text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6M14 11v6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </div>
    ),
  }
];
