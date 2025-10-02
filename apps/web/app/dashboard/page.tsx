'use client';

import { getSession } from '@/lib/session';
import { useEffect, useState } from 'react';
import profileAPI from '@/modules/user/api/profileAPI';
import { RoleGuard } from '@/modules/landing/components/auth/RoleGuard';

export default function Dashboard() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getSession();
      if (!accessToken) return;

      console.log('Access token:', accessToken);

      try {
        const res = await profileAPI.getProfile(); // ต้องส่ง token ไป
        setData(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <RoleGuard roles={['admin']}>
        <h1>Welcome Admin!</h1>
        <p>เฉพาะ user ที่มี role admin เท่านั้น</p>
      </RoleGuard>
    </>
  );
}
