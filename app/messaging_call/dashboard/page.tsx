'use client'
import React from 'react'
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
import { Line } from 'react-chartjs-2'
import { useForm } from "react-hook-form"

// Components
import Sidebar from '@/components/custom/messaging_call/sidebar'
import BusinessInfoPage from '@/components/custom/messaging_call/businessInfoPage'

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Icons
import {
  Activity,
  Users,
  UserPlus,
  Calendar,
  MessageSquare,
  Bell,
  User,
  MoreHorizontal,
  TrendingUp,
  Mail,
  Phone,
  Search,
  Settings,
  LogOut,
  BarChart3,
  CircleUser
} from "lucide-react"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Type definitions for better code organization
type StatCardProps = {
  title: string
  value: string
  change: string
  increased: boolean
  icon: React.ReactNode
}

type ActivityProps = {
  id: number
  type: 'message' | 'call' | 'lead' | 'email'
  person: string
  action: string
  time: string
}

export default function Dashboard() {
  const { t } = useTranslation('common')

  // Form setup
  const methods = useForm({
    defaultValues: {
      businessName: 'Acme Corporation',
      chatbotInfo: 'Our chatbot handles customer inquiries and booking requests 24/7.'
    }
  })

  // Activity data
  const activities: ActivityProps[] = [
    {
      id: 1,
      type: 'message',
      person: 'Sarah Johnson',
      action: 'requested a callback',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'call',
      person: 'David Park',
      action: 'call completed',
      time: '45 minutes ago'
    },
    {
      id: 3,
      type: 'lead',
      person: 'Olivia Martinez',
      action: 'new lead created',
      time: '2 hours ago'
    },
    {
      id: 4,
      type: 'email',
      person: 'Michael Rodriguez',
      action: 'email sent',
      time: '3 hours ago'
    },
    {
      id: 5,
      type: 'message',
      person: 'Emma Chen',
      action: 'message received',
      time: '4 hours ago'
    },
    {
      id: 6,
      type: 'call',
      person: 'James Wilson',
      action: 'scheduled follow-up',
      time: '5 hours ago'
    }
  ]

  // Stats cards data
  const stats: StatCardProps[] = [
    {
      title: t('dashboard.totalClients', 'Total Clients'),
      value: '42',
      change: '+16%',
      increased: true,
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: t('dashboard.activeLeads', 'Active Leads'),
      value: '28',
      change: '+12%',
      increased: true,
      icon: <UserPlus className="h-6 w-6 text-emerald-500" />
    },
    {
      title: t('dashboard.conversionRate', 'Conversion Rate'),
      value: '32%',
      change: '+4%',
      increased: true,
      icon: <Activity className="h-6 w-6 text-purple-500" />
    },
    {
      title: t('dashboard.totalEngagements', 'Total Engagements'),
      value: '286',
      change: '+22%',
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
        data: [10, 15, 22, 28, 34, 38, 42, 47, 54],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: t('dashboard.chartLeads', 'Leads'),
        data: [5, 12, 18, 24, 28, 36, 42, 48, 56],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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

  // Helper function for activity icons
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case 'call':
        return <Phone className="h-4 w-4 text-emerald-500" />
      case 'lead':
        return <UserPlus className="h-4 w-4 text-purple-500" />
      case 'email':
        return <Mail className="h-4 w-4 text-amber-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  // Helper function for activity background colors
  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-500/10'
      case 'call':
        return 'bg-emerald-500/10'
      case 'lead':
        return 'bg-purple-500/10'
      case 'email':
        return 'bg-amber-500/10'
      default:
        return 'bg-gray-500/10'
    }
  }

  // Helper function for activity text colors
  const getActivityTextColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-blue-400'
      case 'call':
        return 'text-emerald-400'
      case 'lead':
        return 'text-purple-400'
      case 'email':
        return 'text-amber-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">
              {t('dashboard.title', 'Dashboard')}
            </h1>
            <Separator orientation="vertical" className="h-6 mx-4 bg-gray-800" />
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                  <Avatar className="h-8 w-8 ring-2 ring-blue-500/30">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-white text-sm font-medium">{t('dashboard.adminUser', 'Admin User')}</span>
                    <span className="text-gray-400 text-xs">admin@company.com</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
                <DropdownMenuLabel className="text-white">{t('dashboard.myAccount', 'My Account')}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span>{t('dashboard.profile', 'Profile')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{t('dashboard.messages', 'Messages')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('dashboard.settings', 'Settings')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                  <LogOut className="mr-2 h-4 w-4" />
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
              <Card key={index} className="bg-gray-900 border-gray-800 shadow-md hover:shadow-lg transition-shadow">
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
            {/* Left Column - Charts Section & Business Info Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Charts Section */}
              <Card className="bg-gray-900 border-gray-800 overflow-hidden shadow-lg">
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
                          <BarChart3 className="h-4 w-4 mr-2" />
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
              <BusinessInfoPage />
            </div>

            {/* Right Column - Recent Activity */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center justify-between">
                    {t('dashboard.recentActivityTitle', 'Recent Activity')}
                    <Button variant="outline" size="sm" className="text-xs h-8 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
                      {t('dashboard.viewAll', 'View All')}
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {t('dashboard.recentActivityDescription', 'Latest client and lead interactions')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[540px] pr-4">
                    <div className="space-y-4 text-white">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <div className={`w-9 h-9 rounded-full ${getActivityBgColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className={`font-medium ${getActivityTextColor(activity.type)}`}>
                                {activity.person}
                              </span>{' '}
                              {t(`dashboard.${activity.action}`, activity.action)}
                            </p>
                            <p className="text-xs text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t border-gray-800 p-4">
                  <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                    {t('dashboard.loadMoreActivity', 'Load more activity')}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}