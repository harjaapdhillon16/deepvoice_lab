'use client'
import React from 'react'
import Sidebar from '@/components/custom/messaging_call/sidebar'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'next-i18next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Activity,
  Users, 
  UserPlus, 
  PlusCircle,
  Calendar,
  MessageSquare,
  Bell,
  User,
  MoreHorizontal,
  TrendingUp,
  Mail,
  Phone
} from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const { t } = useTranslation('common')

  // Set up react-hook-form for the Business Information Form
  const methods = useForm({
    defaultValues: {
      businessName: 'Acme Corporation',
      chatbotInfo: 'Our chatbot handles customer inquiries and booking requests 24/7.'
    }
  })

  const handleSubmitBusinessInfo = (data) => {
    // Submit business information (e.g., update chatbot configuration)
    console.log('Business info:', data)
  }

  // Extended clients data
  const clients = [
    { 
      id: 1,
      name: 'Sarah Johnson', 
      company: 'TechSolutions Inc',
      email: 'sarah@techsolutions.com',
      status: 'active',
      lastContact: '2025-03-05',
      image: '/api/placeholder/32/32'
    }, 
    { 
      id: 2,
      name: 'Michael Rodriguez', 
      company: 'Innovate Partners',
      email: 'mrodriguez@innovatepartners.com',
      status: 'active',
      lastContact: '2025-03-01',
      image: '/api/placeholder/32/32'
    }, 
    { 
      id: 3,
      name: 'Emma Chen', 
      company: 'Global Ventures',
      email: 'emma@globalventures.com',
      status: 'inactive',
      lastContact: '2025-02-25',
      image: '/api/placeholder/32/32'
    }
  ]
  
  // Extended leads data
  const leads = [
    { 
      id: 1,
      name: 'David Park', 
      company: 'Park Enterprises',
      email: 'david@parkenterprises.com',
      status: 'new',
      source: 'Website',
      createdAt: '2025-03-08',
      image: '/api/placeholder/32/32'
    }, 
    { 
      id: 2,
      name: 'Olivia Martinez', 
      company: 'Martinez & Co',
      email: 'olivia@martinez.co',
      status: 'contacted',
      source: 'Referral',
      createdAt: '2025-03-07',
      image: '/api/placeholder/32/32'
    }, 
    { 
      id: 3,
      name: 'Jamal Wilson', 
      company: 'Wilson Technologies',
      email: 'jwilson@wilsontech.com',
      status: 'new',
      source: 'LinkedIn',
      createdAt: '2025-03-06',
      image: '/api/placeholder/32/32'
    }
  ]

  // Statistics cards data
  const stats = [
    {
      title: t('dashboard.totalClients', 'Total Clients'),
      value: '36',
      change: '+12%',
      increased: true,
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: t('dashboard.activeLeads', 'Active Leads'),
      value: '24',
      change: '+8%',
      increased: true,
      icon: <UserPlus className="h-6 w-6 text-emerald-500" />
    },
    {
      title: t('dashboard.conversionRate', 'Conversion Rate'),
      value: '28%',
      change: '-3%',
      increased: false,
      icon: <Activity className="h-6 w-6 text-purple-500" />
    },
    {
      title: t('dashboard.totalEngagements', 'Total Engagements'),
      value: '248',
      change: '+15%',
      increased: true,
      icon: <MessageSquare className="h-6 w-6 text-amber-500" />
    }
  ]

  // Chart data for growth over time
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: t('dashboard.chartClients', 'Clients'),
        data: [10, 15, 20, 25, 30, 32, 35, 38, 42],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: t('dashboard.chartLeads', 'Leads'),
        data: [5, 10, 15, 18, 22, 28, 32, 38, 45],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { family: 'Inter, system-ui, sans-serif' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
      },
      y: {
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.6)' }
      }
    }
  }

  // Function to generate a status badge using shadcn's Badge component
  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
      inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      new: "bg-blue-500/20 text-blue-500 border-blue-500/30",
      contacted: "bg-amber-500/20 text-amber-500 border-amber-500/30"
    }
    
    return (
      <Badge variant="outline" className={`${styles[status]} text-xs font-medium px-2 py-0.5 border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">
            {t('dashboard.title', 'Dashboard')}
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{t('dashboard.adminUser', 'Admin User')}</span>
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <h3 className="text-2xl text-white font-bold mt-1">{stat.value}</h3>
                      <div className={`flex items-center mt-1 text-xs font-medium ${stat.increased ? 'text-emerald-500' : 'text-red-500'}`}>
                        <span>{stat.change}</span>
                        <TrendingUp className={`h-3 w-3 ml-1 ${!stat.increased && 'rotate-180'}`} />
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Charts Section */}
              <Card className="bg-gray-900 border-gray-800 overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {t('dashboard.chartSectionTitle', 'Growth Analytics')}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                          {t('dashboard.last30Days', 'Last 30 days')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                          {t('dashboard.lastQuarter', 'Last quarter')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                          {t('dashboard.lastYear', 'Last year')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                          {t('dashboard.exportData', 'Export data')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-gray-400">
                    {t('dashboard.chartTitle', 'Clients and Leads Growth Over Time')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <div className="h-[300px]">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Business Information Form */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className='text-white'>
                    {t('dashboard.businessInfoTitle', 'Business Information')}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t('dashboard.businessInfoDescription', 'Update your business details and chatbot configuration')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmitBusinessInfo)} className="space-y-4">
                      <FormField 
                        control={methods.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white'>{t('dashboard.businessNameLabel', 'Business Name')}</FormLabel>
                            <Input placeholder={t('dashboard.businessNamePlaceholder', 'Enter your business name')} {...field} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"/>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField 
                        control={methods.control}
                        name="chatbotInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-white'>{t('dashboard.chatbotInfoLabel', 'Chatbot Information')}</FormLabel>
                            <Textarea placeholder={t('dashboard.chatbotInfoPlaceholder', 'Enter information for your chatbot')} {...field} className="h-24 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"/>
                            <FormDescription>{t('dashboard.chatbotInfoDescription', "This information will be used to personalize your chatbot's responses.")}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </FormProvider>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t border-gray-800 pt-4">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                    {t('dashboard.resetButton', 'Reset')}
                  </Button>
                  <Button 
                    onClick={methods.handleSubmit(handleSubmitBusinessInfo)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  >
                    {t('dashboard.saveButton', 'Save Information')}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Clients & Leads Tabs */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className='text-white'>{t('dashboard.previewTitle', 'Quick Preview')}</span>
                    <Button variant="ghost" size="sm" className="text-xs text-emerald-500 hover:text-emerald-400">
                      <PlusCircle className="h-3.5 w-3.5 mr-1" />
                      {t('dashboard.addNew', 'Add New')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Tabs defaultValue="clients" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-lg p-1">
                      <TabsTrigger 
                        value="clients" 
                        className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md text-xs"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        {t('dashboard.clientsPreviewTitle', 'Clients')}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="leads" 
                        className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md text-xs"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {t('dashboard.leadsPreviewTitle', 'Leads')}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="clients" className="mt-4">
                      <ScrollArea className="h-[320px] pr-4">
                        <div className="space-y-3">
                          {clients.map((client) => (
                            <div 
                              key={client.id} 
                              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10 border border-gray-700">
                                  <AvatarImage src={client.image} alt={client.name} />
                                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="text-sm font-medium text-white">{client.name}</h4>
                                  <p className="text-xs text-gray-400">{client.company}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                {getStatusBadge(client.status)}
                                <span className="text-xs text-gray-400 mt-1 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(client.lastContact).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="mt-4 pt-4 border-t border-gray-800 flex justify-center">
                        <Button variant="outline" size="sm" className="text-xs text-gray-400 border-gray-700 hover:bg-gray-800">
                          {t('dashboard.viewAllClients', 'View All Clients')}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="leads" className="mt-4">
                      <ScrollArea className="h-[320px] pr-4">
                        <div className="space-y-3">
                          {leads.map((lead) => (
                            <div 
                              key={lead.id} 
                              className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10 border border-gray-700">
                                  <AvatarImage src={lead.image} alt={lead.name} />
                                  <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="text-sm font-medium text-white">{lead.name}</h4>
                                  <p className="text-xs text-gray-400">{lead.company}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                {getStatusBadge(lead.status)}
                                <span className="text-xs text-gray-400 mt-1">
                                  {lead.source}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="mt-4 pt-4 border-t border-gray-800 flex justify-center">
                        <Button variant="outline" size="sm" className="text-xs text-gray-400 border-gray-700 hover:bg-gray-800">
                          {t('dashboard.viewAllLeads', 'View All Leads')}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">
                    {t('dashboard.recentActivityTitle', 'Recent Activity')}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t('dashboard.recentActivityDescription', 'Latest client and lead interactions')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[220px] pr-4">
                    <div className="space-y-4 text-white">
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium text-blue-400">Sarah Johnson</span> {t('dashboard.requestedCallback', 'requested a callback')}
                          </p>
                          <p className="text-xs text-gray-400">{t('dashboard.callbackTime', '10 minutes ago')}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 ">
                        <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            {t('dashboard.callCompletedWith', 'Call completed with')} <span className="font-medium text-emerald-400">David Park</span>
                          </p>
                          <p className="text-xs text-gray-400">{t('dashboard.callCompletedTime', '45 minutes ago')}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                          <UserPlus className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            {t('dashboard.newLeadCreated', 'New lead created:')} <span className="font-medium text-purple-400">Olivia Martinez</span>
                          </p>
                          <p className="text-xs text-gray-400">{t('dashboard.newLeadTime', '2 hours ago')}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            {t('dashboard.emailSentTo', 'Email sent to')} <span className="font-medium text-amber-400">Michael Rodriguez</span>
                          </p>
                          <p className="text-xs text-gray-400">{t('dashboard.emailSentTime', '3 hours ago')}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}