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
import "react-phone-number-input/style.css";

export default function Organization() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationProfileForm>({
    resolver: zodResolver(organizationProfileSchema),
  });

  function onSubmit(data: OrganizationProfileForm) {
    console.log('Form submitted:', data);
  }

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Company name + Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Label htmlFor="companyName">Company Name</Label>
                <Input {...register('companyName')} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
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
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <PhoneInput
                        {...field}
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
                <Input {...register('website')} />
                {errors.website && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.website.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="address">Address</Label>
                <Textarea {...register('address')} />
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
              <Textarea {...register('description')} />
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
        </CardContent>
      </Card>
    </div>
  );
}
