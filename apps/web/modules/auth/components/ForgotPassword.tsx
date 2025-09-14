'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// shadcn/ui components (assumed available in the project)
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { TriangleAlert, ArrowBigLeft } from 'lucide-react';

// Validation schema
const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ForgotData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotData>({ resolver: zodResolver(forgotSchema) });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(data: ForgotData) {
    setStatus('sending');
    setMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email.trim() }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus('error');
        setMessage(
          (payload && payload.message) ||
            'Unable to send reset email. Please try again later.',
        );
        return;
      }

      setStatus('success');
      setMessage(
        (payload && payload.message) ||
          'If this email exists, a reset link has been sent.',
      );
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <Card className="w-full max-w-xl shadow-lg rounded-2xl">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="text-2xl flex items-center gap-2"><ArrowBigLeft className='hover:bg-gray-400 rounded-full cursor-pointer transition-colors duration-400' /> Reset your password</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the email address associated with your account. We will send a
            secure link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8 pt-2">
          {status === 'success' && (
            <Alert className="mb-4" role="status">
              <div className="flex items-start gap-4">
                <TriangleAlert />
                <div>
                  <AlertTitle>Request sent</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant="destructive" className="mb-4" role="alert">
              <div className="flex items-start gap-4">
                <TriangleAlert />
                <div>
                  <AlertTitle>Unable to process request</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                className={`mt-1 w-full ${errors.email ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span>Didn’t receive the email?</span>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="ml-2 text-sm font-medium text-blue-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white cursor-pointer"
                variant="outline"
                disabled={isSubmitting || status === 'sending'}
              >
                {status === 'sending' || isSubmitting
                  ? 'Sending…'
                  : 'Send reset link'}
              </Button>
            </div>

            <div className="pt-2">
              <Separator />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                For security reasons the reset link expires after a short time.
                If you need additional assistance, contact support.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
