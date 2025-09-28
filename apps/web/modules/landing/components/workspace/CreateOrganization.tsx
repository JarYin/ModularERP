'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Users,
  Settings,
  CheckCircle,
  Upload,
  Globe,
  Mail,
  UserPlus,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { timezones } from '../../hook/timezone';
import { TimezoneCombobox } from '@/modules/organization/components/TimezoneCombobox';

export default function CreateOrganization() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [teamEmail, setTeamEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    industry: '',
    organization_size: '',
    domain: '',
    currency: '',
    phone: '',
    locale: '',
    timezone: '',
    subscription_plan: '',
    settings: {},
    status: '',
    address: '',
    logo: null,
    teamEmails: [] as string[],
  });

  const handleAddTeamEmail = () => {
    if (teamEmail.trim() === '') return;
    setFormData((prev) => ({
      ...prev,
      teamEmails: [...prev.teamEmails, teamEmail.trim()],
    }));
    setTeamEmail('');
  };

  const steps = [
    {
      id: 1,
      title: 'Basic Info',
      icon: Building2,
      description: 'Tell us about your organization',
    },
    {
      id: 2,
      title: 'Details',
      icon: Settings,
      description: 'Configure your organization settings',
    },
    {
      id: 3,
      title: 'Team',
      icon: Users,
      description: 'Invite your team members',
    },
    {
      id: 4,
      title: 'Review',
      icon: CheckCircle,
      description: 'Review and create',
    },
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Marketing',
    'Non-profit',
    'Other',
  ];

  const organizationSizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees',
  ];

  const language = ['TH', 'EN'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
    // Handle success
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.industry && formData.locale;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Let&apos;s start with the basics
              </h2>
              <p className="text-gray-300">
                Give your organization a name and tell us what it&apos;s about
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization Name *
                </label>
                <Input
                  placeholder="Enter your organization name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe what your organization does..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 rounded-xl p-3 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website (Optional)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange('website', e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 h-12 rounded-xl pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Organization Details
              </h2>
              <p className="text-gray-300">
                Help us understand your organization better
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry *
                </label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    handleInputChange('industry', value)
                  }
                >
                  <SelectTrigger className="w-full h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-white focus:bg-white/15 focus:border-white/30">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Locale *
                </label>
                <Select
                  value={formData.locale}
                  onValueChange={(value) => handleInputChange('locale', value)}
                >
                  <SelectTrigger className="w-full h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-white focus:bg-white/15 focus:border-white/30">
                    <SelectValue placeholder="Select locale" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    {language.map((ln) => (
                      <SelectItem key={ln} value={ln}>
                        {ln}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <Select
                  value={formData.locale}
                  onValueChange={(value) => handleInputChange('locale', value)}
                >
                  <SelectTrigger className="w-full h-12 rounded-xl border cursor-pointer border-white/20 bg-white/10 px-3 text-white focus:bg-white/15 focus:border-white/30">
                    <SelectValue placeholder="Select locale" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    {language.map((ln) => (
                      <SelectItem key={ln} value={ln}>
                        {ln}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <TimezoneCombobox />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <Input className="w-full h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-white focus:bg-white/15 focus:border-white/30" />
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <Textarea className="w-full h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-white focus:bg-white/15 focus:border-white/30" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization Logo
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/30 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-400">
                    SVG, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Enter email address"
                  value={teamEmail}
                  onChange={(e) => setTeamEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 h-12 rounded-xl pl-10"
                />
              </div>
              <Button
                onClick={handleAddTeamEmail}
                className="bg-green-500 hover:bg-green-600 text-white h-12 px-6 rounded-xl"
              >
                <UserPlus className="w-5 h-5" />
              </Button>
            </div>

            {/* แสดง email ทั้งหมด */}
            <div className="grid md:grid-cols-2 gap-4">
              {formData.teamEmails.map((email, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={email}
                    readOnly
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-white/30 h-10 rounded-lg text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Pro Tip</h4>
                  <p className="text-blue-200 text-sm">
                    You can always invite more team members later from your
                    organization dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-slide-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Almost Done!
              </h2>
              <p className="text-gray-300">
                Review your organization details before creating
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">
                    Basic Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">
                        {formData.name || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Industry:</span>
                      <span className="text-white">
                        {formData.industry || 'Not specified'}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-gray-400">Size:</span>
                      <span className="text-white">
                        {formData.organization_size || 'Not specified'}
                      </span>
                    </div> */}
                    {/* <div className="flex justify-between">
                      <span className="text-gray-400">Privacy:</span>
                      <span className="text-white">
                        {formData.isPrivate ? 'Private' : 'Public'}
                      </span>
                    </div> */}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">
                    Additional Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Website:</span>
                      <span className="text-white">
                        {formData.website || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Description:</span>
                      <span className="text-white text-right max-w-[200px] truncate">
                        {formData.description || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium mb-1">
                    Ready to Create
                  </h4>
                  <p className="text-green-200 text-sm">
                    Your organization will be created with the settings above.
                    You can always modify these later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/workspace"
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Welcome</span>
          </Link>
          <div className="text-white text-sm">
            Step {currentStep} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    step.id <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-center mt-2">
                  <div
                    className={`text-sm font-medium transition-colors ${
                      step.id <= currentStep ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/10">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/15 disabled:opacity-50 h-12 px-6 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white font-semibold h-12 px-6 rounded-xl disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold h-12 px-8 rounded-xl disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Create Organization</span>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>

      <style>{`
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-slide-in {
                    animation: slide-in 0.5s ease-out forwards;
                }
                
                .animate-bounce-gentle {
                    animation: bounce-gentle 3s ease-in-out infinite;
                }
            `}</style>
    </div>
  );
}
