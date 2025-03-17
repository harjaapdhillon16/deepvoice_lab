// @ts-nocheck
'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/custom/messaging_call/sidebar'
import { useTranslation } from 'next-i18next'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Bell,
    User,
    Mail,
    Phone,
    MessageSquare,
    HelpCircle,
    FileText,
    Check,
    Loader2,
    ChevronDown,
    ChevronUp,
    FileQuestion,
    BookOpen,
    Search
} from "lucide-react"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Support() {
    const { t } = useTranslation('common')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

    // Mock user data
    const userData = {
        name: "Admin User",
        avatar: "/api/placeholder/32/32",
        email: "admin@company.com"
    }

    // Form state
    const [formData, setFormData] = useState({
        subject: "",
        category: "",
        description: "",
        email: userData.email
    })

    // FAQ data
    const faqItems = [
        {
            question: "How do I change my subscription plan?",
            answer: "To change your subscription plan, go to Settings > Subscription Plan and click on the 'Upgrade' button. You'll be able to select a new plan from the available options."
        },
        {
            question: "How can I update my billing information?",
            answer: "To update your billing information, navigate to Settings > Subscription Plan and click on 'Manage Payment Methods'. From there, you can add, edit, or remove payment methods."
        },
        {
            question: "Can I add additional phone numbers to my account?",
            answer: "Yes, you can add additional phone numbers to your account. Go to Settings > Phone Number and click on 'Request Additional Number'. Additional charges may apply based on your current subscription plan."
        },
        {
            question: "How do I enable call recording?",
            answer: "To enable call recording, go to Settings > Phone Number > Configure Voice Settings. Toggle the call recording option to 'Enabled'. Please ensure you comply with all applicable laws regarding call recording in your jurisdiction."
        },
        {
            question: "What happens when my subscription expires?",
            answer: "When your subscription expires, your account will be downgraded to the free tier with limited functionality. Your data will be preserved for 30 days, after which it may be archived or deleted according to our data retention policy."
        }
    ]

    const handleFormChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitSuccess(true)

            // Reset form
            setFormData({
                subject: "",
                category: "",
                description: "",
                email: userData.email
            })

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSubmitSuccess(false)
            }, 5000)
        }, 1500)
    }

    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredFaqs, setFilteredFaqs] = React.useState([]);


    React.useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredFaqs(faqItems);
        } else {
            const filtered = faqItems.filter(item =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFaqs(filtered);
        }
    }, [searchQuery]);


    return (
        <div className="flex h-screen bg-gray-950 text-gray-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-white">
                        {t('support.title', 'Support')}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={userData.avatar} alt="User" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:inline">{userData.name}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
                                <DropdownMenuLabel className='text-white'>
                                    {t('dashboard.myAccount', 'My Account')}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-800" />
                                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>{t('dashboard.profile', 'Profile')}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>{t('dashboard.messages', 'Messages')}</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-800" />
                                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                    {t('dashboard.logout', 'Log out')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Area */}
                <main className="flex-1 overflow-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Support Information Card */}
                        <Card className="bg-gray-900 border-gray-800 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">
                                    {t('support.contactInfo', 'Contact Information')}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    {t('support.contactDescription', 'Ways to reach our support team')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col items-center py-4">
                                    <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                                        <HelpCircle className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <h2 className="text-lg font-medium text-white text-center">
                                        {t('support.needHelp', 'Need Help?')}
                                    </h2>
                                    <p className="text-sm text-gray-400 text-center mt-2">
                                        {t('support.contactDescription', 'Our support team is ready to assist you')}
                                    </p>
                                </div>

                                <Separator className="bg-gray-800" />

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-2 flex items-center">
                                            <Mail className="h-3 w-3 mr-1" />
                                            {t('support.emailSupport', 'Email Support')}
                                        </p>
                                        <a
                                            href="mailto:support@company.com"
                                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            support@company.com
                                        </a>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {t('support.emailResponse', 'Typical response time: 24 hours')}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400 mb-2 flex items-center">
                                            <Phone className="h-3 w-3 mr-1" />
                                            {t('support.phoneSupport', 'Phone Support')}
                                        </p>
                                        <p className="text-sm text-white">
                                            +1 (800) 123-4567
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {t('support.phoneHours', 'Monday - Friday, 9 AM - 5 PM EST')}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400 mb-2 flex items-center">
                                            <MessageSquare className="h-3 w-3 mr-1" />
                                            {t('support.liveChat', 'Live Chat')}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white text-sm"
                                        >
                                            {t('support.startChat', 'Start Chat Session')}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Support Form Card */}
                        <Card className="bg-gray-900 border-gray-800 shadow-md md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">
                                    {t('support.contactForm', 'Contact Form')}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    {t('support.formDescription', 'Submit your support request and we\'ll get back to you')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitSuccess ? (
                                    <Alert className="bg-emerald-500/20 border-emerald-500/30 text-emerald-500">
                                        <Check className="h-4 w-4" />
                                        <AlertTitle>
                                            {t('support.successTitle', 'Request Submitted')}
                                        </AlertTitle>
                                        <AlertDescription>
                                            {t('support.successMessage', 'Your support request has been submitted successfully. We\'ll get back to you as soon as possible.')}
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm text-gray-300">
                                                {t('support.emailAddress', 'Email Address')}
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleFormChange('email', e.target.value)}
                                                className="bg-gray-800 border-gray-700 text-white"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="category" className="text-sm text-gray-300">
                                                {t('support.category', 'Category')}
                                            </Label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(value) => handleFormChange('category', value)}
                                                required
                                            >
                                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectValue placeholder={t('support.selectCategory', 'Select a category')} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 text-white border-gray-700">
                                                    <SelectItem value="technical">
                                                        {t('support.technical', 'Technical Issue')}
                                                    </SelectItem>
                                                    <SelectItem value="billing">
                                                        {t('support.billing', 'Billing Question')}
                                                    </SelectItem>
                                                    <SelectItem value="account">
                                                        {t('support.account', 'Account Management')}
                                                    </SelectItem>
                                                    <SelectItem value="feature">
                                                        {t('support.feature', 'Feature Request')}
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        {t('support.other', 'Other')}
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-sm text-gray-300">
                                                {t('support.subject', 'Subject')}
                                            </Label>
                                            <Input
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => handleFormChange('subject', e.target.value)}
                                                className="bg-gray-800 border-gray-700 text-white"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="text-sm text-gray-300">
                                                {t('support.description', 'Description')}
                                            </Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => handleFormChange('description', e.target.value)}
                                                className="bg-gray-800 border-gray-700 text-white min-h-32"
                                                placeholder={t('support.descriptionPlaceholder', 'Please describe your issue in detail')}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                                ) : null}
                                                {t('support.submit', 'Submit')}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                
                </main>
            </div>
        </div>
    )
}