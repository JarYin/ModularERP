'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './button';
    
export default function LanguageToggle() {
  const router = useRouter();
  const [locale, setLocale] = useState<string>('');

  useEffect(() => {
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `NEXT_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};`;
    router.refresh();
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'th' ? 'en' : 'th';
    changeLocale(nextLocale);
  };

  return (
    <Button onClick={toggleLanguage}>{locale === 'th' ? 'TH' : 'EN'}</Button>
  );
}
