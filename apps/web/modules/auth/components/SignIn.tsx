'use client';

import { Separator } from '@/components/ui/separator';
import SignInButton from '@/modules/auth/components/SignInButtonGoogle';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInData } from '../validation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { createSession } from '@/lib/session';
import { signinUser } from '../api/signin';
import { supabase } from '@/lib/supabaseClient';

export default function SignIn() {
  const t = useTranslations('SignIn');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) throw error;

      const access_token = signInData.session?.access_token;
      if (!access_token)
        throw new Error('No access token returned from Supabase');

      await createSession(access_token, data.rememberMe);

      router.push('/dashboard');
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage(t('error.errorInvalidLogin'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 h-screen w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center">
          <Image
            src={'/logo.png'}
            alt="ModularERP Logo"
            width={50}
            height={50}
            className="items-center"
          />
          <h1 className="text-3xl font-bold mb-4 text-blue-600 items-center mt-3">
            ModularERP
          </h1>
        </div>
        <div className="bg-white p-8 rounded shadow-md min-w-2xl">
          <h1 className="text-center text-3xl font-bold">{t('title')}</h1>
          <p className="text-center font-semibold text-gray-500">
            {t('subtitle.sub-1')}
          </p>
          <SignInButton />
          <div className="relative mt-4 mb-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t('subtitle.sub-2')}
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
              <p className="text-red-500 w-full mb-2 text-center">
                {errorMessage}
              </p>
            )}
            <label>{t('InputForm.email')}</label>
            <input
              type="email"
              {...register('email')}
              placeholder={t('InputForm.placeholder.email')}
              className="border p-2 w-full rounded"
            />
            {errors.email && (
              <p className="text-red-500 w-full mb-4">{errors.email.message}</p>
            )}
            <label>{t('InputForm.password')}</label>
            <input
              type="password"
              {...register('password')}
              placeholder={t('InputForm.placeholder.password')}
              className="border p-2 w-full rounded"
            />
            {errors.password && (
              <p className="text-red-500 w-full mb-4">
                {errors.password.message}
              </p>
            )}
            <div className="flex items-center justify-between mb-4">
              <div>
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  id="remember"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="remember">{t('InputForm.rememberMe')}</label>
              </div>
              <div>
                <Link href="/signin/forgotPassword" className="text-blue-500">
                  {t('InputForm.forgotPassword')}
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white p-2 w-full flex justify-center hover:bg-blue-600 rounded font-semibold cursor-pointer"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </>
              ) : (
                t('button.button-2')
              )}
            </button>

            <p className="text-center">
              {t('subtitle.sub-3')}{' '}
              <Link href="/signup" className="text-blue-500">
                {t('subtitle.sub-4')}
              </Link>
            </p>
          </form>
          {/* Sign-in form goes here */}
        </div>
      </div>
    </div>
  );
}
