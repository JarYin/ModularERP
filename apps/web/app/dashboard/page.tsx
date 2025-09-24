'use client';

import { getSession } from '@/lib/session';
import { useEffect, useState } from 'react';
import profileAPI from '@/modules/user/api/profileAPI';

export default function Dashboard() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();

      if (!session?.accessToken) return;

      console.log(session);

      try {
        const res = await profileAPI.getProfile();
        setData(res.data); // ✅ ใช้ res.data แทน res.json()
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

