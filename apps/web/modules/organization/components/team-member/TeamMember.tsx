"use client";
import { columns } from './columns';
import { TeamMemberType, UserRoleTeamMemberType } from '../../type';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import { fetchUserOrganizations } from '../../api/organization';

export default function TeamMember() {
  const [data, setData] = useState<UserRoleTeamMemberType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserOrganizations();
      console.log('User Organizations:', response);
      setData(response);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
