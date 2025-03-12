// @ts-nocheck
'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/custom/messaging_call/sidebar'
import { useTranslation } from 'next-i18next'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  MessageSquare,
  Bell,
  User,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Clock,
  ChevronDown,
  Download,
  Plus,
  ArrowUpDown,
  Eye
} from "lucide-react"

// This ClientsManagement page shows a table of clients and opens a side sheet with details
export default function ClientsManagement() {
  const { t } = useTranslation('common')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSource, setFilterSource] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)

  // Sample clients data with message history
  const clients = [
    { 
      id: 1,
      name: 'David Park', 
      company: 'Park Enterprises',
      email: 'david@parkenterprises.com',
      phone: '+1 (555) 123-4567',
      status: 'new',
      source: 'Website',
      createdAt: '2025-03-08',
      lastContact: '2025-03-08',
      image: '/api/placeholder/32/32',
      messageHistory: [
        {
          id: 101,
          type: 'chatbot',
          message: 'Hello! How can I help you today?',
          timestamp: '2025-03-08T14:22:00',
          isBot: true
        },
        {
          id: 102,
          type: 'chatbot',
          message: "I'm interested in your services. Can someone contact me?",
          timestamp: '2025-03-08T14:23:15',
          isBot: false
        },
        {
          id: 103,
          type: 'chatbot',
          message: "Of course! I'll need some information to help our team reach out to you. What's your name and contact information?",
          timestamp: '2025-03-08T14:23:45',
          isBot: true
        }
      ],
      notes: "Interested in premium package. Schedule follow-up call."
    }, 
    { 
      id: 2,
      name: 'Olivia Martinez', 
      company: 'Martinez & Co',
      email: 'olivia@martinez.co',
      phone: '+1 (555) 234-5678',
      status: 'contacted',
      source: 'Referral',
      createdAt: '2025-03-07',
      lastContact: '2025-03-09',
      image: '/api/placeholder/32/32',
      messageHistory: [
        {
          id: 201,
          type: 'email',
          message: 'Hi Olivia, following up on our conversation about our services. Would you be available for a quick call tomorrow?',
          timestamp: '2025-03-07T10:15:00',
          isBot: false,
          sender: 'Sales Rep'
        },
        {
          id: 202,
          type: 'email',
          message: 'That works for me. How about 2pm?',
          timestamp: '2025-03-07T11:42:00',
          isBot: false,
          sender: 'Olivia Martinez'
        },
        {
          id: 203,
          type: 'call',
          message: 'Phone call - 15 minutes',
          timestamp: '2025-03-09T14:00:00',
          isBot: false,
          sender: 'Sales Rep'
        }
      ],
      notes: "Referred by Michael Rodriguez. Very interested in our enterprise solution."
    }, 
    { 
      id: 3,
      name: 'Jamal Wilson', 
      company: 'Wilson Technologies',
      email: 'jwilson@wilsontech.com',
      phone: '+1 (555) 345-6789',
      status: 'qualified',
      source: 'LinkedIn',
      createdAt: '2025-03-06',
      lastContact: '2025-03-10',
      image: '/api/placeholder/32/32',
      messageHistory: [
        {
          id: 301,
          type: 'chatbot',
          message: 'Welcome to our website! How can I assist you today?',
          timestamp: '2025-03-06T09:12:00',
          isBot: true
        },
        {
          id: 302,
          type: 'chatbot',
          message: 'I need information about your API integration options.',
          timestamp: '2025-03-06T09:13:05',
          isBot: false
        },
        {
          id: 303,
          type: 'email',
          message: 'Hi Jamal, please find our API documentation attached. Would you like to schedule a consultation?',
          timestamp: '2025-03-07T11:30:00',
          isBot: false,
          sender: 'Technical Sales'
        },
        {
          id: 304,
          type: 'email',
          message: 'Thanks for the documentation. I’d like to schedule that consultation to discuss our specific needs.',
          timestamp: '2025-03-08T14:15:00',
          isBot: false,
          sender: 'Jamal Wilson'
        },
        {
          id: 305,
          type: 'call',
          message: 'Technical consultation call - 45 minutes',
          timestamp: '2025-03-10T10:00:00',
          isBot: false,
          sender: 'Technical Sales'
        }
      ],
      notes: "High-potential enterprise client. Needs technical solution for their global team."
    }
  ]

  const getFilteredClients = () => {
    return clients.filter(client => {
      if (filterStatus !== 'all' && client.status !== filterStatus) return false
      if (filterSource !== 'all' && client.source !== filterSource) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          client.name.toLowerCase().includes(query) ||
          client.company.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query)
        )
      }
      return true
    })
  }

  const getMessageIcon = (type) => {
    switch (type) {
      case 'chatbot': return <MessageSquare className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      case 'call': return <Phone className="h-4 w-4" />
      case 'note': return <User className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Render a status badge for a client
  const getStatusBadge = (status) => {
    const styles = {
      new: "bg-blue-500/20 text-blue-500 border-blue-500/30",
      contacted: "bg-amber-500/20 text-amber-500 border-amber-500/30",
      qualified: "bg-purple-500/20 text-purple-500 border-purple-500/30",
      opportunity: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
      closed: "bg-green-600/20 text-green-600 border-green-600/30",
      lost: "bg-red-500/20 text-red-500 border-red-500/30"
    }
    const statusLabels = {
      new: "New",
      contacted: "Contacted",
      qualified: "Qualified",
      opportunity: "Opportunity",
      closed: "Closed Won",
      lost: "Closed Lost"
    }
    return (
      <Badge variant="outline" className={`${styles[status]} text-xs font-medium px-2 py-0.5 border`}>
        {statusLabels[status]}
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
            {t('clients.title', 'Clients Management')}
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
        {/* Main Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Filters & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search clients..." 
                  className="pl-8 bg-gray-800 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="opportunity">Opportunity</SelectItem>
                  <SelectItem value="closed">Closed Won</SelectItem>
                  <SelectItem value="lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger className="w-36 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Trade Show">Trade Show</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-gray-700 hover:text-white"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Client
              </Button>
            </div>
          </div>
          
          {/* Clients Table */}
          <Card className="bg-gray-900 border-gray-800 shadow-md">
            <CardHeader className="pb-0">
              <CardTitle className="text-white text-xl">
                {t('clients.allClientsTitle', 'All Clients')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800 border-gray-700">
                    <TableHead className="text-gray-400 font-medium">
                      <div className="flex items-center cursor-pointer">
                        Name
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">Company</TableHead>
                    <TableHead className="text-gray-400 font-medium">Status</TableHead>
                    <TableHead className="text-gray-400 font-medium">Source</TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      <div className="flex items-center cursor-pointer">
                        Created
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">Last Contact</TableHead>
                    <TableHead className="text-gray-400 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredClients().map((client) => (
                    <TableRow key={client.id} className="hover:bg-gray-800 border-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-gray-700">
                            <AvatarImage src={client.image} alt={client.name} />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-white">{client.name}</p>
                            <p className="text-xs text-gray-400">{client.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-300">{client.company}</TableCell>
                      <TableCell>{getStatusBadge(client.status)}</TableCell>
                      <TableCell className="text-sm text-gray-300">{client.source}</TableCell>
                      <TableCell className="text-sm text-gray-300">{formatDate(client.createdAt)}</TableCell>
                      <TableCell className="text-sm text-gray-300">{formatDate(client.lastContact)}</TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                              onClick={() => setSelectedClient(client)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-md bg-gray-900 text-white">
                            <SheetHeader>
                              <SheetTitle className="text-white text-xl">Client Details</SheetTitle>
                              <SheetDescription className="text-gray-400">
                                View and manage client information and message history
                              </SheetDescription>
                            </SheetHeader>
                            {selectedClient && (
                              <div className="mt-6">
                                <div className="flex items-center gap-4 mb-6">
                                  <Avatar className="h-12 w-12 border border-gray-700">
                                    <AvatarImage src={selectedClient.image} alt={selectedClient.name} />
                                    <AvatarFallback>{selectedClient.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h2 className="text-lg font-medium">{selectedClient.name}</h2>
                                    <p className="text-sm text-gray-400">{selectedClient.company}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                  <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p className="text-sm">{selectedClient.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-400">Phone</p>
                                    <p className="text-sm">{selectedClient.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-400">Status</p>
                                    <div className="mt-1">{getStatusBadge(selectedClient.status)}</div>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-400">Source</p>
                                    <p className="text-sm">{selectedClient.source}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-400">Created</p>
                                    <p className="text-sm">{formatDate(selectedClient.createdAt)}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-400">Last Contact</p>
                                    <p className="text-sm">{formatDate(selectedClient.lastContact)}</p>
                                  </div>
                                </div>
                                <div className="mb-6">
                                  <h3 className="text-sm font-medium mb-2">Notes</h3>
                                  <div className="bg-gray-800 p-3 rounded-md text-sm text-gray-300 border border-gray-700">
                                    {selectedClient.notes}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-medium">Message History</h3>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-400 hover:text-white">
                                          <Filter className="h-3 w-3 mr-1" />
                                          Filter
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent className="bg-gray-900 border-gray-800">
                                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                          All Messages
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                          Chatbot
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                          Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                          Calls
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-gray-800">
                                          Notes
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <ScrollArea className="h-[280px] pr-4">
                                    <div className="space-y-3">
                                      {selectedClient.messageHistory.map((message) => (
                                        <div 
                                          key={message.id} 
                                          className={`bg-gray-800 p-3 rounded-lg border ${
                                            message.isBot === false && message.type === 'chatbot' 
                                              ? 'ml-6' 
                                              : message.isBot === true 
                                                ? 'mr-6' 
                                                : ''
                                          }`}
                                        >
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                                message.type === 'chatbot' && message.isBot 
                                                  ? 'bg-blue-500/20 text-blue-500' 
                                                  : message.type === 'email' 
                                                    ? 'bg-amber-500/20 text-amber-500'
                                                    : message.type === 'call'
                                                      ? 'bg-purple-500/20 text-purple-500'
                                                      : 'bg-emerald-500/20 text-emerald-500'
                                              }`}>
                                                {getMessageIcon(message.type)}
                                              </div>
                                              <span className="text-xs font-medium text-gray-300">
                                                {message.type === 'chatbot'
                                                  ? (message.isBot ? 'Chatbot' : 'Client')
                                                  : message.sender || 'System'}
                                              </span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-400">
                                              <Calendar className="h-3 w-3 mr-1" />
                                              {formatDate(message.timestamp).split(', ')[0]}
                                              <Clock className="h-3 w-3 ml-2 mr-1" />
                                              {formatTime(message.timestamp)}
                                            </div>
                                          </div>
                                          <div className="text-sm text-gray-200">
                                            {message.message}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </div>
                            )}
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
