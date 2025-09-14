'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// shadcn/ui imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ResetForm, ResetSchema } from '../validation';
import { resetPasswordUser } from '../api/resetPasswordUser';


export default function ResetPasswordPage() {
  const [status, setStatus] = useState<
    | { type: 'idle' }
    | { type: 'loading' }
    | { type: 'success'; message: string }
    | { type: 'error'; message: string }
  >({ type: 'idle' });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetForm>({
    resolver: zodResolver(ResetSchema),
    mode: 'onBlur',
  });

  async function onSubmit(values: ResetForm) {
    if (!token) {
      setStatus({ type: 'error', message: 'Invalid or missing reset token' });
      return;
    }

    try {
      setStatus({ type: 'loading' });

      const res = await resetPasswordUser(token, values);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message = body?.message || 'Unable to reset password';
        setStatus({ type: 'error', message });
        return;
      }

      setStatus({
        type: 'success',
        message: 'Password reset successfully. You may now sign in.',
      });
      reset();
    } catch (err) {
      setStatus({
        type: 'error',
        message: (err as Error).message || 'Network error',
      });
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2 flex items-center justify-center">
                <Lock size={20} />
              </div>
              <div>
                <CardTitle className="text-white text-lg">
                  Reset your password
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm">
                  Choose a new password for your account.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {status.type === 'success' && (
              <Alert className="mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle />
                  <div>
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{status.message}</AlertDescription>
                  </div>
                </div>
              </Alert>
            )}

            {status.type === 'error' && (
              <Alert className="mb-4" aria-live="assertive">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    />
                  </svg>
                  <div>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{status.message}</AlertDescription>
                  </div>
                </div>
              </Alert>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="mb-1" />
                  <span>New password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirm" className="flex items-center gap-2">
                  <span>Confirm password</span>
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Confirm password"
                  {...register('confirm')}
                  aria-invalid={!!errors.confirm}
                />
                {errors.confirm && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirm.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || status.type === 'loading'}
                  className="flex-1"
                >
                  {isSubmitting || status.type === 'loading'
                    ? 'Resetting...'
                    : 'Reset password'}
                </Button>
              </div>
            </form>

            <div className="mt-4 text-sm text-slate-600">
              Tip: This page is only valid if you accessed it from the reset
              link in your email.
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-slate-500">
          <a href="/signin" className="underline underline-offset-2">
            Back to sign in
          </a>
        </div>
      </div>
    </main>
  );
}
