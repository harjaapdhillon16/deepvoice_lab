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
  List
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

const CalendarPage = () => {
  // State for calendar view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'agenda'
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
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

  // Function to handle updating an event
  const handleUpdateEvent = () => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? selectedEvent : event
    );
    setEvents(updatedEvents);
    setShowEventDetailsModal(false);
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

  // Generate days for the current month view
  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Helper function to format time for display
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Function to get the color for event type
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-indigo-500 text-white';
      case 'viewing':
        return 'bg-emerald-500 text-white';
      case 'deadline':
        return 'bg-amber-500 text-white';
      case 'personal':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-slate-500 text-white';
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
    <div className="min-h-screen bg-slate-50">
      <Sidebar activePage="calendar" />
      
      {/* Main Content */}
      <div className="lg:pl-72 min-h-screen">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Calendar</h1>
              <p className="text-sm text-slate-500 mt-1">Manage your schedule, meetings, and appointments</p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <div className="relative">
                <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
                
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="px-4 py-2 border-b border-slate-200">
                      <h3 className="text-sm font-semibold text-slate-900">Filter Events</h3>
                    </div>
                    <div className="px-4 py-2">
                      <Label className="flex items-center space-x-2 py-1">
                        <Input
                          type="checkbox"
                          checked={filters.meeting}
                          onChange={() => setFilters({ ...filters, meeting: !filters.meeting })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Meetings</span>
                      </Label>
                      <Label className="flex items-center space-x-2 py-1">
                        <Input
                          type="checkbox"
                          checked={filters.viewing}
                          onChange={() => setFilters({ ...filters, viewing: !filters.viewing })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Property Viewings</span>
                      </Label>
                      <Label className="flex items-center space-x-2 py-1">
                        <Input
                          type="checkbox"
                          checked={filters.deadline}
                          onChange={() => setFilters({ ...filters, deadline: !filters.deadline })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Deadlines</span>
                      </Label>
                      <Label className="flex items-center space-x-2 py-1">
                        <Input
                          type="checkbox"
                          checked={filters.personal}
                          onChange={() => setFilters({ ...filters, personal: !filters.personal })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Personal</span>
                      </Label>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="inline-flex rounded-lg shadow-sm">
                <Button
                  onClick={() => setViewMode('month')}
                  variant={viewMode === 'month' ? "default" : "outline"}
                  className="rounded-l-lg"
                >
                  <Grid size={16} />
                </Button>
                <Button
                  onClick={() => setViewMode('agenda')}
                  variant={viewMode === 'agenda' ? "default" : "outline"}
                  className="rounded-r-lg"
                >
                  <List size={16} />
                </Button>
              </div>
              
              <Button onClick={() => setShowAddEventModal(true)} className="bg-indigo-600 text-white">
                <Plus size={16} className="mr-2" />
                Add Event
              </Button>
            </div>
          </div>
          
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={goToPreviousMonth}>
                <ChevronLeft size={20} />
              </Button>
              <h2 className="text-xl font-semibold text-slate-800">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="ghost" onClick={goToNextMonth}>
                <ChevronRight size={20} />
              </Button>
            </div>
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
          </div>
          
          {/* Month View */}
          {viewMode === 'month' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-px border-b border-slate-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="py-2 text-center text-sm font-medium text-slate-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-slate-100">
                {days.map((day, index) => {
                  const dayStr = day.date.toISOString().split('T')[0];
                  const dayEvents = getEventsForDay(day.date);
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 bg-white ${
                        !day.isCurrentMonth ? 'text-slate-400' : isToday ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm font-medium ${
                            isToday
                              ? 'h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center'
                              : day.isCurrentMonth
                                ? 'text-slate-900'
                                : 'text-slate-400'
                          }`}
                        >
                          {day.date.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs text-slate-500">{dayEvents.length} events</span>
                        )}
                      </div>
                      <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                        {(expandedDay === dayStr ? dayEvents : dayEvents.slice(0, 3)).map((event) => (
                          <div
                            key={event.id}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventDetailsModal(true);
                            }}
                            className={`px-2 py-1 text-xs truncate rounded cursor-pointer ${getEventTypeColor(event.type)}`}
                          >
                            <div className="flex items-center">
                              <span className="mr-1">{formatTime(event.startTime)}</span>
                              <span className="truncate">{event.title}</span>
                            </div>
                          </div>
                        ))}
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
            </div>
          )}
          
          {/* Agenda View */}
          {viewMode === 'agenda' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-slate-200">
                {[...Array(7)].map((_, i) => {
                  const date = new Date(currentDate);
                  date.setDate(date.getDate() + i);
                  const dayEvents = getEventsForDay(date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  if (dayEvents.length === 0) return null;
                  
                  return (
                    <div key={i} className="py-4">
                      <div className={`px-4 py-2 flex items-center ${isToday ? 'bg-indigo-50' : ''}`}>
                        <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center mr-4 ${
                          isToday ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <span className="text-sm font-bold">{date.getDate()}</span>
                          <span className="text-xs">{date.toLocaleString('default', { weekday: 'short' })}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-slate-900">
                            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </h3>
                          <p className="text-sm text-slate-500">{dayEvents.length} events</p>
                        </div>
                      </div>
                      
                      <div className="mt-2 space-y-2 px-4">
                        {dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((event) => (
                          <div
                            key={event.id}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventDetailsModal(true);
                            }}
                            className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-slate-900">{event.title}</h4>
                                <div className="mt-1 flex items-center text-sm text-slate-500">
                                  <Clock size={14} className="mr-1" />
                                  <span>
                                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                  </span>
                                </div>
                                {event.location && (
                                  <div className="mt-1 flex items-center text-sm text-slate-500">
                                    <MapPin size={14} className="mr-1" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                                  {getEventTypeIcon(event.type)}
                                  <span className="ml-1 capitalize">{event.type}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {events.filter(event => {
                  const eventDate = new Date(event.startDate);
                  const startOfWeek = new Date(currentDate);
                  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                  const endOfWeek = new Date(startOfWeek);
                  endOfWeek.setDate(startOfWeek.getDate() + 6);
                  
                  return eventDate >= startOfWeek && eventDate <= endOfWeek && filters[event.type];
                }).length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-12 w-12 text-slate-300" />
                    <h3 className="mt-2 text-sm font-medium text-slate-900">No events for this week</h3>
                    <p className="mt-1 text-sm text-slate-500">Add a new event to get started.</p>
                    <div className="mt-6">
                      <Button onClick={() => setShowAddEventModal(true)}>
                        <Plus size={16} className="mr-2" />
                        Add Event
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Add Event Modal using shadcn Dialog */}
      <Dialog open={showAddEventModal} onOpenChange={setShowAddEventModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Event Title*</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Enter event description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date*</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time*</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="endDate">End Date*</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time*</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Enter location"
              />
            </div>
            <div>
              <Label htmlFor="attendees">Attendees</Label>
              <Input
                id="attendees"
                value={newEvent.attendees}
                onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                placeholder="Comma separated"
              />
            </div>
            <div>
              <Label htmlFor="type">Event Type*</Label>
              <select
                id="type"
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                className="mt-1 block w-full rounded-md border border-slate-300 p-2"
                required
              >
                <option value="meeting">Meeting</option>
                <option value="viewing">Property Viewing</option>
                <option value="deadline">Deadline</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div>
              <Label htmlFor="status">Status*</Label>
              <select
                id="status"
                value={newEvent.status}
                onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                className="mt-1 block w-full rounded-md border border-slate-300 p-2"
                required
              >
                <option value="confirmed">Confirmed</option>
                <option value="tentative">Tentative</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent} disabled={!newEvent.title || !newEvent.startDate || !newEvent.startTime || !newEvent.endDate || !newEvent.endTime}>
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
              <DialogTitle>Event Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Event Title*</Label>
                <Input
                  id="edit-title"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedEvent.description}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-startDate">Start Date*</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={selectedEvent.startDate}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-startTime">Start Time*</Label>
                  <Input
                    id="edit-startTime"
                    type="time"
                    value={selectedEvent.startTime}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, startTime: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-endDate">End Date*</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={selectedEvent.endDate}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, endDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-endTime">End Time*</Label>
                  <Input
                    id="edit-endTime"
                    type="time"
                    value={selectedEvent.endTime}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedEvent.location}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-attendees">Attendees</Label>
                <Input
                  id="edit-attendees"
                  value={selectedEvent.attendees}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, attendees: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Event Type*</Label>
                <select
                  id="edit-type"
                  value={selectedEvent.type}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-slate-300 p-2"
                  required
                >
                  <option value="meeting">Meeting</option>
                  <option value="viewing">Property Viewing</option>
                  <option value="deadline">Deadline</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status*</Label>
                <select
                  id="edit-status"
                  value={selectedEvent.status}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-slate-300 p-2"
                  required
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="tentative">Tentative</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowEventDetailsModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateEvent}>
                  <Edit size={16} className="mr-1" />
                  Update
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarPage;