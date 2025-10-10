'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building2, Mail, Trash2, Plus, UserRound, Info } from 'lucide-react';
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
import { useFieldArray } from 'react-hook-form';
import TeamMember from './team-member/TeamMember';
import { currency } from '@/lib/currency';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from '@/components/animate-ui/primitives/base/collapsible';

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
      phone: [{ value: '' }],
      email: [],
    },
  });
  const [orgData, setOrgData] = useState<Organization | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [socialCollapsed, setSocialCollapsed] = useState(false);
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phone',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'email',
  });

  function onSubmit(data: OrganizationProfileForm) {
    console.log('Form submitted:', data);
    console.log('session: ', getSession());
  }

  useEffect(() => {
    async function fetchOrganization() {
      try {
        const response: Organization = await selectOrganization();
        if (response) {
          const phoneValue = Array.isArray(response.phone)
            ? response.phone[0] ?? ''
            : response.phone ?? '';
          reset({
            industry: response.industry ?? '',
            phone: [{ value: phoneValue }],
            email: (response.email || []).map((email) => ({ value: email })),
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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight max-md:text-center">
          Organization Management
        </h1>
        <p className="text-muted-foreground mt-2 max-md:text-center">
          Manage your company profile, team members, and audit logs
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader
          className="border-b bg-muted/30 "
          role="button"
          aria-expanded={!collapsed}
        >
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex w-full flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 size={22} className="text-blue-500" />
              </div>
              <div className="w-full text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Company Profile
                </h2>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Manage your organization&apos;s basic information and contact
                  details
                </CardDescription>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCollapsed((s) => !s)}
              aria-label={
                collapsed
                  ? 'Expand company profile'
                  : 'Collapse company profile'
              }
              className="flex items-center gap-2 text-sm px-3 py-2 rounded hover:bg-muted md:ml-auto"
            >
              <span className="select-none">
                {collapsed ? 'Expand' : 'Collapse'}
              </span>
              {/* simple chevron svg that rotates */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                  transition: 'transform 180ms ease',
                }}
                aria-hidden
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </CardHeader>

        {/* animated collapse using max-height transition */}
        <CardContent
          className="pt-8"
          style={{
            maxHeight: collapsed ? '100px' : '2000px',
            overflow: 'hidden',
            transition: 'max-height 800ms ease',
          }}
          aria-hidden={collapsed}
        >
          {!orgData ? (
            <div className="flex items-center justify-center py-12">
              <div
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-3 px-5 py-3 bg-muted rounded-lg"
              >
                <span className="w-5 h-5 border-3 border-t-transparent border-primary rounded-full animate-spin" />
                <span className="text-sm font-medium text-foreground">
                  Loading organization data...
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
                    Basic Information
                  </h3>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    {...register('companyName')}
                    defaultValue={orgData?.name ?? ''}
                    placeholder="Enter company name"
                    className="h-11"
                  />
                  {errors.companyName && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                      <span className="font-medium">⚠</span>
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                {/* Industry & Phone in Grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm font-medium">
                      Industry <span className="text-destructive">*</span>
                    </Label>
                    <Controller
                      name="industry"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value || ''}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Healthcare">
                              Healthcare
                            </SelectItem>
                            <SelectItem value="Manufacturing">
                              Manufacturing
                            </SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.industry && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                        <span className="font-medium">⚠</span>
                        {errors.industry.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label
                      htmlFor="domain"
                      className="text-sm font-medium flex items-center gap-1"
                    >
                      Company Domain{' '}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 text-blue-400 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              พนักงานในองค์กรจะได้ email นี้ในการเข้าสู่ระบบ
                              เช่น employee@example.com
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="domain"
                      {...register('domain')}
                      defaultValue={orgData?.domain ?? ''}
                      placeholder="example.com"
                      className="h-11"
                    />
                    {errors.domain && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                        <span className="font-medium">⚠</span>
                        {errors.domain.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locale" className="text-sm font-medium">
                      Locale
                    </Label>
                    <Input
                      id="locale"
                      {...register('locale')}
                      defaultValue={orgData?.locale ?? ''}
                      placeholder="en-US"
                      className="h-11"
                    />
                    {errors.locale && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                        <span className="font-medium">⚠</span>
                        {errors.locale.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-sm font-medium">
                      Currency
                    </Label>
                    <Controller
                      name="currency"
                      control={control}
                      defaultValue={orgData?.currency ?? ''}
                      render={({ field }) => (
                        <Select
                          value={field.value || ''}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currency.map((cur) => (
                              <SelectItem key={cur} value={cur}>
                                {cur}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.currency && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                        <span className="font-medium">⚠</span>
                        {errors.currency.message}
                      </p>
                    )}
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm font-medium">
                      Timezone
                    </Label>
                    <Input
                      id="timezone"
                      {...register('timezone')}
                      defaultValue={orgData?.timezone ?? ''}
                      placeholder="e.g., America/New_York"
                      className="h-11"
                    />
                    {errors.timezone && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                        <span className="font-medium">⚠</span>
                        {errors.timezone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    {...register('website')}
                    defaultValue={orgData?.website ?? ''}
                    placeholder="https://www.example.com"
                    className="h-11"
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                      <span className="font-medium">⚠</span>
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center justify-between">
                    <span>
                      Phone Numbers <span className="text-destructive">*</span>
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendPhone({ value: '' })}
                      className="h-9"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Phone
                    </Button>
                  </Label>

                  {/* Single fallback when no phoneFields present (keeps backwards compatibility) */}
                  {!phoneFields || phoneFields.length === 0 ? (
                    <div>
                      <Controller
                        name="phone.0.value"
                        control={control}
                        defaultValue={
                          Array.isArray(orgData?.phone)
                            ? orgData.phone[0] ?? ''
                            : orgData?.phone ?? ''
                        }
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            value={
                              field.value ??
                              (Array.isArray(orgData?.phone)
                                ? orgData.phone[0] ?? ''
                                : orgData?.phone ?? '')
                            }
                            onChange={(val) => field.onChange(val)}
                            defaultCountry="US"
                            international
                            withCountryCallingCode
                            id="phone"
                            className="phone-input h-11"
                          />
                        )}
                      />
                      {errors.phone && !Array.isArray(errors.phone) && (
                        <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                          <span className="font-medium">⚠</span>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {phoneFields.map((f, index) => (
                        <div key={f.id} className="flex items-start gap-3">
                          <div className="flex-1">
                            <Controller
                              name={`phone.${index}.value`}
                              control={control}
                              defaultValue={
                                Array.isArray(orgData?.phone)
                                  ? orgData.phone[index] ?? ''
                                  : index === 0
                                    ? orgData?.phone ?? ''
                                    : ''
                              }
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  value={field.value ?? ''}
                                  onChange={(val) => field.onChange(val)}
                                  defaultCountry="US"
                                  international
                                  withCountryCallingCode
                                  id={`phone-${index}`}
                                  className="phone-input h-11"
                                />
                              )}
                            />
                            {errors.phone?.[index] && (
                              <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                                <span className="font-medium">⚠</span>
                                {errors.phone[index]?.message as string}
                              </p>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removePhone(index)}
                            className="h-11 w-11 shrink-0 hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Email Addresses */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Mail size={16} />
                      Email Addresses
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ value: '' })}
                      className="h-9"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Email
                    </Button>
                  </div>

                  {fields.length === 0 && (
                    <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 text-center border border-dashed">
                      No email addresses added yet. Click &quot;Add Email&quot;
                      to get started.
                    </div>
                  )}

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-3">
                        <div className="flex-1">
                          <Input
                            {...register(`email.${index}.value` as const)}
                            placeholder="email@example.com"
                            className="h-11"
                          />
                          {errors.email?.[index] && (
                            <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                              <span className="font-medium">⚠</span>
                              {errors.email[index]?.message as string}
                            </p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-11 w-11 shrink-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    defaultValue={orgData?.address ?? ''}
                    placeholder="Enter complete address"
                    rows={3}
                    className="resize-none"
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                      <span className="font-medium">⚠</span>
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
                    Additional Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    defaultValue={orgData?.description ?? ''}
                    placeholder="Brief description of your company and its services"
                    rows={4}
                    className="resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-1.5">
                      <span className="font-medium">⚠</span>
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Collapsible>
                    <CollapsibleTrigger
                      onClick={() => setSocialCollapsed(!socialCollapsed)}
                      className="w-full text-left cursor-pointer font-medium flex items-center gap-2 rounded py-2"
                    >
                      Social Media Contact{' '}
                      {socialCollapsed ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            transform: socialCollapsed
                              ? 'rotate(-90deg)'
                              : 'rotate(0deg)',
                            transition: 'transform 180ms ease',
                          }}
                          aria-hidden
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            transform: socialCollapsed
                              ? 'rotate(0deg)'
                              : 'rotate(90deg)',
                            transition: 'transform 180ms ease',
                          }}
                          aria-hidden
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </CollapsibleTrigger>
                    <CollapsiblePanel>
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          {...register('facebook')}
                          defaultValue={orgData?.facebook ?? ''}
                          id="facebook"
                          placeholder="Facebook URL"
                          className="h-11 mt-1"
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          {...register('twitter')}
                          defaultValue={orgData?.twitter ?? ''}
                          id="twitter"
                          placeholder="Twitter URL"
                          className="h-11 mt-1"
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          {...register('instagram')}
                          defaultValue={orgData?.instagram ?? ''}
                          id="instagram"
                          placeholder="Instagram URL"
                          className="h-11 mt-1"
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="line">Line Official Account</Label>
                        <Input
                          {...register('line')}
                          defaultValue={orgData?.line ?? ''}
                          id="line"
                          placeholder="Line URL"
                          className="h-11 mt-1"
                        />
                      </div>
                    </CollapsiblePanel>
                  </Collapsible>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  variant={'primary'}
                  className="w-full h-12 text-base font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      Saving changes...
                    </span>
                  ) : (
                    'Update Company Profile'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm mt-8">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle>
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-col">
                <div className="p-2 flex gap-3 items-center">
                  <div className="bg-blue-500/10 rounded-lg p-2">
                    <UserRound size={22} className="text-blue-500" />
                  </div>
                  <h2 className="text-xl font-semibold">Team Members</h2>
                </div>
                <div className="text-sm text-muted-foreground mt-1 text-center md:text-left">
                  Manage team members, roles, and permissions
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 md:ml-auto mt-2 md:mt-0"
              >
                <Plus size={16} className="mr-1" />
                Add Team Member
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <TeamMember />
        </CardContent>
      </Card>
    </div>
  );
}
