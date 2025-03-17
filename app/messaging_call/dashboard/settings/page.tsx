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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Bell,
    User,
    Mail,
    Phone,
    Shield,
    CreditCard,
    Calendar,
    Edit,
    Check,
    X
} from "lucide-react"
import { useUser } from '@/hooks/useSupabaseData'

// Import Dialog components (assumed available in your UI library)
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

// ChangePasswordModal Component
function ChangePasswordModal() {
    const { t } = useTranslation('common')
    const [open, setOpen] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePasswordChange = async () => {
        // Basic validations
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError(t('settings.fillAllFields', 'Please fill in all fields'))
            return
        }
        if (newPassword !== confirmPassword) {
            setError(t('settings.passwordMismatch', 'New passwords do not match'))
            return
        }
        setError('')
        setLoading(true)

        try {
            // Simulate an API call (replace with your actual change password API call)
            await new Promise(resolve => setTimeout(resolve, 1000))
            // On success, you could notify the user here (e.g., toast notification)
            setOpen(false)
            // Clear the fields for next time
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err) {
            setError(t('settings.passwordChangeError', 'Error changing password'))
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white text-sm"
                >
                    {t('settings.changePassword', 'Change Password')}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-gray-100">
                <DialogHeader>
                    <DialogTitle>{t('settings.changePassword', 'Change Password')}</DialogTitle>
                    <DialogDescription>
                        {t('settings.changePasswordDesc', 'Enter your current password and choose a new password.')}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400">
                            {t('settings.currentPassword', 'Current Password')}
                        </label>
                        <Input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400">
                            {t('settings.newPassword', 'New Password')}
                        </label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400">
                            {t('settings.confirmPassword', 'Confirm Password')}
                        </label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 bg-gray-800 border-gray-700 text-white"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <DialogFooter>
                    <Button onClick={handlePasswordChange} disabled={loading}>
                        {loading ? t('settings.loading', 'Loading...') : t('settings.save', 'Save')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function Settings() {
    const { t } = useTranslation('common')
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [email, setEmail] = useState('admin@company.com')
    const [tempEmail, setTempEmail] = useState('admin@company.com')

    // Mock user data
    const userData = {
        name: "Admin User",
        avatar: "/api/placeholder/32/32",
        subscription: {
            plan: "Enterprise",
            status: "active",
            renewDate: "2025-04-15",
            features: ["Unlimited leads", "Advanced analytics", "API access", "Priority support"]
        },
        phoneNumber: {
            number: "+1 (555) 123-4567",
            status: "provisioned",
            type: "toll-free"
        }
    }

    const handleEditEmail = () => {
        setIsEditingEmail(true)
        setTempEmail(email)
    }

    const handleSaveEmail = () => {
        setEmail(tempEmail)
        setIsEditingEmail(false)
    }

    const handleCancelEdit = () => {
        setIsEditingEmail(false)
        setTempEmail(email)
    }

    const { user, userProfile } = useUser()

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-white">
                        {t('settings.title', 'Settings')}
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
                                <DropdownMenuLabel className='text-white'>{t('dashboard.myAccount', 'My Account')}</DropdownMenuLabel>
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
                        {/* Profile Card */}
                        <Card className="bg-gray-900 border-gray-800 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">
                                    {t('settings.profileInfo', 'Profile Information')}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    {t('settings.profileDescription', 'Manage your account details')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center py-4">
                                    <Avatar className="h-20 w-20 border-2 border-gray-700 mb-4">
                                        <AvatarImage src={userData.avatar} alt={userProfile.name} />
                                        <AvatarFallback className="text-xl">{userProfile.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-lg font-medium text-white">{userProfile.name}</h2>
                                </div>

                                <Separator className="bg-gray-800" />

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">
                                            <Mail className="h-3 w-3 inline mr-1" />
                                            {t('settings.email', 'Email Address')}
                                        </p>

                                        {isEditingEmail ? (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={tempEmail}
                                                    onChange={(e) => setTempEmail(e.target.value)}
                                                    className="bg-gray-800 border-gray-700 text-white text-sm h-8"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-emerald-500 hover:text-emerald-400 hover:bg-gray-800"
                                                    onClick={handleSaveEmail}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-gray-800"
                                                    onClick={handleCancelEdit}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-white">{user?.email}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                                    onClick={handleEditEmail}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
{/* 
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">
                                            <Shield className="h-3 w-3 inline mr-1" />
                                            {t('settings.accountSecurity', 'Account Security')}
                                        </p>
                                        <ChangePasswordModal />
                                    </div> */}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Subscription Card */}
                        {/* <Card className="bg-gray-900 border-gray-800 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">
                                    {t('settings.subscription', 'Subscription Plan')}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    {t('settings.subscriptionDescription', 'Your current plan and billing details')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white">{userData.subscription.plan} Plan</p>
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 text-xs font-medium mt-1"
                                        >
                                            {userData.subscription.status === 'active' ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white text-xs"
                                    >
                                        {t('settings.upgradePlan', 'Upgrade')}
                                    </Button>
                                </div>

                                <Separator className="bg-gray-800" />

                                <div>
                                    <p className="text-xs text-gray-400 flex items-center mb-1">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {t('settings.nextRenewal', 'Next Renewal')}
                                    </p>
                                    <p className="text-sm text-white">{new Date(userData.subscription.renewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>

                                <div className="pt-2">
                                    <p className="text-xs text-gray-400 mb-2">{t('settings.includedFeatures', 'Included Features')}</p>
                                    <ul className="space-y-2">
                                        {userData.subscription.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-300">
                                                <Check className="h-4 w-4 text-emerald-500 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Separator className="bg-gray-800" />

                                <div>
                                    <p className="text-xs text-gray-400 flex items-center mb-1">
                                        <CreditCard className="h-3 w-3 mr-1" />
                                        {t('settings.billingInfo', 'Billing Information')}
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white text-sm"
                                    >
                                        {t('settings.managePayment', 'Manage Payment Methods')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Phone Number Card */}
                        <Card className="bg-gray-900 border-gray-800 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">
                                    {t('settings.phoneNumber', 'Phone Number')}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    {t('settings.phoneDescription', 'Your provisioned phone number for communications')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                            <Phone className="h-5 w-5 text-purple-500" />
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="bg-purple-500/20 text-purple-500 border-purple-500/30 text-xs font-medium"
                                        >
                                            {userData.phoneNumber.type}
                                        </Badge>
                                    </div>

                                    <h3 className="text-lg font-medium text-white mb-1">{userData.phoneNumber.number}</h3>
                                    <p className="text-xs text-gray-400 mb-2">
                                        Status: <span className="text-emerald-500">
                                            {userData.phoneNumber.status === 'provisioned' ? 'Provisioned' : 'Pending'}
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
