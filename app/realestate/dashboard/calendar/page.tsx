// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Edit,
  Trash2,
  CalendarClock,
  Filter,
  Grid,
  List,
  Search,
  MoreHorizontal,
  CheckCircle2,
  Clock8,
  XCircle
} from 'lucide-react';

// Import Sidebar component
import Sidebar from '@/components/custom/real_estate/sidebar';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const CalendarPage = () => {
  // State for calendar view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'agenda'
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // Use singular keys to match event.type values
  const [filters, setFilters] = useState({
    meeting: true,
    viewing: true,
    deadline: true,
    personal: true
  });
  
  // State for expanding events in month view
  const [expandedDay, setExpandedDay] = useState(null);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endDate: new Date().toISOString().split('T')[0],
    endTime: '10:00',
    location: '',
    attendees: '',
    type: 'meeting', // "meeting", "viewing", "deadline", "personal"
    status: 'confirmed' // "confirmed", "tentative", "cancelled"
  });

  // Sample calendar events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Property Viewing - 123 Ocean View',
      description: 'Show the beachfront property to the Johnson family',
      startDate: '2025-03-11',
      startTime: '10:00',
      endDate: '2025-03-11',
      endTime: '11:30',
      location: '123 Ocean View Dr, Malibu',
      attendees: 'Robert Johnson, Samantha Johnson',
      type: 'viewing',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly team status update',
      startDate: '2025-03-11',
      startTime: '14:00',
      endDate: '2025-03-11',
      endTime: '15:00',
      location: 'Office - Conference Room A',
      attendees: 'All agents',
      type: 'meeting',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Contract Deadline - 456 Mountain View',
      description: 'Closing date for the Smith contract',
      startDate: '2025-03-12',
      startTime: '17:00',
      endDate: '2025-03-12',
      endTime: '17:00',
      location: '',
      attendees: '',
      type: 'deadline',
      status: 'confirmed'
    },
    {
      id: 4,
      title: 'Lunch with Developer',
      description: 'Discuss new downtown project',
      startDate: '2025-03-12',
      startTime: '12:30',
      endDate: '2025-03-12',
      endTime: '13:30',
      location: 'The Capital Grille',
      attendees: 'Michael Reynolds',
      type: 'meeting',
      status: 'confirmed'
    },
    {
      id: 5,
      title: 'Property Showing - 789 Woodland Hills',
      description: 'Show luxury cabin to the Thompson family',
      startDate: '2025-03-13',
      startTime: '11:00',
      endDate: '2025-03-13',
      endTime: '12:30',
      location: '789 Woodland Hills Rd',
      attendees: 'David Thompson, Lisa Thompson',
      type: 'viewing',
      status: 'confirmed'
    },
    {
      id: 6,
      title: 'Doctor Appointment',
      description: 'Annual checkup',
      startDate: '2025-03-14',
      startTime: '09:00',
      endDate: '2025-03-14',
      endTime: '10:00',
      location: 'City Medical Center',
      attendees: '',
      type: 'personal',
      status: 'confirmed'
    },
    {
      id: 7,
      title: 'Client Call - Potential Listing',
      description: 'Discuss listing their downtown penthouse',
      startDate: '2025-03-14',
      startTime: '15:00',
      endDate: '2025-03-14',
      endTime: '15:30',
      location: 'Phone',
      attendees: 'Jennifer Davis',
      type: 'meeting',
      status: 'tentative'
    }
  ]);

  // Function to handle adding new event
  const handleAddEvent = () => {
    const lastId = events.length > 0 ? Math.max(...events.map(event => event.id)) : 0;
    const newEventWithId = {
      ...newEvent,
      id: lastId + 1
    };
    setEvents([...events, newEventWithId]);
    setNewEvent({
      title: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endDate: new Date().toISOString().split('T')[0],
      endTime: '10:00',
      location: '',
      attendees: '',
      type: 'meeting',
      status: 'confirmed'
    });
    setShowAddEventModal(false);
  };

  // Function to handle opening the event details
  const handleOpenEvent = (event) => {
    setSelectedEvent(event);
    setIsEditMode(false);
    setShowEventDetailsModal(true);
  };

  // Function to handle updating an event
  const handleUpdateEvent = () => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? selectedEvent : event
    );
    setEvents(updatedEvents);
    setShowEventDetailsModal(false);
    setIsEditMode(false);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventDetailsModal(false);
  };

  // Helper function to generate days in month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Add days from previous month to fill the first week
    const prevMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid
    const totalDaysAdded = days.length;
    const daysNeeded = Math.ceil(totalDaysAdded / 7) * 7 - totalDaysAdded;
    
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Helper function to check if an event is on a specific day
  const getEventsForDay = (day) => {
    const dayStr = day.toISOString().split('T')[0];
    return events.filter(event => {
      // Make sure the event's type matches a filter key (now using singular keys)
      if (!filters[event.type]) return false;
      return event.startDate === dayStr;
    });
  };

  // Get events for the current month for agenda view
  const getEventsForMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayStr = firstDay.toISOString().split('T')[0];
    const lastDayStr = lastDay.toISOString().split('T')[0];
    
    return events.filter(event => {
      if (!filters[event.type]) return false;
      return event.startDate >= firstDayStr && event.startDate <= lastDayStr;
    }).sort((a, b) => {
      // Sort by date first
      const dateComparison = a.startDate.localeCompare(b.startDate);
      if (dateComparison !== 0) return dateComparison;
      
      // If same date, sort by time
      return a.startTime.localeCompare(b.startTime);
    });
  };
  
  // Generate days for the current month view
  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Helper functions to navigate between dates
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setExpandedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setExpandedDay(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setExpandedDay(null);
  };

  // Helper function to format time for display
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Helper function to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to get the color for event type
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return {
          bg: 'bg-indigo-500',
          text: 'text-white',
          light: 'bg-indigo-50 text-indigo-800',
          border: 'border-indigo-200'
        };
      case 'viewing':
        return {
          bg: 'bg-emerald-500',
          text: 'text-white',
          light: 'bg-emerald-50 text-emerald-800',
          border: 'border-emerald-200'
        };
      case 'deadline':
        return {
          bg: 'bg-amber-500',
          text: 'text-white',
          light: 'bg-amber-50 text-amber-800',
          border: 'border-amber-200'
        };
      case 'personal':
        return {
          bg: 'bg-purple-500',
          text: 'text-white',
          light: 'bg-purple-50 text-purple-800',
          border: 'border-purple-200'
        };
      default:
        return {
          bg: 'bg-slate-500',
          text: 'text-white',
          light: 'bg-slate-50 text-slate-800',
          border: 'border-slate-200'
        };
    }
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle2 size={12} />
            Confirmed
          </Badge>
        );
      case 'tentative':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock8 size={12} />
            Tentative
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle size={12} />
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  // Function to get icon for event type
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting':
        return <Users size={14} />;
      case 'viewing':
        return <MapPin size={14} />;
      case 'deadline':
        return <CalendarClock size={14} />;
      case 'personal':
        return <Calendar size={14} />;
      default:
        return <Calendar size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Sidebar activePage="calendar" />
      
      {/* Main Content */}
      <div className="lg:pl-72 min-h-screen">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Calendar</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your schedule, meetings, and appointments</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="inline-flex rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setViewMode('month')}
                        variant={viewMode === 'month' ? "default" : "outline"}
                        size="sm"
                        className={`rounded-l-lg ${viewMode === 'month' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}`}
                      >
                        <Grid size={16} className="mr-1" />
                        Month
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Month view</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setViewMode('agenda')}
                        variant={viewMode === 'agenda' ? "default" : "outline"}
                        size="sm"
                        className={`rounded-r-lg ${viewMode === 'agenda' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}`}
                      >
                        <List size={16} className="mr-1" />
                        Agenda
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Agenda view</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)} className="gap-2 h-10">
                        <Filter size={14} />
                        Filters
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Filter events by type</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white dark:bg-slate-800 py-2 shadow-lg ring-1 ring-black ring-opacity-5 z-20 border border-slate-200 dark:border-slate-700">
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Filter Events</h3>
                    </div>
                    <div className="px-4 py-2 space-y-2">
                      <Label className="flex items-center gap-3 py-1 cursor-pointer">
                        <div className="flex items-center justify-center w-5 h-5">
                          <Input
                            type="checkbox"
                            checked={filters.meeting}
                            onChange={() => setFilters({ ...filters, meeting: !filters.meeting })}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <span className="text-sm flex items-center gap-2">
                          <Users size={14} className="text-indigo-500" />
                          Meetings
                        </span>
                      </Label>
                      <Label className="flex items-center gap-3 py-1 cursor-pointer">
                        <div className="flex items-center justify-center w-5 h-5">
                          <Input
                            type="checkbox"
                            checked={filters.viewing}
                            onChange={() => setFilters({ ...filters, viewing: !filters.viewing })}
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                        </div>
                        <span className="text-sm flex items-center gap-2">
                          <MapPin size={14} className="text-emerald-500" />
                          Property Viewings
                        </span>
                      </Label>
                      <Label className="flex items-center gap-3 py-1 cursor-pointer">
                        <div className="flex items-center justify-center w-5 h-5">
                          <Input
                            type="checkbox"
                            checked={filters.deadline}
                            onChange={() => setFilters({ ...filters, deadline: !filters.deadline })}
                            className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                          />
                        </div>
                        <span className="text-sm flex items-center gap-2">
                          <CalendarClock size={14} className="text-amber-500" />
                          Deadlines
                        </span>
                      </Label>
                      <Label className="flex items-center gap-3 py-1 cursor-pointer">
                        <div className="flex items-center justify-center w-5 h-5">
                          <Input
                            type="checkbox"
                            checked={filters.personal}
                            onChange={() => setFilters({ ...filters, personal: !filters.personal })}
                            className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          />
                        </div>
                        <span className="text-sm flex items-center gap-2">
                          <Calendar size={14} className="text-purple-500" />
                          Personal
                        </span>
                      </Label>
                    </div>
                  </div>
                )}
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => setShowAddEventModal(true)} className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm h-10">
                      <Plus size={16} className="mr-2" />
                      Add Event
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Create a new event</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Search and Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <div className="flex items-center w-full relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <Search className="absolute left-3 text-slate-400" size={18} />
                <Input placeholder="Search events..." className="pl-10 border-0 h-12 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0" />
              </div>
            </div>
            <div className="relative">
              <Card className="border border-slate-200 dark:border-slate-700 shadow-sm p-0">
                <div className="flex items-center justify-between h-12">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={goToPreviousMonth} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg h-12 w-12">
                          <ChevronLeft size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Previous month</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white whitespace-nowrap">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={goToNextMonth} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg h-12 w-12">
                          <ChevronRight size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Next month</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button 
                    variant="outline" 
                    onClick={goToToday}
                    className="text-sm font-medium mx-3 h-8"
                  >
                    Today
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Month View */}
          {viewMode === 'month' && (
            <Card className="overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="py-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-700/20">
                {days.map((day, index) => {
                  const dayStr = day.date.toISOString().split('T')[0];
                  const dayEvents = getEventsForDay(day.date);
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[150px] p-3 transition-colors duration-150 ${
                        !day.isCurrentMonth 
                          ? 'bg-slate-50 dark:bg-slate-800/30 text-slate-400' 
                          : isToday 
                            ? 'bg-indigo-50/50 dark:bg-indigo-900/10' 
                            : 'bg-white dark:bg-slate-800/10'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span
                            className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium ${
                              isToday
                                ? 'bg-indigo-600 text-white'
                                : day.isCurrentMonth
                                  ? 'text-slate-900 dark:text-white'
                                  : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {day.date.getDate()}
                          </span>
                        </div>
                        {dayEvents.length > 0 && (
                          <Badge variant="outline" className="text-xs bg-white dark:bg-slate-800 shadow-sm">
                            {dayEvents.length}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 space-y-2">
                        {(expandedDay === dayStr ? dayEvents : dayEvents.slice(0, 3))
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map((event) => {
                            const colors = getEventTypeColor(event.type);
                            return (
                              <TooltipProvider key={event.id}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      onClick={() => handleOpenEvent(event)}
                                      className={`px-2 py-1.5 text-xs rounded-md cursor-pointer group transition-all duration-200 hover:shadow-md ${colors.light} border-l-2 ${colors.bg.replace('bg-', 'border-l-')} overflow-hidden`}
                                    >
                                      <div className="flex items-center gap-1">
                                        <span className="font-medium whitespace-nowrap">{formatTime(event.startTime)}</span>
                                        <span className="truncate font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 max-w-[80%]">{event.title}</span>
                                      </div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-xs">
                                    <div className="p-1">
                                      <p className="font-bold">{event.title}</p>
                                      <p className="text-xs mt-1">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                                      {event.location && <p className="text-xs mt-1">{event.location}</p>}
                                      {event.description && <p className="text-xs mt-1 italic">{event.description}</p>}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            );
                          })}
                        {dayEvents.length > 3 && expandedDay !== dayStr && (
                          <button
                            onClick={() => setExpandedDay(dayStr)}
                            className="text-xs text-indigo-600 hover:underline"
                          >
                            + {dayEvents.length - 3} more
                          </button>
                        )}
                        {expandedDay === dayStr && dayEvents.length > 3 && (
                          <button
                            onClick={() => setExpandedDay(null)}
                            className="text-xs text-indigo-600 hover:underline"
                          >
                            Show less
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
          
          {/* Agenda View */}
          {viewMode === 'agenda' && (
            <Card className="overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <CardTitle className="text-xl font-bold">Events for {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</CardTitle>
                  <CardDescription>
                    Showing all scheduled appointments and meetings
                  </CardDescription>
                </div>
                <Select 
                  value={filters.meeting && filters.viewing && filters.deadline && filters.personal ? "all" : "filtered"} 
                  onValueChange={(value) => {
                    if (value === "all") {
                      setFilters({meeting: true, viewing: true, deadline: true, personal: true});
                    }
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All events</SelectItem>
                    <SelectItem value="filtered">Filtered</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>

              <div className="p-4">
                {getEventsForMonth().length > 0 ? (
                  <div className="space-y-6">
                    {/* Group events by date */}
                    {Object.entries(
                      getEventsForMonth().reduce((groups, event) => {
                        const date = event.startDate;
                        if (!groups[date]) {
                          groups[date] = [];
                        }
                        groups[date].push(event);
                        return groups;
                      }, {})
                    ).map(([date, dayEvents]) => {
                      const eventDate = new Date(date);
                      const isToday = eventDate.toDateString() === new Date().toDateString();
                      
                      return (
                        <div key={date}>
                          <div className={`p-3 mb-3 rounded-lg ${isToday ? 'bg-indigo-50 dark:bg-indigo-900/10' : 'bg-slate-50 dark:bg-slate-800/20'}`}>
                            <h3 className={`text-lg font-semibold ${isToday ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
                              {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                              {isToday && <Badge variant="outline" className="ml-2 bg-indigo-100 text-indigo-700 border-indigo-200">Today</Badge>}
                            </h3>
                          </div>

                          <div className="space-y-4 pl-2">
                            {dayEvents
                              .sort((a, b) => a.startTime.localeCompare(b.startTime))
                              .map((event) => {
                                const colors = getEventTypeColor(event.type);
                                return (
                                  <Card
                                    key={event.id}
                                    className="border hover:shadow-md transition-all duration-200 cursor-pointer group overflow-visible"
                                    onClick={() => handleOpenEvent(event)}
                                  >
                                    <div className={`h-2 w-full ${colors.bg}`}></div>
                                    <CardContent className="p-6 grid grid-cols-12 gap-6">
                                      <div className="col-span-2 sm:col-span-1">
                                        <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                                            {formatTime(event.startTime).replace(' ', '').replace('AM', '').replace('PM', '')}
                                          </div>
                                          <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {formatTime(event.startTime).includes('AM') ? 'AM' : 'PM'}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-span-10 sm:col-span-11">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                          <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{event.title}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{event.description}</p>
                                          </div>
                                          <div className="flex items-start gap-2 shrink-0">
                                            <Badge variant="outline" className={`${colors.light} border ${colors.border}`}>
                                              <span className="flex items-center gap-1">
                                                {getEventTypeIcon(event.type)}
                                                <span className="capitalize">{event.type}</span>
                                              </span>
                                            </Badge>
                                            {getStatusBadge(event.status)}
                                          </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-4">
                                          {event.location && (
                                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                              <MapPin size={16} className="mr-1.5" />
                                              <span className="truncate max-w-xs">{event.location}</span>
                                            </div>
                                          )}
                                          {event.attendees && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                              <Users size={16} />
                                              <div className="flex -space-x-2 mr-2">
                                                {event.attendees.split(',').slice(0, 3).map((attendee, idx) => (
                                                  <Avatar key={idx} className="h-7 w-7 border-2 border-white dark:border-slate-800">
                                                    <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                                      {getInitials(attendee.trim())}
                                                    </AvatarFallback>
                                                  </Avatar>
                                                ))}
                                                {event.attendees.split(',').length > 3 && (
                                                  <Avatar className="h-7 w-7 border-2 border-white dark:border-slate-800">
                                                    <AvatarFallback className="text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                                      +{event.attendees.split(',').length - 3}
                                                    </AvatarFallback>
                                                  </Avatar>
                                                )}
                                              </div>
                                              <Popover>
                                                <PopoverTrigger asChild>
                                                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-transparent hover:underline">
                                                    View all
                                                  </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-64 p-2">
                                                  <div className="space-y-1.5">
                                                    {event.attendees.split(',').map((attendee, idx) => (
                                                      <div key={idx} className="flex items-center gap-2 py-1">
                                                        <Avatar className="h-6 w-6">
                                                          <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                                            {getInitials(attendee.trim())}
                                                          </AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm">{attendee.trim()}</span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </PopoverContent>
                                              </Popover>
                                            </div>
                                          )}
                                          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                            <Clock size={16} className="mr-1.5" />
                                            <span>
                                              {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                    <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No events scheduled</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add a new event to get started.</p>
                    <div className="mt-6">
                      <Button onClick={() => setShowAddEventModal(true)} className="bg-indigo-600 text-white hover:bg-indigo-700">
                        <Plus size={16} className="mr-2" />
                        Add Event
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </main>
      </div>
      
      {/* Add Event Modal using shadcn Dialog */}
      <Dialog open={showAddEventModal} onOpenChange={setShowAddEventModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">Event Title*</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Enter event description"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium">Start Date*</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="startTime" className="text-sm font-medium">Start Time*</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="endDate" className="text-sm font-medium">End Date*</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-sm font-medium">End Time*</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Enter location"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="attendees" className="text-sm font-medium">Attendees</Label>
              <Input
                id="attendees"
                value={newEvent.attendees}
                onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                placeholder="Comma separated list of attendees"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="text-sm font-medium">Event Type*</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting" className="flex items-center gap-2">
                      <Users size={14} className="text-indigo-500" />
                      Meeting
                    </SelectItem>
                    <SelectItem value="viewing" className="flex items-center gap-2">
                      <MapPin size={14} className="text-emerald-500" />
                      Property Viewing
                    </SelectItem>
                    <SelectItem value="deadline" className="flex items-center gap-2">
                      <CalendarClock size={14} className="text-amber-500" />
                      Deadline
                    </SelectItem>
                    <SelectItem value="personal" className="flex items-center gap-2">
                      <Calendar size={14} className="text-purple-500" />
                      Personal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-sm font-medium">Status*</Label>
                <Select
                  value={newEvent.status}
                  onValueChange={(value) => setNewEvent({ ...newEvent, status: value })}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed" className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-500" />
                      Confirmed
                    </SelectItem>
                    <SelectItem value="tentative" className="flex items-center gap-2">
                      <Clock8 size={14} className="text-amber-500" />
                      Tentative
                    </SelectItem>
                    <SelectItem value="cancelled" className="flex items-center gap-2">
                      <XCircle size={14} className="text-red-500" />
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-end">
            <Button variant="outline" onClick={() => setShowAddEventModal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleAddEvent} 
              disabled={!newEvent.title || !newEvent.startDate || !newEvent.startTime || !newEvent.endDate || !newEvent.endTime}
            >
              <Plus size={16} className="mr-1" />
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Event Details Modal using shadcn Dialog */}
      {showEventDetailsModal && selectedEvent && (
        <Dialog open={showEventDetailsModal} onOpenChange={setShowEventDetailsModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-full ${getEventTypeColor(selectedEvent.type).bg}`}>
                    {getEventTypeIcon(selectedEvent.type)}
                  </span>
                  <DialogTitle className="text-xl font-bold">
                    {isEditMode ? "Edit Event" : "Event Details"}
                  </DialogTitle>
                </div>
                {!isEditMode && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsEditMode(true)}
                    className="rounded-full h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit size={16} />
                  </Button>
                )}
              </div>
            </DialogHeader>
            
            {isEditMode ? (
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="edit-title" className="text-sm font-medium">Event Title*</Label>
                  <Input
                    id="edit-title"
                    value={selectedEvent.title}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description" className="text-sm font-medium">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedEvent.description}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-startDate" className="text-sm font-medium">Start Date*</Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={selectedEvent.startDate}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, startDate: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-startTime" className="text-sm font-medium">Start Time*</Label>
                    <Input
                      id="edit-startTime"
                      type="time"
                      value={selectedEvent.startTime}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, startTime: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-endDate" className="text-sm font-medium">End Date*</Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={selectedEvent.endDate}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, endDate: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-endTime" className="text-sm font-medium">End Time*</Label>
                    <Input
                      id="edit-endTime"
                      type="time"
                      value={selectedEvent.endTime}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, endTime: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-location" className="text-sm font-medium">Location</Label>
                  <Input
                    id="edit-location"
                    value={selectedEvent.location}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-attendees" className="text-sm font-medium">Attendees</Label>
                  <Input
                    id="edit-attendees"
                    value={selectedEvent.attendees}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, attendees: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-type" className="text-sm font-medium">Event Type*</Label>
                    <Select
                      value={selectedEvent.type}
                      onValueChange={(value) => setSelectedEvent({ ...selectedEvent, type: value })}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting" className="flex items-center gap-2">
                          <Users size={14} className="text-indigo-500" />
                          Meeting
                        </SelectItem>
                        <SelectItem value="viewing" className="flex items-center gap-2">
                          <MapPin size={14} className="text-emerald-500" />
                          Property Viewing
                        </SelectItem>
                        <SelectItem value="deadline" className="flex items-center gap-2">
                          <CalendarClock size={14} className="text-amber-500" />
                          Deadline
                        </SelectItem>
                        <SelectItem value="personal" className="flex items-center gap-2">
                          <Calendar size={14} className="text-purple-500" />
                          Personal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-status" className="text-sm font-medium">Status*</Label>
                    <Select
                      value={selectedEvent.status}
                      onValueChange={(value) => setSelectedEvent({ ...selectedEvent, status: value })}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed" className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-green-500" />
                          Confirmed
                        </SelectItem>
                        <SelectItem value="tentative" className="flex items-center gap-2">
                          <Clock8 size={14} className="text-amber-500" />
                          Tentative
                        </SelectItem>
                        <SelectItem value="cancelled" className="flex items-center gap-2">
                          <XCircle size={14} className="text-red-500" />
                          Cancelled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between items-stretch gap-2 pt-4">
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="justify-center"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete Event
                  </Button>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <Button variant="outline" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={handleUpdateEvent}
                    >
                      <Edit size={16} className="mr-1" />
                      Update Event
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            ) : (
              <div className="py-2">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedEvent.title}</h2>
                    {selectedEvent.description && (
                      <p className="mt-2 text-slate-600 dark:text-slate-300">{selectedEvent.description}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedEvent.status)}
                      <Badge variant="outline" className={`${getEventTypeColor(selectedEvent.type).light} border ${getEventTypeColor(selectedEvent.type).border}`}>
                        <span className="flex items-center gap-1">
                          {getEventTypeIcon(selectedEvent.type)}
                          <span className="capitalize">{selectedEvent.type}</span>
                        </span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-slate-400 dark:text-slate-500 mt-0.5">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {new Date(selectedEvent.startDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                        </p>
                      </div>
                    </div>
                    
                    {selectedEvent.location && (
                      <div className="flex items-start gap-3">
                        <div className="text-slate-400 dark:text-slate-500 mt-0.5">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{selectedEvent.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedEvent.attendees && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Attendees</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.attendees.split(',').map((attendee, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-800 shadow-sm rounded-full px-3 py-1.5 border border-slate-200 dark:border-slate-700">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                                {getInitials(attendee.trim())}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{attendee.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter className="pt-4 flex gap-2 justify-between">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDeleteEvent(selectedEvent.id)}
                      className="justify-center"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                    <Button variant="outline" onClick={() => setShowEventDetailsModal(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarPage;