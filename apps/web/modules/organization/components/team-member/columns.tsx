'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TeamMemberType } from '../../type';
import Image from 'next/image';

export const columns: ColumnDef<TeamMemberType>[] = [
  {
    accessorKey: 'name',
    header: 'Member',
    cell: ({ row }) => (
      <div className="font-medium flex items-center gap-2">
        <Image
          src={row.original.avatar}
          alt={row.original.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className='flex-col'>
          <h3>{row.original.name}</h3>
          <p className="text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
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
    accessorKey: 'lastLogin',
    header: 'Last Active',
  },
];
