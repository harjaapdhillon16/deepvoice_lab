// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import {
    Home,
    Info,
    Search,
    Plus,
    Filter,
    Phone,
    PhoneCall,
    PhoneMissed,
    CalendarDays,
    Calendar,
    Clock,
    Users,
    UserCircle,
    FileText,
    Download,
    MoreHorizontal,
    BarChart3,
    PieChart,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    ListTodo,
    RefreshCcw,
    Play,
    Pause,
    Volume2,
    ThumbsUp,
    ThumbsDown,
    CircleDollarSign,
    CheckCircle2,
    XCircle,
    Mic,
    PlayCircle,
    BookOpen,
    Headphones,
    MapPin
} from 'lucide-react';

// Import Sidebar component
import Sidebar from '@/components/custom/real_estate/sidebar';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const AICallsPage = () => {
    // States for calls, filtering and selection
    const [calls, setCalls] = useState([]);
    const [filteredCalls, setFilteredCalls] = useState([]);
    const [selectedCall, setSelectedCall] = useState(null);
    const [isViewingCall, setIsViewingCall] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRangeFilter, setDateRangeFilter] = useState('all-time');
    const [leadTypeFilter, setLeadTypeFilter] = useState('all');
    const [showNewCallModal, setShowNewCallModal] = useState(false);

    // Usage and billing stats
    const [usageSummary, setUsageSummary] = useState({
        totalCalls: 0,
        totalMinutes: 0,
        totalCost: 0,
        averageDuration: 0,
        successRate: 0,
        callsThisMonth: 0,
        costThisMonth: 0,
        minutesThisMonth: 0
    });

    // Stats for charts
    const [dailyCallStats, setDailyCallStats] = useState([]);
    const [callOutcomeStats, setCallOutcomeStats] = useState([]);
    const [leadTypeStats, setLeadTypeStats] = useState([]);

    // Demo playback state
    const [isPlayingDemo, setIsPlayingDemo] = useState(false);
    const [demoProgress, setDemoProgress] = useState(0);
    const [demoVolume, setDemoVolume] = useState(80);

    // New call scheduling state
    const [newCall, setNewCall] = useState({
        recipient: '',
        recipientPhone: '',
        leadType: 'buyer',
        scheduledFor: new Date().toISOString().split('T')[0],
        scheduledTime: '09:00',
        purpose: '',
        script: 'default-followup',
        notes: ''
    });

    // Demo modal (for voice AI demo video)
    const [showDemoModal, setShowDemoModal] = useState(false);

    // Sample call data (simulate API call)
    useEffect(() => {
        const sampleCalls = [
            {
                id: 'call-2025-001',
                recipient: 'Robert Johnson',
                recipientPhone: '(310) 555-1234',
                leadType: 'buyer',
                date: '2025-03-10',
                time: '14:30',
                duration: 340,
                status: 'completed',
                outcome: 'interested',
                cost: 0.76,
                agent: 'PropertyPro AI',
                transcript: [
                    { speaker: 'ai', text: "Hello, this is PropertyPro AI calling on behalf of John Smith from Premier Real Estate. Is this Robert Johnson?", timestamp: '00:00' },
                    { speaker: 'client', text: "Yes, this is Robert.", timestamp: '00:04' },
                    { speaker: 'ai', text: "Hi Robert! I'm following up on your interest in Malibu oceanfront properties. Would you like more details?", timestamp: '00:06' },
                    { speaker: 'client', text: "Yes, please email me the details.", timestamp: '00:12' },
                    { speaker: 'ai', text: "Great, I've scheduled a property tour for next Tuesday at 2:00 PM. Thank you!", timestamp: '00:18' }
                ],
                summary: "Robert confirmed his interest in Malibu oceanfront properties and scheduled a tour for next Tuesday at 2:00 PM.",
                actionItems: [
                    "Email property details",
                    "Confirm tour appointment for next Tuesday"
                ],
                sentiment: 'positive',
                recording: 'call-recording-001.mp3'
            },
            {
                id: 'call-2025-002',
                recipient: 'Elizabeth Taylor',
                recipientPhone: '(970) 555-6789',
                leadType: 'seller',
                date: '2025-03-09',
                time: '10:15',
                duration: 405,
                status: 'completed',
                outcome: 'follow-up-required',
                cost: 0.92,
                agent: 'PropertyPro AI',
                transcript: [
                    { speaker: 'ai', text: "Hello, this is PropertyPro AI calling on behalf of John Smith. Am I speaking with Elizabeth Taylor?", timestamp: '00:00' },
                    { speaker: 'client', text: "Yes, this is Elizabeth.", timestamp: '00:05' },
                    { speaker: 'ai', text: "I'm following up regarding your listing agreement. Would you like John to call you about commission details?", timestamp: '00:08' },
                    { speaker: 'client', text: "Yes, please have him call tomorrow at 3:00 PM.", timestamp: '00:16' }
                ],
                summary: "Elizabeth has questions about commission structure. A call is scheduled for tomorrow at 3:00 PM.",
                actionItems: [
                    "Schedule call at 3:00 PM",
                    "Prepare commission details and comparable sales info"
                ],
                sentiment: 'neutral',
                recording: 'call-recording-002.mp3'
            },
            {
                id: 'call-2025-003',
                recipient: 'David Thompson',
                recipientPhone: '(503) 555-9012',
                leadType: 'buyer',
                date: '2025-03-08',
                time: '16:45',
                duration: 0,
                status: 'no-answer',
                outcome: 'voicemail',
                cost: 0.12,
                agent: 'PropertyPro AI',
                transcript: [
                    { speaker: 'ai', text: "Hello, I'm calling to confirm your property viewing scheduled for tomorrow. Please call back.", timestamp: '00:00' }
                ],
                summary: "Voicemail left for David confirming his viewing appointment.",
                actionItems: [
                    "Follow up if no confirmation received"
                ],
                sentiment: 'neutral',
                recording: 'call-recording-003.mp3'
            }
            // ... add more sample calls as needed
        ];
        setCalls(sampleCalls);
        setFilteredCalls(sampleCalls);

        // Calculate usage summary
        const totalCalls = sampleCalls.length;
        const completedCalls = sampleCalls.filter(call => call.status === 'completed').length;
        const totalDuration = sampleCalls.reduce((total, call) => total + call.duration, 0);
        const totalCost = sampleCalls.reduce((total, call) => total + call.cost, 0);
        const averageDuration = completedCalls > 0 ? Math.round(totalDuration / completedCalls) : 0;
        const successRate = totalCalls > 0 ? (completedCalls / totalCalls) * 100 : 0;
        // For demo purposes, assume all calls are this month
        const thisMonthCalls = sampleCalls;
        const costThisMonth = thisMonthCalls.reduce((total, call) => total + call.cost, 0);
        const minutesThisMonth = Math.round(thisMonthCalls.reduce((total, call) => total + call.duration, 0) / 60);

        setUsageSummary({
            totalCalls,
            totalMinutes: Math.round(totalDuration / 60),
            totalCost,
            averageDuration,
            successRate,
            callsThisMonth: thisMonthCalls.length,
            costThisMonth,
            minutesThisMonth
        });

        // Daily call stats (for demo)
        const dates = ["Mar 8", "Mar 9", "Mar 10"];
        const callCounts = [1, 1, 1];
        const costs = [0.12, 0.92, 0.76];
        setDailyCallStats(dates.map((date, index) => ({
            date,
            calls: callCounts[index],
            cost: costs[index]
        })));

        // Outcome stats (for demo)
        setCallOutcomeStats([
            { outcome: 'Interested', count: 1 },
            { outcome: 'Follow-up', count: 1 },
            { outcome: 'Voicemail', count: 1 }
        ]);

        // Lead type stats (for demo)
        setLeadTypeStats([
            { type: 'Buyer', count: 2 },
            { type: 'Seller', count: 1 }
        ]);
    }, []);

    // Apply filters and search for calls
    useEffect(() => {
        let result = [...calls];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(call =>
                call.recipient.toLowerCase().includes(query) ||
                call.recipientPhone.toLowerCase().includes(query) ||
                call.leadType.toLowerCase().includes(query)
            );
        }
        if (statusFilter !== 'all') {
            result = result.filter(call => call.status === statusFilter);
        }
        if (leadTypeFilter !== 'all') {
            result = result.filter(call => call.leadType === leadTypeFilter);
        }
        if (dateRangeFilter !== 'all-time') {
            const today = new Date();
            let startDate;
            switch (dateRangeFilter) {
                case 'today':
                    startDate = new Date(today);
                    break;
                case 'yesterday':
                    startDate = new Date(today);
                    startDate.setDate(startDate.getDate() - 1);
                    break;
                case 'this-week':
                    startDate = new Date(today);
                    startDate.setDate(startDate.getDate() - today.getDay());
                    break;
                case 'last-7-days':
                    startDate = new Date(today);
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 'this-month':
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                    break;
                case 'last-30-days':
                    startDate = new Date(today);
                    startDate.setDate(startDate.getDate() - 30);
                    break;
                default:
                    startDate = new Date(0);
            }
            result = result.filter(call => new Date(call.date) >= startDate && new Date(call.date) <= today);
        }
        // Sort by date (newest first)
        result.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
        setFilteredCalls(result);
    }, [calls, searchQuery, statusFilter, leadTypeFilter, dateRangeFilter]);

    // Handlers
    const handleViewCall = (call) => {
        setSelectedCall(call);
        setIsViewingCall(true);
    };

    const formatDuration = (seconds) => {
        if (seconds === 0) return 'N/A';
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;
        return `${minutes}:${remaining.toString().padStart(2, '0')}`;
    };

    const formatDateStr = (dateStr) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    const formatCost = (cost) => `$${cost.toFixed(2)}`;

    // Badge renderers
    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Completed
                    </Badge>
                );
            case 'in-progress':
                return (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        <Phone className="w-3.5 h-3.5 mr-1" />
                        In Progress
                    </Badge>
                );
            case 'scheduled':
                return (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        Scheduled
                    </Badge>
                );
            case 'no-answer':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <PhoneMissed className="w-3.5 h-3.5 mr-1" />
                        No Answer
                    </Badge>
                );
            case 'failed':
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Failed
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getOutcomeBadge = (outcome) => {
        switch (outcome) {
            case 'interested':
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                        Interested
                    </Badge>
                );
            case 'not-interested':
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                        <ThumbsDown className="w-3.5 h-3.5 mr-1" />
                        Not Interested
                    </Badge>
                );
            case 'appointment-scheduled':
                return (
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">
                        <CalendarDays className="w-3.5 h-3.5 mr-1" />
                        Appointment
                    </Badge>
                );
            case 'follow-up-required':
                return (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                        <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                        Follow-up
                    </Badge>
                );
            case 'voicemail':
                return (
                    <Badge className="bg-slate-100 text-slate-800 border-slate-300">
                        <Headphones className="w-3.5 h-3.5 mr-1" />
                        Voicemail
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getSentimentBadge = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                        Positive
                    </Badge>
                );
            case 'neutral':
                return (
                    <Badge className="bg-slate-100 text-slate-800 border-slate-300">
                        <Info className="w-3.5 h-3.5 mr-1" />
                        Neutral
                    </Badge>
                );
            case 'negative':
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                        <ThumbsDown className="w-3.5 h-3.5 mr-1" />
                        Negative
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getLeadTypeBadge = (leadType) => {
        switch (leadType) {
            case 'buyer':
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <UserCircle className="w-3.5 h-3.5 mr-1" />
                        Buyer
                    </Badge>
                );
            case 'seller':
                return (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <Home className="w-3.5 h-3.5 mr-1" />
                        Seller
                    </Badge>
                );
            case 'developer':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        Developer
                    </Badge>
                );
            case 'renter':
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        <UserCircle className="w-3.5 h-3.5 mr-1" />
                        Renter
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        <User className="w-3.5 h-3.5 mr-1" />
                        {leadType.charAt(0).toUpperCase() + leadType.slice(1)}
                    </Badge>
                );
        }
    };

    const getProgressColor = (progress) => {
        if (progress < 25) return 'bg-red-500';
        if (progress < 50) return 'bg-yellow-500';
        if (progress < 75) return 'bg-blue-500';
        return 'bg-green-500';
    };

    // Toggle demo playback simulation
    const toggleDemoPlayback = () => {
        setIsPlayingDemo(!isPlayingDemo);
        if (!isPlayingDemo) {
            let prog = 0;
            const interval = setInterval(() => {
                prog += 1;
                setDemoProgress(prog);
                if (prog >= 100) {
                    clearInterval(interval);
                    setIsPlayingDemo(false);
                    setDemoProgress(0);
                }
            }, 300);
        } else {
            setDemoProgress(0);
        }
    };

    const handleVolumeChange = (e) => {
        setDemoVolume(parseInt(e.target.value));
    };

    const handleScheduleCall = () => {
        console.log('Scheduling new call:', newCall);
        setShowNewCallModal(false);
        setNewCall({
            recipient: '',
            recipientPhone: '',
            leadType: 'buyer',
            scheduledFor: new Date().toISOString().split('T')[0],
            scheduledTime: '09:00',
            purpose: '',
            script: 'default-followup',
            notes: ''
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            <Sidebar activePage="calls" />
            <div className="lg:pl-72 min-h-screen">
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Calls</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Track AI calls, review conversation summaries, view call statistics, and manage your billing.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={() => setShowDemoModal(true)}
                                className="bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                <Mic className="w-4 h-4 mr-2" /> Experience Voice AI
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                placeholder="Search calls..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="statusFilter" className="min-w-[80px]">Status:</Label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger id="statusFilter" className="flex-1">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                    <SelectItem value="no-answer">No Answer</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="dateRangeFilter" className="min-w-[80px]">Date Range:</Label>
                            <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                                <SelectTrigger id="dateRangeFilter" className="flex-1">
                                    <SelectValue placeholder="All Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-time">All Time</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="yesterday">Yesterday</SelectItem>
                                    <SelectItem value="this-week">This Week</SelectItem>
                                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                    <SelectItem value="this-month">This Month</SelectItem>
                                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="leadTypeFilter" className="min-w-[80px]">Lead Type:</Label>
                            <Select value={leadTypeFilter} onValueChange={setLeadTypeFilter}>
                                <SelectTrigger id="leadTypeFilter" className="flex-1">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="buyer">Buyer</SelectItem>
                                    <SelectItem value="seller">Seller</SelectItem>
                                    <SelectItem value="developer">Developer</SelectItem>
                                    <SelectItem value="renter">Renter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Usage Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader className="flex items-center justify-between pb-2">
                                <CardTitle className="text-sm text-slate-500">Total Calls</CardTitle>
                                <PhoneCall className="w-4 h-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{usageSummary.totalCalls}</div>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {usageSummary.callsThisMonth} this month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex items-center justify-between pb-2">
                                <CardTitle className="text-sm text-slate-500">Total Cost</CardTitle>
                                <CircleDollarSign className="w-4 h-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">${usageSummary.totalCost.toFixed(2)}</div>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" />
                                    ${usageSummary.costThisMonth.toFixed(2)} this month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex items-center justify-between pb-2">
                                <CardTitle className="text-sm text-slate-500">Total Minutes</CardTitle>
                                <Clock className="w-4 h-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{usageSummary.totalMinutes}</div>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {usageSummary.minutesThisMonth} min this month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex items-center justify-between pb-2">
                                <CardTitle className="text-sm text-slate-500">Success Rate</CardTitle>
                                <BarChart3 className="w-4 h-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{Math.round(usageSummary.successRate)}%</div>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                    Avg. {formatDuration(usageSummary.averageDuration)} per call
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Calls List and Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Calls List */}
                        <div className={`lg:col-span-${isViewingCall ? '1' : '3'}`}>
                            <Card className="border border-slate-200">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                        <CardTitle>Call History ({filteredCalls.length})</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[calc(100vh-350px)]">
                                        <div className="space-y-2">
                                            {filteredCalls.map((call) => (
                                                <div
                                                    key={call.id}
                                                    onClick={() => handleViewCall(call)}
                                                    className={`p-3 border rounded-md cursor-pointer transition-all ${selectedCall && selectedCall.id === call.id
                                                        ? 'bg-indigo-50/80 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800/40 shadow-sm'
                                                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800/40'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start gap-2 mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8 border-2 border-slate-100 dark:border-slate-700 flex-shrink-0">
                                                                <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xs">
                                                                    {call.recipient.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h3 className="font-medium text-slate-900 dark:text-white text-sm">{call.recipient}</h3>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="flex gap-1.5">
                                                        {getLeadTypeBadge(call.leadType)}
                                                        {getStatusBadge(call.status)}
                                                    </div>

                                                    <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100 dark:border-slate-700/40">
                                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                                                            <div className="flex items-center gap-1">
                                                                <CalendarDays className="w-3 h-3 flex-shrink-0" />
                                                                {formatDateStr(call.date)}
                                                            </div>

                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            {call.status === 'completed' && (
                                                                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                                    {call.outcome.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                                </span>
                                                            )}
                                                            <div className="font-medium">{formatDuration(call.duration)}</div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center text-xs space-x-2 mt-1 text-gray-600'>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3 flex-shrink-0" />
                                                            {call.time}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <CircleDollarSign className="w-3 h-3 flex-shrink-0" />
                                                            {formatCost(call.cost)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {filteredCalls.length === 0 && (
                                                <div className="p-6 text-center">
                                                    <div className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600 mb-3">
                                                        <PhoneCall size={40} />
                                                    </div>
                                                    <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">No calls found</h3>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Try adjusting your search or filters</p>
                                                    <Button variant="outline" size="sm" onClick={() => {
                                                        setSearchQuery('');
                                                        setStatusFilter('all');
                                                        setDateRangeFilter('all-time');
                                                        setLeadTypeFilter('all');
                                                    }}>
                                                        Reset Filters
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Call Details Panel */}
                        {isViewingCall && selectedCall && (
                            <div className="lg:col-span-2">
                                <Card className="border border-slate-200">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <CardTitle>Call Details</CardTitle>
                                                {getStatusBadge(selectedCall.status)}
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => { setSelectedCall(null); setIsViewingCall(false); }}>
                                                <XCircle className="w-4 h-4 mr-1" /> Close
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[calc(100vh-340px)]">
                                            <Tabs defaultValue="summary" className="w-full">
                                                <TabsList className="mb-4">
                                                    <TabsTrigger value="summary">Summary</TabsTrigger>
                                                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                                                    <TabsTrigger value="actions">Actions</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="summary" className="space-y-6">
                                                    <div className="flex flex-col md:flex-row gap-6 border-b pb-6">
                                                        <div className="flex-grow space-y-4">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-12 w-12 border">
                                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg">
                                                                        {selectedCall.recipient.split(' ').map(n => n[0]).join('')}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h2 className="text-xl font-semibold text-slate-900">{selectedCall.recipient}</h2>
                                                                    <div className="text-sm text-slate-500 flex items-center gap-1">
                                                                        <Phone className="w-3 h-3" />
                                                                        {selectedCall.recipientPhone}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <div className="text-xs text-slate-500">Date & Time</div>
                                                                    <div className="text-slate-900 font-medium flex items-center gap-1">
                                                                        <CalendarDays className="w-4 h-4" />
                                                                        {formatDateStr(selectedCall.date)} at {selectedCall.time}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs text-slate-500">Duration</div>
                                                                    <div className="text-slate-900 font-medium flex items-center gap-1">
                                                                        <Clock className="w-4 h-4" />
                                                                        {formatDuration(selectedCall.duration)}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs text-slate-500">Agent</div>
                                                                    <div className="text-slate-900 font-medium flex items-center gap-1">
                                                                        <UserCircle className="w-4 h-4" />
                                                                        {selectedCall.agent}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs text-slate-500">Cost</div>
                                                                    <div className="text-slate-900 font-medium flex items-center gap-1">
                                                                        <DollarSign className="w-4 h-4" />
                                                                        {formatCost(selectedCall.cost)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {getLeadTypeBadge(selectedCall.leadType)}
                                                                {selectedCall.status === 'completed' && getOutcomeBadge(selectedCall.outcome)}
                                                                {selectedCall.sentiment && getSentimentBadge(selectedCall.sentiment)}
                                                            </div>
                                                        </div>

                                                        {selectedCall.status === 'completed' && selectedCall.duration > 0 && (
                                                            <div className="flex flex-col items-center bg-slate-50 rounded-lg p-4 min-w-[200px]">
                                                                <Button variant="ghost" size="icon" className="rounded-full h-16 w-16 bg-white shadow">
                                                                    <PlayCircle className="h-10 w-10 text-indigo-500" />
                                                                </Button>
                                                                <div className="text-sm font-medium text-slate-900 mt-2">Play Recording</div>
                                                                <div className="text-xs text-slate-500 mt-1">{formatDuration(selectedCall.duration)} • MP3</div>
                                                                <Button variant="ghost" size="sm" className="mt-2">
                                                                    <Download className="w-4 h-4 mr-1" /> Download
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-medium text-slate-900 mb-3">Call Summary</h3>
                                                        <div className="bg-slate-50 rounded-lg p-4 text-slate-700">
                                                            <p className="whitespace-pre-line">{selectedCall.summary}</p>
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="transcript" className="space-y-6">
                                                    <h3 className="text-lg font-medium text-slate-900 mb-3">Transcript</h3>
                                                    <div className="space-y-4">
                                                        {selectedCall.transcript.map((line, index) => (
                                                            <div key={index} className="flex gap-3">
                                                                <div className="w-12 text-xs text-slate-500 pt-1">
                                                                    {line.timestamp}
                                                                </div>
                                                                <div className={`flex-grow p-3 rounded-lg border ${line.speaker === 'ai'
                                                                    ? 'bg-indigo-50 border-indigo-100'
                                                                    : 'bg-slate-50 border-slate-200'
                                                                    }`}>
                                                                    <div className="text-xs font-medium text-slate-500 mb-1">
                                                                        {line.speaker === 'ai' ? 'PropertyPro AI' : selectedCall.recipient}
                                                                    </div>
                                                                    <div>{line.text}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="actions" className="space-y-6">
                                                    <h3 className="text-lg font-medium text-slate-900 mb-3">Follow-up Actions</h3>
                                                    {selectedCall.actionItems && selectedCall.actionItems.length > 0 ? (
                                                        <div className="space-y-4">
                                                            {selectedCall.actionItems.map((item, index) => (
                                                                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg bg-white">
                                                                    <Checkbox id={`action-${index}`} className="mt-0.5" />
                                                                    <div className="flex-grow">
                                                                        <Label htmlFor={`action-${index}`} className="font-medium cursor-pointer">
                                                                            {item}
                                                                        </Label>
                                                                        <div className="flex items-center gap-3 mt-2">
                                                                            <Button variant="outline" size="sm" className="h-8">
                                                                                <Calendar className="w-3.5 h-3.5 mr-1" /> Schedule
                                                                            </Button>
                                                                            <Button variant="outline" size="sm" className="h-8">
                                                                                <UserCircle className="w-3.5 h-3.5 mr-1" /> Assign
                                                                            </Button>
                                                                            <Select defaultValue="medium">
                                                                                <SelectTrigger className="h-8 w-auto min-w-[100px]">
                                                                                    <SelectValue />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="high">High Priority</SelectItem>
                                                                                    <SelectItem value="medium">Medium Priority</SelectItem>
                                                                                    <SelectItem value="low">Low Priority</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <div className="mt-4">
                                                                <Button className="w-full">
                                                                    <Plus className="w-4 h-4 mr-1" /> Add Custom Action
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="p-8 text-center">
                                                            <div className="mx-auto h-12 w-12 text-slate-300 mb-4">
                                                                <ListTodo size={48} />
                                                            </div>
                                                            <h3 className="text-lg font-medium text-slate-900 mb-1">No action items</h3>
                                                            <p className="text-slate-500 mb-4">This call didn't generate any action items</p>
                                                            <Button>
                                                                <Plus className="w-4 h-4 mr-1" /> Add Custom Action
                                                            </Button>
                                                        </div>
                                                    )}
                                                </TabsContent>
                                            </Tabs>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Schedule New Call Modal */}
            <Dialog open={showNewCallModal} onOpenChange={setShowNewCallModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Schedule New AI Call</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to schedule an AI call.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="recipient">Recipient Name*</Label>
                            <Input
                                id="recipient"
                                value={newCall.recipient}
                                onChange={(e) => setNewCall({ ...newCall, recipient: e.target.value })}
                                placeholder="Enter recipient name"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="recipientPhone">Phone Number*</Label>
                            <Input
                                id="recipientPhone"
                                value={newCall.recipientPhone}
                                onChange={(e) => setNewCall({ ...newCall, recipientPhone: e.target.value })}
                                placeholder="Enter phone number"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="leadType">Lead Type*</Label>
                            <Select
                                value={newCall.leadType}
                                onValueChange={(value) => setNewCall({ ...newCall, leadType: value })}
                            >
                                <SelectTrigger id="leadType" className="mt-1">
                                    <SelectValue placeholder="Select lead type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="buyer">Buyer</SelectItem>
                                    <SelectItem value="seller">Seller</SelectItem>
                                    <SelectItem value="developer">Developer</SelectItem>
                                    <SelectItem value="renter">Renter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="scheduledFor">Call Date*</Label>
                                <Input
                                    id="scheduledFor"
                                    type="date"
                                    value={newCall.scheduledFor}
                                    onChange={(e) => setNewCall({ ...newCall, scheduledFor: e.target.value })}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="scheduledTime">Call Time*</Label>
                                <Input
                                    id="scheduledTime"
                                    type="time"
                                    value={newCall.scheduledTime}
                                    onChange={(e) => setNewCall({ ...newCall, scheduledTime: e.target.value })}
                                    required
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="purpose">Call Purpose*</Label>
                            <Input
                                id="purpose"
                                value={newCall.purpose}
                                onChange={(e) => setNewCall({ ...newCall, purpose: e.target.value })}
                                placeholder="Brief description of call purpose"
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="script">Script Template*</Label>
                            <Select
                                value={newCall.script}
                                onValueChange={(value) => setNewCall({ ...newCall, script: value })}
                            >
                                <SelectTrigger id="script" className="mt-1">
                                    <SelectValue placeholder="Select script template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default-followup">Default Follow-up</SelectItem>
                                    <SelectItem value="property-showing">Property Showing Confirmation</SelectItem>
                                    <SelectItem value="listing-inquiry">Listing Inquiry</SelectItem>
                                    <SelectItem value="feedback-request">Feedback Request</SelectItem>
                                    <SelectItem value="custom">Custom Script</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Textarea
                                id="notes"
                                value={newCall.notes}
                                onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
                                placeholder="Add any additional information or context for the AI"
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewCallModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleScheduleCall} className="bg-indigo-600 text-white hover:bg-indigo-700">
                            Schedule Call
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Demo Modal for Voice AI */}
            <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Experience PropertyPro Voice AI</DialogTitle>
                        <DialogDescription>
                            See how our Voice AI makes natural-sounding calls to your leads and clients.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="pt-4 pb-6 aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/FcZSUURRDbI?si=yLv0JAcOewsT2NGA"
                            title="Voice AI Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDemoModal(false)}>
                            Close Demo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AICallsPage;