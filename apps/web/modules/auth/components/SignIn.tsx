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

export default function SignIn() {
  const t = useTranslations('SignIn');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInData) {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      if (response) {
         const result = await response.json();
         console.log("Sign-in result:", result);
        await createSession({
            user: {
                id: result.id,
                email: result.email,
            }
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    } finally {
      setLoading(false);
    }
  }
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
                <a href="#" className="text-blue-500">
                  {t('InputForm.forgotPassword')}
                </a>
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
