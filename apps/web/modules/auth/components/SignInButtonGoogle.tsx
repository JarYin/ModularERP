'use client';

import { supabase } from '@/lib/supabaseClient';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SignInButton() {
  const t = useTranslations('SignIn');
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard', // after login redirect
      },
    });
  };

  return (
      <div className='w-full border text-black p-2 rounded font-semibold mt-4 hover:bg-gray-100 cursor-pointer flex items-center justify-center gap-2'>
        <Image src={'/google.png'} alt="Google Logo" width={20} height={20} />
        <button
          onClick={handleSignIn}
          className="cursor-pointer"
        >
          {t('button.button-1')}
        </button>
      </div>
  );
}
