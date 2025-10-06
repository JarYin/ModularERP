'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
  OrganizationProfileForm,
  organizationProfileSchema,
} from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useEffect, useState } from 'react';
import { selectOrganization } from '../api/organization';
import { getSession } from '@/lib/session';
import type { Organization } from '@/modules/landing/types';

export default function Organization() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationProfileForm>({
    resolver: zodResolver(organizationProfileSchema),
    defaultValues: {
      industry: '',
      phone: '',
    },
  });
  const [orgData, setOrgData] = useState<Organization | null>(null);

  function onSubmit(data: OrganizationProfileForm) {
    console.log('Form submitted:', data);
    console.log('session: ', getSession());
  }

  useEffect(() => {
    async function fetchOrganization() {
      try {
        const response: Organization = await selectOrganization();
        console.log('Organization data:', response);
        if (response) {
          // แทนที่จะ setValue แยกหลายตัว ใช้ reset
          reset({
            industry: response.industry ?? '',
            phone: response.phone ?? '',
          });
          setOrgData(response);
        }
      } catch (error) {
        console.error('Failed to select organization', error);
      }
    }

    fetchOrganization();
  }, [reset]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Organization Management</h1>
      <p className="text-muted-foreground">
        Manage your company profile, team members, and audit logs
      </p>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-2 items-center">
              <Building2 size={20} />
              <h1>Company Profile</h1>
            </div>
            <CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                Manage your organization&apos;s basic information
              </p>
            </CardDescription>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!orgData ? (
            <div className="flex items-center justify-center py-6">
              <div
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md"
              >
                <span className="w-4 h-4 border-2 border-t-transparent border-gray-500 dark:border-gray-300 rounded-full animate-spin" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Loading organization...
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Company name + Email */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    {...register('companyName')}
                    defaultValue={orgData?.name ?? ''}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input {...register('contactEmail')} />
                  {errors.contactEmail && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Industry + Phone */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Label htmlFor="industry">Industry</Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        key={field.value}
                        value={field.value || ''}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.industry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </Label>

                  <Controller
                    key={orgData?.phone ?? 'phone-input'}
                    name="phone"
                    control={control}
                    defaultValue={orgData?.phone ?? ''}
                    render={({ field }) => (
                      <div className="relative">
                        <PhoneInput
                          {...field}
                          value={field.value ?? orgData?.phone ?? ''}
                          onChange={(val) => field.onChange(val)}
                          defaultCountry="US"
                          international
                          withCountryCallingCode
                          id="phone"
                          className="phone-input"
                        />
                      </div>
                    )}
                  />

                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Website + Address */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    {...register('website')}
                    defaultValue={orgData?.website ?? ''}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.website.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    {...register('address')}
                    defaultValue={orgData?.address ?? ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...register('description')}
                  defaultValue={orgData?.description ?? ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Update company profile'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
