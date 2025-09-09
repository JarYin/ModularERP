'use client';

import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) return;

      const res = await fetch('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      let jsonData = null;
      if (res.ok) {
        jsonData = await res.json();
      }
      setData(jsonData);
    };

    fetchData();
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
