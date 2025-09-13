'use client';

import { getSession } from '@/lib/session';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    const session = await getSession();

    if (!session?.accessToken) return;

    const res = await fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
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
