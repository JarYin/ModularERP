'use client';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import SignInButton from './SignInButtonGoogle';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SignUpData, signUpSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupUser } from '../api/signup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('SignIn');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      setLoading(true);
      const response = await signupUser(
        data.email.trim(),
        data.password.trim(),
        data.firstName,
        data.lastName
      );
      if (response) {
        router.push('/signin');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
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
          <h1 className="text-center text-3xl font-bold">
            {t('title-signup')}
          </h1>
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
            <div className="flex justify-between gap-1">
              <div className="w-full">
                <label>{t('InputForm.firstName')}</label>
                <input
                  type="text"
                  {...register('firstName')}
                  placeholder={t('InputForm.placeholder.firstName')}
                  className="border p-2 w-full rounded"
                />
                {errors.firstName && (
                  <p className="text-red-500 w-full mb-4">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label>{t('InputForm.lastName')}</label>
                <input
                  type="text"
                  {...register('lastName')}
                  placeholder={t('InputForm.placeholder.lastName')}
                  className="border p-2 w-full rounded"
                />
                {errors.lastName && (
                  <p className="text-red-500 w-full mb-4">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
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

            <div>
              <label htmlFor="confirmPassword">
                {t('InputForm.confirmPassword')}
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder={t('InputForm.confirmPassword')}
                className="border p-2 w-full rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 w-full mb-4">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div></div>
              <div>
                <a href="#" className="text-blue-500">
                  {t('InputForm.forgotPassword')}
                </a>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600 rounded font-semibold cursor-pointer flex items-center justify-center"
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
                t('button.button-3')
              )}
            </button>

            <p className="text-center">
              {t('subtitle.sub-6')}{' '}
              <Link href="/signin" className="text-blue-500">
                {t('subtitle.sub-5')}
              </Link>
            </p>
          </form>
          {/* Sign-in form goes here */}
        </div>
      </div>
    </div>
  );
}
