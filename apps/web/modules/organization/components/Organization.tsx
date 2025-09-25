'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  OrganizationProfileForm,
  organizationProfileSchema,
} from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Organization() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationProfileForm>({
    resolver: zodResolver(organizationProfileSchema),
  });

  function onSubmit() {}
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Organization Management</h1>
      <p className="text-muted-foreground">
        Manage your company profile, team members, and audit logs
      </p>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-2 items-center">
              <Building2 size={20} />
              <h1>Company Profile</h1>
            </div>
            <CardDescription>
              <p className=" text-sm text-muted-foreground mt-2">
                Manage your organization&apos;s basic information
              </p>
            </CardDescription>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className='flex gap-6'>
              <div className='w-full'>
                <Label
                  htmlFor="companyName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Company Name
                </Label>
                <Input {...register('companyName')} />
              </div>
              <div className='w-full'>
                <Label
                  htmlFor="contactEmail"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Contract Email
                </Label>
                <Input {...register('contactEmail')} />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
