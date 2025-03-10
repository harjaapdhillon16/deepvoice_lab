// @ts-nocheck
'use client'
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  Building, 
  Bell, 
  Star,
  DollarSign,
  Calendar,
  FileText,
  Phone,
  Mail,
  MoreHorizontal,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  RefreshCcw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '@/components/custom/real_estate/sidebar';

// Demo data for charts
const leadData = [
  { name: 'Jan', leads: 40, clients: 24 },
  { name: 'Feb', leads: 45, clients: 27 },
  { name: 'Mar', leads: 60, clients: 32 },
  { name: 'Apr', leads: 50, clients: 36 },
  { name: 'May', leads: 65, clients: 40 },
  { name: 'Jun', leads: 75, clients: 45 },
  { name: 'Jul', leads: 85, clients: 50 },
];

const propertyStats = [
  { name: 'For Sale', value: 62 },
  { name: 'Pending', value: 15 },
  { name: 'Sold', value: 23 },
];

const colors = ['#4f46e5', '#8b5cf6', '#ec4899', '#f97316'];

const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 67000 },
  { name: 'Jul', revenue: 72000 },
];

// Demo data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'Property Viewing',
    property: '123 Coastal Highway',
    client: 'Sarah Johnson',
    time: '10:00 AM',
    date: 'Today',
    type: 'viewing',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Contract Signing',
    property: '456 Mountain View',
    client: 'Michael Chen',
    time: '2:30 PM',
    date: 'Today',
    type: 'contract',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Client Meeting',
    property: '789 Lakeside Drive',
    client: 'Emma Wilson',
    time: '9:15 AM',
    date: 'Tomorrow',
    type: 'meeting',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Property Inspection',
    property: '234 Sunset Blvd',
    client: 'David Thompson',
    time: '11:00 AM',
    date: 'Tomorrow',
    type: 'inspection',
    priority: 'medium'
  },
];

// Demo data for recent leads
const recentLeads = [
  {
    id: 1,
    name: 'Jennifer Parker',
    email: 'jennifer@example.com',
    phone: '(555) 123-4567',
    property: 'Luxury Condo Downtown',
    stage: 'New',
    score: 85,
    date: '2 hours ago'
  },
  {
    id: 2,
    name: 'Robert Davis',
    email: 'robert@example.com',
    phone: '(555) 987-6543',
    property: 'Suburban Family Home',
    stage: 'Contacted',
    score: 72,
    date: '5 hours ago'
  },
  {
    id: 3,
    name: 'Amanda Miller',
    email: 'amanda@example.com',
    phone: '(555) 456-7890',
    property: 'Beachfront Villa',
    stage: 'Qualified',
    score: 94,
    date: '1 day ago'
  },
  {
    id: 4,
    name: 'Thomas Wilson',
    email: 'thomas@example.com',
    phone: '(555) 789-0123',
    property: 'Downtown Apartment',
    stage: 'Negotiation',
    score: 89,
    date: '1 day ago'
  },
];

// Demo data for alerts
const alerts = [
  {
    id: 1,
    message: 'Listing for 123 Coastal Highway expires in 3 days',
    type: 'warning',
    date: 'Today'
  },
  {
    id: 2,
    message: 'High-value lead inactive for 5 days - follow-up required',
    type: 'danger',
    date: 'Today'
  },
  {
    id: 3,
    message: 'Contract for 456 Mountain View ready for signature',
    type: 'success',
    date: 'Yesterday'
  },
  {
    id: 4,
    message: 'Price reduction approved for 789 Lakeside Drive',
    type: 'info',
    date: 'Yesterday'
  },
];

// Demo data for recent contracts
const recentContracts = [
  {
    id: 1,
    property: '123 Coastal Highway',
    client: 'Sarah Johnson',
    type: 'Purchase',
    value: '$850,000',
    status: 'Pending Signature',
    date: 'Today'
  },
  {
    id: 2,
    property: '456 Mountain View',
    client: 'Michael Chen',
    type: 'Sale',
    value: '$725,000',
    status: 'Under Review',
    date: '2 days ago'
  },
  {
    id: 3,
    property: '789 Lakeside Drive',
    client: 'Emma Wilson',
    type: 'Purchase',
    value: '$1,200,000',
    status: 'Completed',
    date: '1 week ago'
  },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Function to format currency
  const formatCurrency = (value:any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-md">
          <p className="text-sm font-medium text-slate-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar component */}
      <Sidebar activePage="dashboard" />
      
      {/* Main content */}
      <div className="flex-1 pl-0 lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Your real estate performance at a glance
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className="relative">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                    >
                      <RefreshCcw className="-ml-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                    >
                      <Filter className="-ml-0.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                      Filter
                      <ChevronDown className="-mr-1 h-4 w-4 text-slate-400" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <select
                  id="timeRange"
                  name="timeRange"
                  className="rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Active Listings */}
              <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Building className="h-10 w-10 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Active Listings</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <TrendingUp size={12} className="mr-1" />
                          12%
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-2xl font-semibold text-slate-900">42</p>
                        <p className="text-sm text-slate-500">Properties</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Total Leads */}
              <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-10 w-10 text-purple-600" />
                    </div>
                    <div className="ml-5 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Total Leads</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <TrendingUp size={12} className="mr-1" />
                          8%
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-2xl font-semibold text-slate-900">85</p>
                        <p className="text-sm text-slate-500">This month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Conversion Rate */}
              <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Star className="h-10 w-10 text-amber-500" />
                    </div>
                    <div className="ml-5 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <TrendingUp size={12} className="mr-1" />
                          3%
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-2xl font-semibold text-slate-900">28%</p>
                        <p className="text-sm text-slate-500">Lead to Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Revenue */}
              <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-10 w-10 text-emerald-600" />
                    </div>
                    <div className="ml-5 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Revenue</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <TrendingDown size={12} className="mr-1" />
                          2%
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-2xl font-semibold text-slate-900">$72K</p>
                        <p className="text-sm text-slate-500">This month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              
              {/* Leads and Clients Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-slate-900">Leads & Clients</h2>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center justify-center p-1 bg-indigo-100 rounded-full">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                      </span>
                      <span className="text-xs text-slate-600">Leads</span>
                      <span className="inline-flex items-center justify-center p-1 bg-purple-100 rounded-full">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      </span>
                      <span className="text-xs text-slate-600">Clients</span>
                    </div>
                  </div>
                  <div className="mt-6" style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={leadData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Leads" />
                        <Line type="monotone" dataKey="clients" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Clients" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Property Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-slate-900">Property Status</h2>
                  <div className="mt-6" style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={propertyStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {propertyStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} properties`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {propertyStats.map((stat, index) => (
                      <div key={stat.name} className="text-center">
                        <div className="inline-flex items-center justify-center p-1 rounded-full" style={{ backgroundColor: `${colors[index]}20` }}>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
                        </div>
                        <p className="text-xs font-medium text-slate-600 mt-1">{stat.name}</p>
                        <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-slate-900">Revenue</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-600">Total: $400,000</span>
                    </div>
                  </div>
                  <div className="mt-6" style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip 
                          formatter={(value) => [`${formatCurrency(value)}`, 'Revenue']}
                          content={<CustomTooltip />}
                        />
                        <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-slate-900">Critical Alerts</h2>
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {alerts.length} alerts
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded-lg border flex items-start">
                        {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />}
                        {alert.type === 'danger' && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                        {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                        {alert.type === 'info' && <Bell className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm text-slate-900">{alert.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{alert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
                      View all alerts
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              
              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-slate-900">Upcoming Events</h2>
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <ul className="divide-y divide-slate-200">
                    {upcomingEvents.map((event) => (
                      <li key={event.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 rounded-full p-2 
                            ${event.type === 'viewing' ? 'bg-indigo-100' : ''}
                            ${event.type === 'contract' ? 'bg-green-100' : ''}
                            ${event.type === 'meeting' ? 'bg-purple-100' : ''}
                            ${event.type === 'inspection' ? 'bg-amber-100' : ''}
                          `}>
                            {event.type === 'viewing' && <Building className={`h-5 w-5 text-indigo-600`} />}
                            {event.type === 'contract' && <FileText className={`h-5 w-5 text-green-600`} />}
                            {event.type === 'meeting' && <Users className={`h-5 w-5 text-purple-600`} />}
                            {event.type === 'inspection' && <Star className={`h-5 w-5 text-amber-600`} />}
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-sm font-medium text-slate-900 truncate">
                              {event.title}
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-xs text-slate-600 truncate">
                                {event.property}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-xs text-slate-500">
                              <Clock className="mr-1.5 h-3 w-3 flex-shrink-0" />
                              <span>{event.time}</span>
                              <span className="mx-1">•</span>
                              <span>{event.date}</span>
                              {event.priority === 'high' && (
                                <>
                                  <span className="mx-1">•</span>
                                  <span className="text-red-500 font-medium">High Priority</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <MoreHorizontal className="h-5 w-5 text-slate-400" />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 py-4 border-t border-slate-200">
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
                  >
                    View all events
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Recent Leads */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-slate-900">Recent Leads</h2>
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center p-1 rounded-full bg-purple-100">
                        <Users className="h-4 w-4 text-purple-600" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <ul className="divide-y divide-slate-200">
                    {recentLeads.map((lead) => (
                      <li key={lead.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
                              {lead.name.charAt(0)}{lead.name.split(' ')[1]?.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-sm font-medium text-slate-900 truncate">
                              {lead.name}
                            </div>
                            <div className="flex mt-1 items-center text-xs text-slate-500">
                              <Mail className="mr-1.5 h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${lead.stage === 'New' ? 'bg-blue-100 text-blue-800' : ''}
                                ${lead.stage === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${lead.stage === 'Qualified' ? 'bg-purple-100 text-purple-800' : ''}
                                ${lead.stage === 'Negotiation' ? 'bg-green-100 text-green-800' : ''}
                              `}>
                                {lead.stage}
                              </span>
                              <span className="mx-1.5">•</span>
                              <span className="text-xs text-slate-500">Score: {lead.score}</span>
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <button
                              type="button"
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                            >
                              Contact
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 py-4 border-t border-slate-200">
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center"
                  >
                    View all leads
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Recent Contracts */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-slate-900">Recent Contracts</h2>
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center p-1 rounded-full bg-green-100">
                        <FileText className="h-4 w-4 text-green-600" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <ul className="divide-y divide-slate-200">
                    {recentContracts.map((contract) => (
                      <li key={contract.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
                              <FileText className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="text-sm font-medium text-slate-900 truncate">
                              {contract.property}
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-xs text-slate-500">
                                {contract.client} • {contract.type}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center">
                              <span className="text-xs font-medium text-slate-900">
                                {contract.value}
                              </span>
                              <span className="mx-1">•</span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${contract.status === 'Pending Signature' ? 'bg-amber-100 text-amber-800' : ''}
                                ${contract.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : ''}
                                ${contract.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                              `}>
                                {contract.status}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <span className="text-xs text-slate-500">{contract.date}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                  >
                    View all contracts
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="-ml-1 mr-1 h-4 w-4" />
                    New Contract
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;