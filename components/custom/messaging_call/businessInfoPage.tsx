// @ts-nocheck
'use client'
import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { Loader2, Building, Bot, Edit2, Save, X, Info, Target, BriefcaseBusiness } from 'lucide-react'
import { toast } from 'sonner'

// shadcn Card components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// shadcn Button, Input and Textarea components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
// shadcn Dialog components
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
// shadcn Form components
import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
// shadcn Select components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BusinessInfoPage() {
  const { t } = useTranslation('common')
  const [isLoading, setIsLoading] = useState(false)
  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Acme Corporation',
    industry: 'Technology',
    chatbotPurpose: 'Customer Support',
    businessDetails: 'We provide innovative software solutions to businesses of all sizes. Our flagship product, AcmeOS, helps companies streamline their operations and improve efficiency.',
    chatbotInfo: 'Our chatbot handles customer inquiries 24/7, providing technical support and answering FAQs about our products and services.',
    lastUpdated: new Date().toLocaleDateString()
  })

  const handleSaveBusinessInfo = (data) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Updated Business Info:', data)
      setBusinessInfo({
        ...data,
        lastUpdated: new Date().toLocaleDateString()
      })
      setIsLoading(false)
      
      // Show success toast with Sonner
      toast.success(t('dashboard.updateSuccess', 'Business information updated'), {
        description: t('dashboard.updateSuccessMessage', 'Your changes have been saved successfully.'),
        duration: 3000
      })
    }, 800)
  }

  return (
    <div className="">
      <Card className="bg-gray-900 border-gray-800 shadow-md overflow-hidden">
        <CardHeader className="border-b border-gray-800 bg-gray-950 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-xl">
                {t('dashboard.businessInfoTitle', 'Business Information')}
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                {t('dashboard.businessInfoDesc', 'Configure how your business appears to customers')}
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit2 className="h-4 w-4" />
                  {t('dashboard.editBusinessInfo', 'Edit Information')}
                </Button>
              </DialogTrigger>
              <BusinessInfoDialog 
                defaultValues={businessInfo} 
                onSave={handleSaveBusinessInfo}
                isLoading={isLoading}
              />
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-5 w-5 text-blue-400" />
                  <h3 className="text-gray-300 font-medium">
                    {t('dashboard.businessDetails', 'Business Details')}
                  </h3>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">
                      {t('dashboard.businessNameLabel', 'Business Name')}
                    </p>
                    <p className="text-white font-medium">
                      {businessInfo.businessName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {t('dashboard.industryLabel', 'Industry')}
                    </p>
                    <p className="text-white font-medium">
                      {businessInfo.industry}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {t('dashboard.lastUpdatedLabel', 'Last Updated')}
                    </p>
                    <p className="text-white font-medium">
                      {businessInfo.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-purple-400" />
                  <h3 className="text-gray-300 font-medium">
                    {t('dashboard.businessDescription', 'Business Description')}
                  </h3>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-white text-sm leading-relaxed">
                    {businessInfo.businessDetails}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-amber-400" />
                  <h3 className="text-gray-300 font-medium">
                    {t('dashboard.chatbotPurpose', 'Chatbot Purpose')}
                  </h3>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-white font-medium">
                    {businessInfo.chatbotPurpose}
                  </p>
                </div>
              </div>
            
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-5 w-5 text-green-400" />
                  <h3 className="text-gray-300 font-medium">
                    {t('dashboard.chatbotSettings', 'Chatbot Information')}
                  </h3>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-white text-sm leading-relaxed">
                    {businessInfo.chatbotInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BusinessInfoDialog({ defaultValues, onSave, isLoading }) {
  const { t } = useTranslation('common')
  const [enhancing, setEnhancing] = useState(false)
  const [enhancingBusinessDetails, setEnhancingBusinessDetails] = useState(false)
  const [enhancingChatbotInfo, setEnhancingChatbotInfo] = useState(false)
  
  const methods = useForm({ 
    defaultValues,
    mode: 'onChange'
  })

  const chatbotPurposes = [
    { value: 'Customer Support', label: 'Customer Support' },
    { value: 'Sales Assistance', label: 'Sales Assistance' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Lead Generation', label: 'Lead Generation' },
    { value: 'Product Information', label: 'Product Information' },
    { value: 'FAQ', label: 'Frequently Asked Questions' },
    { value: 'Other', label: 'Other' }
  ]

  const industries = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Education', label: 'Education' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Other', label: 'Other' }
  ]

  // --- Enhance Functions for Each Field ---
  const handleEnhanceBusinessDetails = async () => {
    try {
      setEnhancingBusinessDetails(true)
      toast.loading(t('dashboard.enhancing', 'Enhancing your business information...'), {
        id: 'enhancing-business-details-toast'
      })
      const currentValue = methods.getValues('businessDetails')
      const response = await fetch('/api/aiEnhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentValue,
          field: 'businessDetails'
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to enhance business details')
      }
      
      const result = await response.json()
      toast.dismiss('enhancing-business-details-toast')
      methods.setValue('businessDetails', result.enhancedPrompt, { shouldDirty: true })
      toast.success(t('dashboard.enhanceSuccess', 'Business details enhanced successfully'))
      setEnhancingBusinessDetails(false)
    } catch (error) {
      console.error('Error enhancing business details:', error)
      toast.dismiss('enhancing-business-details-toast')
      toast.error(t('dashboard.enhanceError', 'Enhancement Failed'))
      setEnhancingBusinessDetails(false)
    }
  }

  const handleEnhanceChatbotInfo = async () => {
    try {
      setEnhancingChatbotInfo(true)
      toast.loading(t('dashboard.enhancing', 'Enhancing your chatbot information...'), {
        id: 'enhancing-chatbot-info-toast'
      })
      const currentChatbotInfo = methods.getValues('chatbotInfo')
      const industry = methods.getValues('industry')
      const purpose = methods.getValues('chatbotPurpose')
      const businessDetails = methods.getValues('businessDetails')
      const response = await fetch('/api/aiEnhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentChatbotInfo,
          industry,
          purpose,
          businessDetails,
          field: 'chatbotInfo'
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to enhance chatbot information')
      }
      
      const result = await response.json()
      toast.dismiss('enhancing-chatbot-info-toast')
      methods.setValue('chatbotInfo', result.enhancedPrompt, { shouldDirty: true })
      toast.success(t('dashboard.enhanceSuccess', 'Chatbot information enhanced successfully'))
      setEnhancingChatbotInfo(false)
    } catch (error) {
      console.error('Error enhancing chatbot information:', error)
      toast.dismiss('enhancing-chatbot-info-toast')
      toast.error(t('dashboard.enhanceError', 'Enhancement Failed'))
      setEnhancingChatbotInfo(false)
    }
  }

  const handleSubmit = async (data) => {
    try {
      setEnhancing(true)
      
      // Show enhancing toast with Sonner (this is for the overall save)
      toast.loading(t('dashboard.enhancing', 'Enhancing your chatbot information...'), {
        id: 'enhancing-toast'
      })
      
      // Call the API endpoint to enhance the chatbot prompt via OpenAI
      const response = await fetch('/api/aiEnhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: data.chatbotInfo,
          industry: data.industry,
          purpose: data.chatbotPurpose,
          businessDetails: data.businessDetails,
          field: 'chatbotInfo'
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to enhance prompt')
      }
      
      const result = await response.json()

      // Merge the enhanced prompt with the other form data
      const enhancedData = { ...data, chatbotInfo: result.enhancedPrompt }
      
      // Dismiss the loading toast
      toast.dismiss('enhancing-toast')
      
      // Call the save function
      onSave(enhancedData)
      setEnhancing(false)
    } catch (error) {
      console.error('Error enhancing prompt:', error)
      setEnhancing(false)
      
      // Dismiss the loading toast and show error
      toast.dismiss('enhancing-toast')
      toast.error(t('dashboard.enhanceError', 'Enhancement Failed'), {
        description: t('dashboard.enhanceErrorMessage', 'Failed to enhance your chatbot information. Using original text.'),
        action: {
          label: 'Try again',
          onClick: () => handleSubmit(data)
        }
      })
      
      // Fall back to using the original data
      onSave(data)
    }
  }

  return (
    <DialogContent className="max-w-full h-screen p-0 bg-gray-900 border-gray-800 text-white">
      <div className="flex h-full flex-col">
        <DialogHeader className="border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl text-white">
              {t('dashboard.editBusinessInfoTitle', 'Edit Business Information')}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <FormProvider {...methods}>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-gray-850 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BriefcaseBusiness className="h-5 w-5 text-blue-400" />
                      <h3 className="text-gray-300 font-medium text-lg">
                        {t('dashboard.basicBusinessInfo', 'Basic Business Information')}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={methods.control}
                        name="businessName"
                        rules={{ required: 'Business name is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">{t('dashboard.businessNameLabel', 'Business Name')}</FormLabel>
                            <Input
                              placeholder={t('dashboard.businessNamePlaceholder', 'Enter your business name')}
                              {...field}
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={methods.control}
                        name="industry"
                        rules={{ required: 'Industry is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">{t('dashboard.industryLabel', 'Industry')}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder={t('dashboard.selectIndustry', 'Select an industry')} />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                {industries.map((industry) => (
                                  <SelectItem key={industry.value} value={industry.value}>
                                    {industry.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-gray-400 text-xs">
                              {t('dashboard.industryHelp', 'Selecting the correct industry helps us tailor the chatbot experience.')}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={methods.control}
                        name="businessDetails"
                        rules={{ required: 'Business details are required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">{t('dashboard.businessDetailsLabel', 'Detailed Business Information')}</FormLabel>
                            <Textarea
                              placeholder={t('dashboard.businessDetailsPlaceholder', 'Describe your business, products, services, and unique value proposition')}
                              {...field}
                              className="h-40 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                            />
                            {/* Enhance Button for Detailed Business Information */}
                            <div className="mt-2 flex justify-end">
                              <Button 
                                onClick={handleEnhanceBusinessDetails} 
                                disabled={enhancingBusinessDetails} 
                                variant="secondary" 
                                size="sm"
                              >
                                {enhancingBusinessDetails ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {t('dashboard.enhancing', 'Enhancing...')}
                                  </>
                                ) : (
                                  t('dashboard.enhanceWithAI', 'Enhance with AI')
                                )}
                              </Button>
                            </div>
                            <FormDescription className="text-gray-400 text-xs">
                              {t('dashboard.businessDetailsHelp', 'Include information about your company history, values, products, and services.')}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-gray-850 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="h-5 w-5 text-green-400" />
                      <h3 className="text-gray-300 font-medium text-lg">
                        {t('dashboard.chatbotConfiguration', 'Chatbot Configuration')}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={methods.control}
                        name="chatbotPurpose"
                        rules={{ required: 'Chatbot purpose is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">{t('dashboard.chatbotPurposeLabel', 'Chatbot Purpose')}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder={t('dashboard.selectPurpose', 'Select a purpose')} />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                {chatbotPurposes.map((purpose) => (
                                  <SelectItem key={purpose.value} value={purpose.value}>
                                    {purpose.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-gray-400 text-xs">
                              {t('dashboard.purposeHelp', 'This helps us optimize your chatbot for specific types of interactions.')}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={methods.control}
                        name="chatbotInfo"
                        rules={{ required: 'Chatbot information is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">{t('dashboard.chatbotInfoLabel', 'Chatbot Information')}</FormLabel>
                            <Textarea
                              placeholder={t('dashboard.chatbotInfoPlaceholder', 'Describe what your chatbot should know about your business')}
                              {...field}
                              className="h-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                            />
                            {/* Enhance Button for Chatbot Information */}
                            <div className="mt-2 flex justify-end">
                              <Button 
                                onClick={handleEnhanceChatbotInfo} 
                                disabled={enhancingChatbotInfo} 
                                variant="secondary" 
                                size="sm"
                              >
                                {enhancingChatbotInfo ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {t('dashboard.enhancing', 'Enhancing...')}
                                  </>
                                ) : (
                                  t('dashboard.enhanceWithAI', 'Enhance with AI')
                                )}
                              </Button>
                            </div>
                            <FormDescription className="text-gray-400 text-xs">
                              {t('dashboard.chatbotInfoHelp', 'This information will be used to train your AI chatbot. Be specific about your products, services, and policies.')}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="border-t border-gray-800 p-6 flex items-center justify-end gap-3">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex items-center gap-1 bg-gray-800 border-gray-700 hover:bg-gray-700">
                  <X className="h-4 w-4" />
                  {t('dashboard.cancel', 'Cancel')}
                </Button>
              </DialogClose>
              
              <Button 
                onClick={methods.handleSubmit(handleSubmit)}
                disabled={isLoading || enhancing || !methods.formState.isDirty}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
              >
                {(isLoading || enhancing) ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isLoading 
                      ? t('dashboard.saving', 'Saving...') 
                      : t('dashboard.processing', 'Processing...')}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {t('dashboard.save', 'Save Changes')}
                  </>
                )}
              </Button>
            </div>
          </Form>
        </FormProvider>
      </div>
    </DialogContent>
  )
}
