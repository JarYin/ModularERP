import { columns } from './columns';
import { TeamMemberType } from '../../type';
import { DataTable } from './data-table';

export default function TeamMember() {
  const data: TeamMemberType[] = [
    {
      avatar: 'https://i.pravatar.cc/150?img=1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-10-01 10:00 AM',
    },
    {
      avatar: 'https://i.pravatar.cc/150?img=2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'inactive',
      lastLogin: '2023-09-30 09:30 AM',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
