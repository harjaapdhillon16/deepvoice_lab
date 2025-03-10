// @ts-nocheck
// pages/onboarding.js
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Building, Phone, Briefcase, Globe } from 'lucide-react'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      // Business Info
      businessName: '',
      industry: '',
      companySize: '',
      role: '',
      website: '',

      // Use Case
      useCaseType: [],
      callVolume: '',
      currentSolution: '',

      // Call Scenarios
      callScenarios: [],
      customScenarios: '',

      // Technical Setup
      phoneNumberType: '',
      existingPhoneSystem: '',
      dataPrivacy: []
    }
  })

  const handleCheckboxChange = (e, fieldName) => {
    const { value, checked } = e.target
    const currentValues = watch(fieldName) || []

    if (checked) {
      setValue(fieldName, [...currentValues, value])
    } else {
      setValue(fieldName, currentValues.filter(item => item !== value))
    }
  }

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    window.scrollTo(0, 0)
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  const onSubmit = (data) => {
    console.log('Complete onboarding data:', data)
    // Navigate to dashboard or success page
    // router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.3
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight inline-flex items-center"
            >
              <span className="text-white">AI</span>
              <span className="text-emerald-400">NEXUS</span>
              <span className="ml-1 inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Need help?</span>
              <Link 
                href="/contact" 
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Setup your AI Call Center</h2>
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Business Info</span>
            <span>Use Case</span>
            <span>Call Scenarios</span>
            <span>Setup</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mr-4">
                      <Building className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">Business Information</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">
                        Business Name
                      </label>
                      <input
                        id="businessName"
                        {...register("businessName", { required: "Business name is required" })}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        placeholder="Your company name"
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-sm text-red-400">{errors.businessName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-1">
                        Industry
                      </label>
                      <Controller
                        name="industry"
                        control={control}
                        rules={{ required: "Please select your industry" }}
                        render={({ field }) => (
                          <select
                            id="industry"
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                          >
                            <option value="" disabled>Select your industry</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance & Banking</option>
                            <option value="retail">Retail & E-commerce</option>
                            <option value="technology">Technology & SaaS</option>
                            <option value="education">Education</option>
                            <option value="insurance">Insurance</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="travel">Travel & Hospitality</option>
                            <option value="telecommunications">Telecommunications</option>
                            <option value="government">Government</option>
                            <option value="nonprofit">Nonprofit</option>
                            <option value="other">Other</option>
                          </select>
                        )}
                      />
                      {errors.industry && (
                        <p className="mt-1 text-sm text-red-400">{errors.industry.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-1">
                        Company Size
                      </label>
                      <Controller
                        name="companySize"
                        control={control}
                        rules={{ required: "Please select company size" }}
                        render={({ field }) => (
                          <select
                            id="companySize"
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                          >
                            <option value="" disabled>Select company size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="501-1000">501-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        )}
                      />
                      {errors.companySize && (
                        <p className="mt-1 text-sm text-red-400">{errors.companySize.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Role
                      </label>
                      <input
                        id="role"
                        {...register("role", { required: "Your role is required" })}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        placeholder="e.g. CEO, Marketing Director, Sales Manager"
                      />
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                        Company Website
                      </label>
                      <input
                        id="website"
                        {...register("website", { 
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i,
                            message: "Please enter a valid URL"
                          }
                        })}
                        type="url"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        placeholder="https://example.com"
                      />
                      {errors.website && (
                        <p className="mt-1 text-sm text-red-400">{errors.website.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Use Case */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">Use Case</h2>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Tell us how you plan to use AI calling to help us customize your experience.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        What type of calls will you be making or receiving?
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: 'outbound', label: 'Outbound Calls', desc: 'Making calls to customers, leads, or prospects' },
                          { id: 'inbound', label: 'Inbound Calls', desc: 'Receiving and handling incoming calls' },
                          { id: 'virtualReceptionist', label: 'Virtual Receptionist', desc: 'Handling call routing, scheduling, and basic inquiries' }
                        ].map((option) => {
                          const fieldName = "useCaseType"
                          const values = watch(fieldName) || []

                          return (
                            <div key={option.id} className="flex items-start">
                              <input
                                id={option.id}
                                type="checkbox"
                                value={option.id}
                                checked={values.includes(option.id)}
                                onChange={(e) => handleCheckboxChange(e, fieldName)}
                                className="h-5 w-5 mt-1 rounded border-gray-700 bg-black/50 text-emerald-500 focus:ring-emerald-500/50"
                              />
                              <div className="ml-3">
                                <label htmlFor={option.id} className="font-medium text-white">
                                  {option.label}
                                </label>
                                <p className="text-sm text-gray-400">
                                  {option.desc}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {errors.useCaseType && (
                        <p className="mt-1 text-sm text-red-400">{errors.useCaseType.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="callVolume" className="block text-sm font-medium text-gray-300 mb-1">
                        Estimated Call Volume (per month)
                      </label>
                      <Controller
                        name="callVolume"
                        control={control}
                        rules={{ required: "Please select estimated call volume" }}
                        render={({ field }) => (
                          <select
                            id="callVolume"
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                          >
                            <option value="" disabled>Select estimated volume</option>
                            <option value="less-than-100">Less than 100 calls</option>
                            <option value="100-500">100-500 calls</option>
                            <option value="501-1000">501-1,000 calls</option>
                            <option value="1001-5000">1,001-5,000 calls</option>
                            <option value="5001-10000">5,001-10,000 calls</option>
                            <option value="10000+">More than 10,000 calls</option>
                          </select>
                        )}
                      />
                      {errors.callVolume && (
                        <p className="mt-1 text-sm text-red-400">{errors.callVolume.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="currentSolution" className="block text-sm font-medium text-gray-300 mb-1">
                        Current Calling Solution
                      </label>
                      <Controller
                        name="currentSolution"
                        control={control}
                        render={({ field }) => (
                          <select
                            id="currentSolution"
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                          >
                            <option value="" disabled>Select current solution</option>
                            <option value="call-center">Human call center</option>
                            <option value="sales-team">In-house sales/support team</option>
                            <option value="virtual-receptionist">Virtual receptionist service</option>
                            <option value="basic-ivr">Basic IVR/automated phone system</option>
                            <option value="voicemail">Voicemail only</option>
                            <option value="none">No current solution</option>
                            <option value="other">Other</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex items-center px-6 py-3 rounded-full border border-gray-800 text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Call Scenarios */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mr-4">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">Call Scenarios</h2>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Select the types of conversations your AI will handle.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        What types of call scenarios do you need?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { id: 'sales', label: 'Sales Calls', desc: 'Product pitches and sales' },
                          { id: 'leadQualification', label: 'Lead Qualification', desc: 'Qualifying potential customers' },
                          { id: 'customerService', label: 'Customer Service', desc: 'Handling support inquiries' },
                          { id: 'appointments', label: 'Appointment Setting', desc: 'Scheduling appointments' },
                          { id: 'surveys', label: 'Surveys & Feedback', desc: 'Collecting customer feedback' },
                          { id: 'faq', label: 'FAQ & Information', desc: 'Answering common questions' },
                          { id: 'orderProcessing', label: 'Order Processing', desc: 'Taking and processing orders' },
                          { id: 'followUp', label: 'Follow-up Calls', desc: 'Following up with leads/customers' }
                        ].map((scenario) => {
                          const fieldName = "callScenarios"
                          const values = watch(fieldName) || []

                          return (
                            <div key={scenario.id} className="flex items-start">
                              <input
                                id={`scenario-${scenario.id}`}
                                type="checkbox"
                                value={scenario.id}
                                checked={values.includes(scenario.id)}
                                onChange={(e) => handleCheckboxChange(e, fieldName)}
                                className="h-5 w-5 mt-1 rounded border-gray-700 bg-black/50 text-emerald-500 focus:ring-emerald-500/50"
                              />
                              <div className="ml-3">
                                <label htmlFor={`scenario-${scenario.id}`} className="font-medium text-white">
                                  {scenario.label}
                                </label>
                                <p className="text-xs text-gray-400">{scenario.desc}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {errors.callScenarios && (
                        <p className="mt-1 text-sm text-red-400">{errors.callScenarios.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="customScenarios" className="block text-sm font-medium text-gray-300 mb-1">
                        Other specific scenarios (optional)
                      </label>
                      <textarea
                        id="customScenarios"
                        {...register("customScenarios")}
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        placeholder="Describe any custom call scenarios you need"
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Describe any specific conversation flows or scenarios not covered above.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex items-center px-6 py-3 rounded-full border border-gray-800 text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Technical Setup */}
            {currentStep === 4 && (
              <div className="animate-fadeIn">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mr-4">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">Technical Setup</h2>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Provide details about your current technical setup.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="phoneNumberType" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number Type
                      </label>
                      <Controller
                        name="phoneNumberType"
                        control={control}
                        render={({ field }) => (
                          <select
                            id="phoneNumberType"
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                          >
                            <option value="" disabled>Select phone number type</option>
                            <option value="toll-free">Toll-Free</option>
                            <option value="local">Local</option>
                            <option value="voip">VoIP</option>
                            <option value="other">Other</option>
                          </select>
                        )}
                      />
                    </div>
                    <div>
                      <label htmlFor="existingPhoneSystem" className="block text-sm font-medium text-gray-300 mb-1">
                        Existing Phone System
                      </label>
                      <input
                        id="existingPhoneSystem"
                        {...register("existingPhoneSystem")}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        placeholder="e.g. RingCentral, Zoom Phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Data Privacy Preferences
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'gdpr', label: 'GDPR Compliant' },
                          { id: 'ccpa', label: 'CCPA Compliant' },
                          { id: 'hipaa', label: 'HIPAA Compliant' }
                        ].map((privacy) => {
                          const fieldName = "dataPrivacy"
                          const values = watch(fieldName) || []
                          return (
                            <div key={privacy.id} className="flex items-center">
                              <input
                                id={`privacy-${privacy.id}`}
                                type="checkbox"
                                value={privacy.id}
                                checked={values.includes(privacy.id)}
                                onChange={(e) => handleCheckboxChange(e, fieldName)}
                                className="h-5 w-5 rounded border-gray-700 bg-black/50 text-emerald-500 focus:ring-emerald-500/50"
                              />
                              <label htmlFor={`privacy-${privacy.id}`} className="ml-2 text-white">
                                {privacy.label}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex items-center px-6 py-3 rounded-full border border-gray-800 text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Submit
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}