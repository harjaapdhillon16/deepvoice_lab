// @ts-nocheck

'use client';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { format, parseISO } from 'date-fns';
import {
    Users,
    Search,
    Filter,
    Plus,
    Phone,
    Mail,
    Calendar,
    X,
    ChevronDown,
    Check,
    Star,
    Clock,
    ArrowUpRight,
    Trash,
    ArrowRight,
    MessageSquare,
    Facebook,
    Instagram,
    Globe,
    Home,
    Building,
    Briefcase,
    AlertCircle,
    DollarSign,
    FileText,
    MoreHorizontal,
    Edit2,
    User
} from 'lucide-react';
import Sidebar from '@/components/custom/real_estate/sidebar';

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Demo leads data
const leadsData = [
    {
        id: 1,
        name: "Jennifer Parker",
        email: "jennifer@example.com",
        phone: "(555) 123-4567",
        type: "Buyer",
        status: "New",
        source: "Facebook",
        score: 85,
        assignedAgent: {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@propertypro.com"
        },
        createdAt: "2024-02-10T14:30:00Z",
        lastContact: "2024-02-10T14:30:00Z",
        notes: "Looking for a 3-bedroom house in the downtown area with a budget of $500K-$700K.",
        preferences: {
            budget: {
                min: 500000,
                max: 700000
            },
            propertyTypes: ["Single Family", "Townhouse"],
            bedrooms: 3,
            bathrooms: 2,
            locations: ["Downtown", "Riverside"],
            features: ["Garage", "Garden", "Modern Kitchen"]
        },
        timeline: "3-6 months",
        preApproved: true,
        preApprovalAmount: 750000,
        activities: [
            {
                id: 1,
                type: "Note",
                content: "Initial contact made via Facebook lead form",
                date: "2024-02-10T14:30:00Z",
                user: "System"
            },
            {
                id: 2,
                type: "Email",
                content: "Sent welcome email with property suggestions",
                date: "2024-02-11T09:15:00Z",
                user: "Sarah Johnson"
            }
        ]
    },
    {
        id: 2,
        name: "Robert Davis",
        email: "robert@example.com",
        phone: "(555) 987-6543",
        type: "Seller",
        status: "Contacted",
        source: "Google",
        score: 72,
        assignedAgent: {
            id: 1,
            name: "John Smith",
            email: "john@propertypro.com"
        },
        createdAt: "2024-02-05T11:20:00Z",
        lastContact: "2024-02-07T16:45:00Z",
        notes: "Selling his 4-bedroom family home due to relocation. Property needs minor renovations.",
        property: {
            address: "456 Maple Street, Portland, OR 97209",
            type: "Single Family",
            bedrooms: 4,
            bathrooms: 2.5,
            area: 2800,
            yearBuilt: 1995,
            estimatedValue: 850000,
            features: ["Backyard", "Finished Basement", "Fireplace"]
        },
        timeline: "1-3 months",
        motivation: "Relocation",
        marketingPreferences: ["Virtual Tour", "Professional Photography", "Social Media"],
        activities: [
            {
                id: 3,
                type: "Note",
                content: "Lead came through Google Ads campaign",
                date: "2024-02-05T11:20:00Z",
                user: "System"
            },
            {
                id: 4,
                type: "Call",
                content: "Discussed property details and timeline for selling",
                date: "2024-02-07T16:45:00Z",
                user: "John Smith"
            }
        ]
    },
    {
        id: 3,
        name: "Amanda Miller",
        email: "amanda@example.com",
        phone: "(555) 456-7890",
        type: "Buyer",
        status: "Qualified",
        source: "Referral",
        score: 94,
        assignedAgent: {
            id: 3,
            name: "Michael Chen",
            email: "michael@propertypro.com"
        },
        createdAt: "2024-01-22T09:30:00Z",
        lastContact: "2024-02-09T13:15:00Z",
        notes: "First-time homebuyer looking for a condo. Has been pre-approved for a mortgage.",
        preferences: {
            budget: {
                min: 300000,
                max: 450000
            },
            propertyTypes: ["Condo", "Apartment"],
            bedrooms: 2,
            bathrooms: 2,
            locations: ["East Side", "North Hills"],
            features: ["Pool", "Gym", "Security Building"]
        },
        timeline: "1-3 months",
        preApproved: true,
        preApprovalAmount: 500000,
        activities: [
            {
                id: 5,
                type: "Note",
                content: "Referred by existing client James Wilson",
                date: "2024-01-22T09:30:00Z",
                user: "Michael Chen"
            },
            {
                id: 6,
                type: "Meeting",
                content: "Initial consultation to discuss requirements and preferences",
                date: "2024-01-25T14:00:00Z",
                user: "Michael Chen"
            },
            {
                id: 7,
                type: "Email",
                content: "Sent list of condos matching criteria",
                date: "2024-02-01T10:45:00Z",
                user: "Michael Chen"
            },
            {
                id: 8,
                type: "Showing",
                content: "Viewed 3 properties in the North Hills area",
                date: "2024-02-09T13:15:00Z",
                user: "Michael Chen"
            }
        ]
    },
    {
        id: 4,
        name: "Thomas Wilson",
        email: "thomas@example.com",
        phone: "(555) 789-0123",
        type: "Seller",
        status: "Negotiation",
        source: "Website",
        score: 89,
        assignedAgent: {
            id: 4,
            name: "Emma Wilson",
            email: "emma@propertypro.com"
        },
        createdAt: "2024-01-15T16:20:00Z",
        lastContact: "2024-02-08T11:30:00Z",
        notes: "Selling investment property. Already has a potential buyer but wants to list it to ensure best price.",
        property: {
            address: "789 Oakwood Avenue, Seattle, WA 98101",
            type: "Duplex",
            bedrooms: 4,
            bathrooms: 3,
            area: 3200,
            yearBuilt: 2005,
            estimatedValue: 920000,
            features: ["Separate Entrances", "Updated Kitchen", "Off-street Parking"]
        },
        timeline: "1-3 months",
        motivation: "Investment",
        marketingPreferences: ["MLS Listing", "Broker's Open", "Email Marketing"],
        activities: [
            {
                id: 9,
                type: "Note",
                content: "Submitted inquiry through website contact form",
                date: "2024-01-15T16:20:00Z",
                user: "System"
            },
            {
                id: 10,
                type: "Call",
                content: "Initial discussion about property and selling process",
                date: "2024-01-16T10:30:00Z",
                user: "Emma Wilson"
            },
            {
                id: 11,
                type: "Meeting",
                content: "Property evaluation and market analysis presentation",
                date: "2024-01-20T15:00:00Z",
                user: "Emma Wilson"
            },
            {
                id: 12,
                type: "Note",
                content: "Listing agreement signed, property to be listed next week",
                date: "2024-02-08T11:30:00Z",
                user: "Emma Wilson"
            }
        ]
    },
    {
        id: 5,
        name: "Michael Johnson",
        email: "michael.j@example.com",
        phone: "(555) 234-5678",
        type: "Buyer",
        status: "Nurturing",
        source: "Instagram",
        score: 68,
        assignedAgent: {
            id: 5,
            name: "David Thompson",
            email: "david@propertypro.com"
        },
        createdAt: "2024-02-01T08:45:00Z",
        lastContact: "2024-02-05T14:20:00Z",
        notes: "Interested in luxury properties. Still in early stages of looking.",
        preferences: {
            budget: {
                min: 1200000,
                max: 2000000
            },
            propertyTypes: ["Luxury", "Waterfront"],
            bedrooms: 4,
            bathrooms: 3.5,
            locations: ["Coastal Area", "Lakefront"],
            features: ["Swimming Pool", "Smart Home", "Wine Cellar"]
        },
        timeline: "6-12 months",
        preApproved: false,
        activities: [
            {
                id: 13,
                type: "Note",
                content: "Lead came through Instagram ad campaign",
                date: "2024-02-01T08:45:00Z",
                user: "System"
            },
            {
                id: 14,
                type: "Email",
                content: "Sent welcome email with luxury property listings",
                date: "2024-02-02T09:30:00Z",
                user: "David Thompson"
            },
            {
                id: 15,
                type: "Call",
                content: "Discussed preferences and timeline, needs more time to research the market",
                date: "2024-02-05T14:20:00Z",
                user: "David Thompson"
            }
        ]
    },
    {
        id: 6,
        name: "Sophia Martinez",
        email: "sophia@example.com",
        phone: "(555) 345-6789",
        type: "Seller",
        status: "New",
        source: "Facebook",
        score: 75,
        assignedAgent: {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@propertypro.com"
        },
        createdAt: "2024-02-12T10:15:00Z",
        lastContact: "2024-02-12T10:15:00Z",
        notes: "Wants to sell her condo in the downtown area. Needs to sell quickly due to new job in another city.",
        property: {
            address: "321 Downtown Avenue, Apt 502, Chicago, IL 60601",
            type: "Condo",
            bedrooms: 2,
            bathrooms: 2,
            area: 1200,
            yearBuilt: 2010,
            estimatedValue: 425000,
            features: ["Balcony", "Concierge", "Gym Access"]
        },
        timeline: "ASAP",
        motivation: "Relocation",
        marketingPreferences: ["Virtual Tour", "Social Media", "Email Marketing"],
        activities: [
            {
                id: 16,
                type: "Note",
                content: "Lead came through Facebook targeted ad",
                date: "2024-02-12T10:15:00Z",
                user: "System"
            }
        ]
    },
    {
        id: 7,
        name: "Daniel Brown",
        email: "daniel@example.com",
        phone: "(555) 876-5432",
        type: "Buyer",
        status: "Cold",
        source: "Zillow",
        score: 35,
        assignedAgent: {
            id: 1,
            name: "John Smith",
            email: "john@propertypro.com"
        },
        createdAt: "2024-01-05T15:30:00Z",
        lastContact: "2024-01-10T11:45:00Z",
        notes: "Was interested in investment properties but hasn't responded to follow-ups.",
        preferences: {
            budget: {
                min: 200000,
                max: 350000
            },
            propertyTypes: ["Apartment", "Condo"],
            bedrooms: 1,
            bathrooms: 1,
            locations: ["University District", "Downtown"],
            features: ["Low Maintenance", "Rental Potential"]
        },
        timeline: "No specific timeline",
        preApproved: false,
        activities: [
            {
                id: 17,
                type: "Note",
                content: "Lead imported from Zillow",
                date: "2024-01-05T15:30:00Z",
                user: "System"
            },
            {
                id: 18,
                type: "Email",
                content: "Sent welcome email with investment property information",
                date: "2024-01-06T09:15:00Z",
                user: "John Smith"
            },
            {
                id: 19,
                type: "Call",
                content: "Attempted to call but no answer, left voicemail",
                date: "2024-01-08T14:00:00Z",
                user: "John Smith"
            },
            {
                id: 20,
                type: "Email",
                content: "Sent follow-up email with additional properties",
                date: "2024-01-10T11:45:00Z",
                user: "John Smith"
            }
        ]
    }
];

// Lead statuses
const leadStatuses = [
    { value: "New", label: "New", color: "default" },
    { value: "Contacted", label: "Contacted", color: "secondary" },
    { value: "Nurturing", label: "Nurturing", color: "warning" },
    { value: "Qualified", label: "Qualified", color: "success" },
    { value: "Negotiation", label: "Negotiation", color: "info" },
    { value: "Closed", label: "Closed", color: "primary" },
    { value: "Cold", label: "Cold", color: "destructive" }
];

// Lead sources
const leadSources = [
    { value: "Facebook", label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
    { value: "Instagram", label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
    { value: "Google", label: "Google", icon: <Search className="h-4 w-4" /> },
    { value: "Website", label: "Website", icon: <Globe className="h-4 w-4" /> },
    { value: "Referral", label: "Referral", icon: <Users className="h-4 w-4" /> },
    { value: "Zillow", label: "Zillow", icon: <Home className="h-4 w-4" /> },
    { value: "Other", label: "Other", icon: <Plus className="h-4 w-4" /> }
];

// Property types
const propertyTypes = [
    "Single Family", "Condo", "Townhouse", "Apartment", "Duplex", "Luxury", "Waterfront"
];

// Locations
const locations = [
    "Downtown", "Riverside", "East Side", "North Hills", "Coastal Area", "Lakefront", "University District"
];

// Features
const propertyFeatures = [
    "Garage", "Garden", "Modern Kitchen", "Pool", "Gym", "Security Building", "Backyard",
    "Finished Basement", "Fireplace", "Smart Home", "Wine Cellar", "Balcony", "Concierge"
];

// Demo agents data
const agents = [
    { id: 1, name: "John Smith", email: "john@propertypro.com", phone: "(212) 555-1234" },
    { id: 2, name: "Sarah Johnson", email: "sarah@propertypro.com", phone: "(305) 555-8976" },
    { id: 3, name: "Michael Chen", email: "michael@propertypro.com", phone: "(425) 555-7890" },
    { id: 4, name: "Emma Wilson", email: "emma@propertypro.com", phone: "(617) 555-4321" },
    { id: 5, name: "David Thompson", email: "david@propertypro.com", phone: "(619) 555-6789" }
];

const getInitials = (name) => {
    return name[0];
}

// Format date helper
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (error) {
        return dateString;
    }
};

// Format currency helper
const formatCurrency = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const QuickStatusUpdate = ({ leadId, currentStatus, onStatusChange }) => (
  <Select onValueChange={(value) => onStatusChange(leadId, value)} value={currentStatus}>
      <SelectTrigger>
          <SelectValue placeholder="Update Status" />
      </SelectTrigger>
      <SelectContent>
          {leadStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                  {status.label}
              </SelectItem>
          ))}
      </SelectContent>
  </Select>
);

const LeadsPage = () => {
    // State for leads management
    const [leads, setLeads] = useState(leadsData);
    const [filteredLeads, setFilteredLeads] = useState(leadsData);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'buyer', 'seller'
    const [searchQuery, setSearchQuery] = useState('');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState([]);
    const [sourceFilter, setSourceFilter] = useState([]);
    const [agentFilter, setAgentFilter] = useState([]);
    const [dateRangeFilter, setDateRangeFilter] = useState({ from: '', to: '' });
    const [sortOption, setSortOption] = useState('newest');

    // State for modals and side panels
    const [selectedLead, setSelectedLead] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Form methods
    const createFormMethods = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            type: 'Buyer',
            status: 'New',
            source: '',
            assignedAgent: '',
            notes: '',
            // Buyer-specific fields
            preferences: {
                budget: {
                    min: '',
                    max: ''
                },
                propertyTypes: [],
                bedrooms: '',
                bathrooms: '',
                locations: [],
                features: []
            },
            timeline: '',
            preApproved: false,
            preApprovalAmount: '',
            // Seller-specific fields
            property: {
                address: '',
                type: '',
                bedrooms: '',
                bathrooms: '',
                area: '',
                yearBuilt: '',
                estimatedValue: '',
                features: []
            },
            motivation: '',
            marketingPreferences: []
        }
    });

    const updateFormMethods = useForm();

    // Effect to filter and sort leads
    useEffect(() => {
        let result = [...leads];

        // Filter by tab (lead type)
        if (activeTab === 'buyer') {
            result = result.filter(lead => lead.type === 'Buyer');
        } else if (activeTab === 'seller') {
            result = result.filter(lead => lead.type === 'Seller');
        }

        // Search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                lead =>
                    lead.name.toLowerCase().includes(query) ||
                    lead.email.toLowerCase().includes(query) ||
                    lead.phone.includes(query) ||
                    (lead.notes && lead.notes.toLowerCase().includes(query))
            );
        }

        // Status filter
        if (statusFilter.length > 0) {
            result = result.filter(lead => statusFilter.includes(lead.status));
        }

        // Source filter
        if (sourceFilter.length > 0) {
            result = result.filter(lead => sourceFilter.includes(lead.source));
        }

        // Agent filter
        if (agentFilter.length > 0) {
            result = result.filter(lead => agentFilter.includes(lead.assignedAgent.id.toString()));
        }

        // Date range filter
        if (dateRangeFilter.from && dateRangeFilter.to) {
            const fromDate = new Date(dateRangeFilter.from);
            const toDate = new Date(dateRangeFilter.to);
            result = result.filter(lead => {
                const createdDate = new Date(lead.createdAt);
                return createdDate >= fromDate && createdDate <= toDate;
            });
        }

        // Sort
        result = result.sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'score-desc':
                    return b.score - a.score;
                case 'score-asc':
                    return a.score - b.score;
                default:
                    return 0;
            }
        });

        setFilteredLeads(result);
    }, [leads, activeTab, searchQuery, statusFilter, sourceFilter, agentFilter, dateRangeFilter, sortOption]);

    // Handle new lead creation
    const handleCreateLead = (data) => {
        const newLead = {
            ...data,
            id: leads.length + 1,
            score: Math.floor(Math.random() * 50) + 50, // Random score between 50-100
            createdAt: new Date().toISOString(),
            lastContact: new Date().toISOString(),
            assignedAgent: agents.find(agent => agent.id.toString() === data.assignedAgent),
            activities: [
                {
                    id: Math.floor(Math.random() * 1000) + 100,
                    type: "Note",
                    content: `Lead created manually by user`,
                    date: new Date().toISOString(),
                    user: "You"
                }
            ]
        };

        // Add the new lead
        setLeads([newLead, ...leads]);

        // Reset form and close modal
        createFormMethods.reset();
        setCreateModalOpen(false);
    };

    // Handle lead update
    const handleUpdateLead = (data) => {
        const updatedLeads = leads.map(lead =>
            lead.id === selectedLead.id ? {
                ...lead,
                ...data,
                updatedAt: new Date().toISOString(),
                assignedAgent: agents.find(agent => agent.id.toString() === data.assignedAgent),
                activities: [
                    ...lead.activities,
                    {
                        id: Math.floor(Math.random() * 1000) + 100,
                        type: "Note",
                        content: "Lead information updated",
                        date: new Date().toISOString(),
                        user: "You"
                    }
                ]
            } : lead
        );

        setLeads(updatedLeads);
        setUpdateModalOpen(false);
    };

    // Handle lead deletion
    const handleDeleteLead = () => {
        if (!selectedLead) return;

        const updatedLeads = leads.filter(lead => lead.id !== selectedLead.id);
        setLeads(updatedLeads);
        setDeleteDialogOpen(false);
        setDetailsOpen(false);
    };

    // Open lead details panel
    const openLeadDetails = (lead) => {
        setSelectedLead(lead);
        setDetailsOpen(true);
    };

    // Open update form
    const openUpdateForm = (lead) => {
        setSelectedLead(lead);
        updateFormMethods.reset({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            type: lead.type,
            status: lead.status,
            source: lead.source,
            assignedAgent: lead.assignedAgent.id.toString(),
            notes: lead.notes,
            ...(lead.type === 'Buyer' ? {
                preferences: {
                    budget: {
                        min: lead.preferences?.budget?.min || '',
                        max: lead.preferences?.budget?.max || ''
                    },
                    propertyTypes: lead.preferences?.propertyTypes || [],
                    bedrooms: lead.preferences?.bedrooms || '',
                    bathrooms: lead.preferences?.bathrooms || '',
                    locations: lead.preferences?.locations || [],
                    features: lead.preferences?.features || []
                },
                timeline: lead.timeline || '',
                preApproved: lead.preApproved || false,
                preApprovalAmount: lead.preApprovalAmount || ''
            } : {}),
            ...(lead.type === 'Seller' ? {
                property: {
                    address: lead.property?.address || '',
                    type: lead.property?.type || '',
                    bedrooms: lead.property?.bedrooms || '',
                    bathrooms: lead.property?.bathrooms || '',
                    area: lead.property?.area || '',
                    yearBuilt: lead.property?.yearBuilt || '',
                    estimatedValue: lead.property?.estimatedValue || '',
                    features: lead.property?.features || []
                },
                motivation: lead.motivation || '',
                marketingPreferences: lead.marketingPreferences || []
            } : {})
        });

        setUpdateModalOpen(true);
    };

    // Toggle filters
    const toggleStatusFilter = (status) => {
        setStatusFilter(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const toggleSourceFilter = (source) => {
        setSourceFilter(prev =>
            prev.includes(source)
                ? prev.filter(s => s !== source)
                : [...prev, source]
        );
    };

    const toggleAgentFilter = (agentId) => {
        setAgentFilter(prev =>
            prev.includes(agentId)
                ? prev.filter(a => a !== agentId)
                : [...prev, agentId]
        );
    };

    const resetFilters = () => {
        setSearchQuery('');
        setStatusFilter([]);
        setSourceFilter([]);
        setAgentFilter([]);
        setDateRangeFilter({ from: '', to: '' });
        setSortOption('newest');
        setFiltersOpen(false);
    };

    // Helper functions for badge and icons
    const getStatusBadgeVariant = (status) => {
        const leadStatuses = [
            { value: "New", label: "New", color: "default" },
            { value: "Contacted", label: "Contacted", color: "secondary" },
            { value: "Nurturing", label: "Nurturing", color: "warning" },
            { value: "Qualified", label: "Qualified", color: "success" },
            { value: "Negotiation", label: "Negotiation", color: "info" },
            { value: "Closed", label: "Closed", color: "primary" },
            { value: "Cold", label: "Cold", color: "destructive" }
        ];

        return leadStatuses.find(s => s.value === status)?.color || "default";
    };

    const getSourceIcon = (source) => {
        return leadSources.find(s => s.value === source)?.icon || <Globe className="h-4 w-4" />;
    };

    const updateLeadStatus = (leadId, newStatus) => {
        const updatedLeads = leads.map((lead) => {
            if (lead.id === leadId) {
                return {
                    ...lead,
                    status: newStatus,
                    activities: [
                        ...lead.activities,
                        {
                            id: Math.floor(Math.random() * 1000) + 100,
                            type: "Status Change",
                            content: `Status updated to ${newStatus}`,
                            date: new Date().toISOString(),
                            user: "You",
                        },
                    ],
                };
            }
            return lead;
        });
        setLeads(updatedLeads);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar activePage="leads" />
            <div className="flex-1 pl-0 lg:pl-72">
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
                                <p className="mt-1 text-sm text-slate-600">
                                    Manage your buyer and seller leads
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                                <Button
                                    onClick={() => setCreateModalOpen(true)}
                                    className="flex items-center"
                                >
                                    <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                                    Add Lead
                                </Button>
                            </div>
                        </div>

                        <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
                            <div className="flex justify-between items-center">
                                <TabsList className="grid w-60 grid-cols-3">
                                    <TabsTrigger value="all">All Leads</TabsTrigger>
                                    <TabsTrigger value="buyer">Buyers</TabsTrigger>
                                    <TabsTrigger value="seller">Sellers</TabsTrigger>
                                </TabsList>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant={viewMode === 'card' ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode('card')}
                                        className="px-3"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
                                            <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                                            <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                                            <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                                            <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
                                        </svg>
                                        Cards
                                    </Button>
                                    <Button
                                        variant={viewMode === 'table' ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode('table')}
                                        className="px-3"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
                                            <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="2" />
                                            <path d="M3 10h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        Table
                                    </Button>
                                </div>
                            </div>

                            <Card className="mt-4">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                        <div className="relative flex-grow">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                            </div>
                                            <Input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search leads..."
                                                className="pl-10"
                                            />
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => setFiltersOpen(!filtersOpen)}
                                                className="flex items-center"
                                            >
                                                <Filter className="mr-2 h-4 w-4 text-slate-400" aria-hidden="true" />
                                                Filters
                                                <ChevronDown className="ml-1 h-4 w-4 text-slate-400" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </div>

                                    {filtersOpen && (
                                        <>
                                            <Separator className="my-4" />
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div>
                                                    <Label className="mb-2 block">Lead Status</Label>
                                                    <div className="space-y-2">
                                                        <ScrollArea className="h-40 w-full rounded border p-2">
                                                            {leadStatuses.map((status) => (
                                                                <div key={status.value} className="flex items-center py-1">
                                                                    <Checkbox
                                                                        id={`status-${status.value}`}
                                                                        checked={statusFilter.includes(status.value)}
                                                                        onCheckedChange={() => toggleStatusFilter(status.value)}
                                                                    />
                                                                    <Label htmlFor={`status-${status.value}`} className="ml-2 flex items-center">
                                                                        <Badge variant={status.color} className="mr-2">
                                                                            {status.label}
                                                                        </Badge>
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </ScrollArea>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label className="mb-2 block">Lead Source</Label>
                                                    <div className="space-y-2">
                                                        <ScrollArea className="h-40 w-full rounded border p-2">
                                                            {leadSources.map((source) => (
                                                                <div key={source.value} className="flex items-center py-1">
                                                                    <Checkbox
                                                                        id={`source-${source.value}`}
                                                                        checked={sourceFilter.includes(source.value)}
                                                                        onCheckedChange={() => toggleSourceFilter(source.value)}
                                                                    />
                                                                    <Label htmlFor={`source-${source.value}`} className="ml-2 flex items-center">
                                                                        <span className="mr-2">{source.icon}</span>
                                                                        {source.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </ScrollArea>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label className="mb-2 block">Assigned Agent</Label>
                                                    <div className="space-y-2">
                                                        <ScrollArea className="h-40 w-full rounded border p-2">
                                                            {agents.map((agent) => (
                                                                <div key={agent.id} className="flex items-center py-1">
                                                                    <Checkbox
                                                                        id={`agent-${agent.id}`}
                                                                        checked={agentFilter.includes(agent.id.toString())}
                                                                        onCheckedChange={() => toggleAgentFilter(agent.id.toString())}
                                                                    />
                                                                    <Label htmlFor={`agent-${agent.id}`} className="ml-2">
                                                                        {agent.name}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </ScrollArea>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label className="mb-2 block">Date Range</Label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <Label htmlFor="date-from" className="text-xs">From</Label>
                                                            <Input
                                                                id="date-from"
                                                                type="date"
                                                                value={dateRangeFilter.from}
                                                                onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, from: e.target.value })}
                                                                className="text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="date-to" className="text-xs">To</Label>
                                                            <Input
                                                                id="date-to"
                                                                type="date"
                                                                value={dateRangeFilter.to}
                                                                onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, to: e.target.value })}
                                                                className="text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-between items-center">
                                                <Button
                                                    variant="link"
                                                    onClick={resetFilters}
                                                    className="text-sm font-medium"
                                                >
                                                    Reset filters
                                                </Button>

                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-slate-700">Sort by:</span>
                                                    <Select value={sortOption} onValueChange={setSortOption}>
                                                        <SelectTrigger className="w-40">
                                                            <SelectValue placeholder="Sort by" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="newest">Newest First</SelectItem>
                                                            <SelectItem value="oldest">Oldest First</SelectItem>
                                                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                                            <SelectItem value="score-desc">Highest Score</SelectItem>
                                                            <SelectItem value="score-asc">Lowest Score</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            <TabsContent value="all" className="mt-6">
                                <div className="flex justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-slate-900">All Leads ({filteredLeads.length})</h2>
                                </div>
                                {viewMode === 'card' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredLeads.map((lead) => (
                                            <LeadCard
                                                key={lead.id}
                                                lead={lead}
                                                onViewDetails={openLeadDetails}
                                                onEdit={openUpdateForm}
                                                onStatusChange={updateLeadStatus}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <LeadsTable
                                        leads={filteredLeads}
                                        onViewDetails={openLeadDetails}
                                        onEdit={openUpdateForm}
                                        onStatusChange={updateLeadStatus}
                                    />
                                )}
                            </TabsContent>

                            <TabsContent value="buyer" className="mt-6">
                                <div className="flex justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-slate-900">Buyer Leads ({filteredLeads.length})</h2>
                                </div>
                                {viewMode === 'card' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredLeads.map((lead) => (
                                            <LeadCard
                                                key={lead.id}
                                                lead={lead}
                                                onViewDetails={openLeadDetails}
                                                onEdit={openUpdateForm}
                                                onStatusChange={updateLeadStatus}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <LeadsTable
                                        leads={filteredLeads}
                                        onViewDetails={openLeadDetails}
                                        onEdit={openUpdateForm}
                                        onStatusChange={updateLeadStatus}
                                    />
                                )}
                            </TabsContent>

                            <TabsContent value="seller" className="mt-6">
                                <div className="flex justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-slate-900">Seller Leads ({filteredLeads.length})</h2>
                                </div>
                                {viewMode === 'card' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredLeads.map((lead) => (
                                            <LeadCard
                                                key={lead.id}
                                                lead={lead}
                                                onViewDetails={openLeadDetails}
                                                onEdit={openUpdateForm}
                                                onStatusChange={updateLeadStatus}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <LeadsTable
                                        leads={filteredLeads}
                                        onViewDetails={openLeadDetails}
                                        onEdit={openUpdateForm}
                                        onStatusChange={updateLeadStatus}
                                    />
                                )}
                            </TabsContent>

                            {filteredLeads.length === 0 && (
                                <div className="mt-6">
                                    <Card className="p-8 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                            <Users className="h-6 w-6 text-slate-600" />
                                        </div>
                                        <CardTitle className="mt-4">No leads found</CardTitle>
                                        <CardDescription className="mt-2">
                                            Try adjusting your search or filters to find what you're looking for.
                                        </CardDescription>
                                        <div className="mt-6">
                                            <Button onClick={resetFilters}>
                                                Reset filters
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </Tabs>
                    </div>
                </main>
            </div>

            {/* Lead Details Side Panel */}
            <Sheet open={detailsOpen} onOpenChange={setDetailsOpen} side="right">
                <SheetContent className="w-full sm:max-w-xl p-0 overflow-hidden">
                    {selectedLead && (
                        <div className="flex flex-col h-full">
                            {/* Header with background gradient and photo */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-violet-600/90 z-0"></div>
                                <div className="h-32 bg-[url('/api/placeholder/600/400')] bg-center bg-cover opacity-30"></div>
                                
                                <div className="absolute top-0 left-0 w-full h-full p-6 flex items-start justify-between z-10">
                                    <div className="flex items-center">
                                        <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg">
                                                {selectedLead.name.slice(0,1)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge className="bg-white/20 text-white hover:bg-white/30">
                                                    {selectedLead.type}
                                                </Badge>
                                                <Badge 
                                                    variant={getStatusBadgeVariant(selectedLead.status)}
                                                    className="shadow-sm"
                                                >
                                                    {selectedLead.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openUpdateForm(selectedLead)}>
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Edit Lead
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                                onClick={() => setDeleteDialogOpen(true)}
                                                className="text-red-600"
                                            >
                                                <Trash className="h-4 w-4 mr-2" />
                                                Delete Lead
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Main content area with tabs */}
                            <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                                <div className="px-4 border-b">
                                    <TabsList className="w-full justify-start space-x-4 p-0 bg-transparent h-12">
                                        <TabsTrigger 
                                            value="overview" 
                                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none px-1 py-3"
                                        >
                                            Overview
                                        </TabsTrigger>
                                        <TabsTrigger 
                                            value="details" 
                                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none px-1 py-3"
                                        >
                                            {selectedLead.type === 'Buyer' ? 'Buyer Details' : 'Property Details'}
                                        </TabsTrigger>
                                        <TabsTrigger 
                                            value="activity" 
                                            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:shadow-none px-1 py-3"
                                        >
                                            Activity
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <ScrollArea className="flex-1 h-[calc(100vh-13rem)]">
                                    {/* Overview Tab */}
                                    <TabsContent value="overview" className="p-6 pb-20 mt-0 space-y-6 h-full">
                                        {/* Lead Score Card */}
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-medium text-sm text-slate-600">Lead Quality Score</h3>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <div className="flex items-center cursor-help">
                                                                <span className={`text-lg font-bold ${
                                                                    selectedLead.score >= 80 ? 'text-emerald-600' : 
                                                                    selectedLead.score >= 60 ? 'text-amber-600' : 
                                                                    'text-red-600'
                                                                }`}>
                                                                    {selectedLead.score}
                                                                </span>
                                                                <span className="text-xs text-slate-400 ml-1">/100</span>
                                                            </div>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-80">
                                                            <div className="space-y-2">
                                                                <h4 className="font-medium">Score Breakdown</h4>
                                                                <div className="space-y-1 text-sm">
                                                                    <div className="flex justify-between">
                                                                        <span>Engagement:</span>
                                                                        <span className="font-medium">{Math.round(selectedLead.score * 0.4)}/40</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span>Profile Completeness:</span>
                                                                        <span className="font-medium">{Math.round(selectedLead.score * 0.3)}/30</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span>Fit:</span>
                                                                        <span className="font-medium">{Math.round(selectedLead.score * 0.3)}/30</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <Progress 
                                                        value={selectedLead.score} 
                                                        className="h-2"
                                                        indicatorClassName={`${
                                                            selectedLead.score >= 80 ? 'bg-emerald-600' : 
                                                            selectedLead.score >= 60 ? 'bg-amber-600' : 
                                                            'bg-red-600'
                                                        }`}
                                                    />
                                                    <div className="flex justify-between text-xs text-slate-500">
                                                        <span>Cold</span>
                                                        <span>Warm</span>
                                                        <span>Hot</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Contact Information & Key Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Contact Info */}
                                            <Card>
                                                <CardHeader className="p-4 pb-2">
                                                    <CardTitle className="text-sm font-medium text-slate-600">
                                                        <div className="flex items-center">
                                                            <Phone className="h-4 w-4 mr-2 text-indigo-500" />
                                                            Contact Information
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm">
                                                            <Mail className="h-4 w-4 mr-2 text-slate-400" />
                                                            <span className="text-slate-600">Email</span>
                                                        </div>
                                                        <a href={`mailto:${selectedLead.email}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                                            {selectedLead.email}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm">
                                                            <Phone className="h-4 w-4 mr-2 text-slate-400" />
                                                            <span className="text-slate-600">Phone</span>
                                                        </div>
                                                        <a href={`tel:${selectedLead.phone}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                                            {selectedLead.phone}
                                                        </a>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-2">
                                                        <Button variant="outline" size="sm" className="w-[48%]" asChild>
                                                            <a href={`mailto:${selectedLead.email}`}>
                                                                <Mail className="h-4 w-4 mr-2" />
                                                                Email
                                                            </a>
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="w-[48%]" asChild>
                                                            <a href={`tel:${selectedLead.phone}`}>
                                                                <Phone className="h-4 w-4 mr-2" />
                                                                Call
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Lead Details */}
                                            <Card>
                                                <CardHeader className="p-4 pb-2">
                                                    <CardTitle className="text-sm font-medium text-slate-600">
                                                        <div className="flex items-center">
                                                            <User className="h-4 w-4 mr-2 text-indigo-500" />
                                                            Lead Details
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm">
                                                            <Globe className="h-4 w-4 mr-2 text-slate-400" />
                                                            <span className="text-slate-600">Source</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            {getSourceIcon(selectedLead.source)}
                                                            <span className="ml-1 text-sm font-medium">{selectedLead.source}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm">
                                                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                                                            <span className="text-slate-600">Created</span>
                                                        </div>
                                                        <span className="text-sm font-medium">{formatDate(selectedLead.createdAt)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm">
                                                            <User className="h-4 w-4 mr-2 text-slate-400" />
                                                            <span className="text-slate-600">Agent</span>
                                                        </div>
                                                        <span className="text-sm font-medium">{selectedLead.assignedAgent.name}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center text-sm">
                                                            <Clock className="h-4 w-4 mr-2 text-slate-400" />
                                                            <span className="text-slate-600">Last Contact</span>
                                                        </div>
                                                        <span className="text-sm font-medium">{formatDate(selectedLead.lastContact)}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Notes Card */}
                                        <Card>
                                            <CardHeader className="p-4 pb-2">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-sm font-medium text-slate-600">
                                                        <div className="flex items-center">
                                                            <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                                                            Notes
                                                        </div>
                                                    </CardTitle>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500">
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80">
                                                            <div className="space-y-4">
                                                                <h4 className="font-medium">Add a Note</h4>
                                                                <Textarea 
                                                                    placeholder="Enter your note here..."
                                                                    className="min-h-20"
                                                                    id="new-note"
                                                                />
                                                                <div className="flex justify-end">
                                                                    <Button 
                                                                        onClick={() => {
                                                                            const noteElement = document.getElementById('new-note');
                                                                            if (noteElement) {
                                                                                addNote(selectedLead.id, noteElement.value);
                                                                                noteElement.value = '';
                                                                            }
                                                                        }}
                                                                        size="sm"
                                                                    >
                                                                        Save Note
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-1">
                                                <div className="p-3 bg-slate-50 rounded-md text-sm min-h-20">
                                                    {selectedLead.notes || "No notes available."}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Quick Actions */}
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-600 mb-3">Quick Actions</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                <QuickStatusUpdate 
                                                    leadId={selectedLead.id} 
                                                    currentStatus={selectedLead.status} 
                                                    onStatusChange={updateLeadStatus} 
                                                />
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" className="w-full">
                                                            <MessageSquare className="mr-2 h-4 w-4" />
                                                            Add Note
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80">
                                                        <div className="space-y-4">
                                                            <h4 className="font-medium">Add a Note</h4>
                                                            <Textarea 
                                                                placeholder="Enter your note here..."
                                                                className="min-h-20"
                                                                id="new-note"
                                                            />
                                                            <div className="flex justify-end">
                                                                <Button 
                                                                    onClick={() => {
                                                                        const noteElement = document.getElementById('new-note');
                                                                        if (noteElement) {
                                                                            addNote(selectedLead.id, noteElement.value);
                                                                            noteElement.value = '';
                                                                        }
                                                                    }}
                                                                    size="sm"
                                                                >
                                                                    Save Note
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <a href={`mailto:${selectedLead.email}`}>
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Send Email
                                                    </a>
                                                </Button>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <a href={`tel:${selectedLead.phone}`}>
                                                        <Phone className="mr-2 h-4 w-4" />
                                                        Call Lead
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Details Tab */}
                                    <TabsContent value="details" className="p-6 pb-20 mt-0 space-y-6">
                                        {/* Buyer-specific information */}
                                        {selectedLead.type === 'Buyer' && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold text-slate-900">Buyer Requirements</h3>
                                                    <Badge variant="outline" className="bg-indigo-50">
                                                        {selectedLead.timeline || "No timeline"}
                                                    </Badge>
                                                </div>

                                                {/* Budget Range */}
                                                <Card>
                                                    <CardHeader className="p-4 pb-2">
                                                        <CardTitle className="text-sm font-medium text-slate-600">
                                                            <div className="flex items-center">
                                                                <DollarSign className="h-4 w-4 mr-2 text-emerald-500" />
                                                                Budget Range
                                                            </div>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-1">
                                                        <div className="flex items-center justify-center space-x-4">
                                                            <div className="text-center py-3 px-6 bg-slate-50 rounded-lg flex-1">
                                                                <p className="text-sm text-slate-500">Minimum</p>
                                                                <p className="text-xl font-bold text-slate-900 mt-1">
                                                                    {selectedLead.preferences?.budget?.min ? formatCurrency(selectedLead.preferences.budget.min) : "N/A"}
                                                                </p>
                                                            </div>
                                                            <div className="text-center py-3 px-6 bg-slate-50 rounded-lg flex-1">
                                                                <p className="text-sm text-slate-500">Maximum</p>
                                                                <p className="text-xl font-bold text-slate-900 mt-1">
                                                                    {selectedLead.preferences?.budget?.max ? formatCurrency(selectedLead.preferences.budget.max) : "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        {selectedLead.preApproved && (
                                                            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                                                <div className="flex items-center">
                                                                    <Check className="h-4 w-4 text-emerald-500 mr-2" />
                                                                    <span className="text-sm font-medium text-emerald-800">Pre-Approved for {formatCurrency(selectedLead.preApprovalAmount)}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>

                                                {/* Property Preferences */}
                                                <Card>
                                                    <CardHeader className="p-4 pb-2">
                                                        <CardTitle className="text-sm font-medium text-slate-600">
                                                            <div className="flex items-center">
                                                                <Home className="h-4 w-4 mr-2 text-indigo-500" />
                                                                Property Preferences
                                                            </div>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-1 space-y-4">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Bedrooms</p>
                                                                <p className="text-lg font-semibold text-slate-900 mt-1">
                                                                    {selectedLead.preferences?.bedrooms || "Any"}
                                                                </p>
                                                            </div>
                                                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Bathrooms</p>
                                                                <p className="text-lg font-semibold text-slate-900 mt-1">
                                                                    {selectedLead.preferences?.bathrooms || "Any"}
                                                                </p>
                                                            </div>
                                                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Property Types</p>
                                                                <p className="text-lg font-semibold text-slate-900 mt-1">
                                                                    {selectedLead.preferences?.propertyTypes?.length || 0}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-600 mb-2">Property Types</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {selectedLead.preferences?.propertyTypes?.map((type, index) => (
                                                                    <Badge key={index} variant="secondary" className="bg-indigo-50">
                                                                        {type}
                                                                    </Badge>
                                                                )) || "Not specified"}
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-600 mb-2">Preferred Locations</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {selectedLead.preferences?.locations?.map((location, index) => (
                                                                    <Badge key={index} variant="secondary" className="bg-purple-50">
                                                                        {location}
                                                                    </Badge>
                                                                )) || "Not specified"}
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-600 mb-2">Desired Features</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {selectedLead.preferences?.features?.map((feature, index) => (
                                                                    <Badge key={index} variant="outline">
                                                                        {feature}
                                                                    </Badge>
                                                                )) || "Not specified"}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </>
                                        )}

                                        {/* Seller-specific information */}
                                        {selectedLead.type === 'Seller' && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-semibold text-slate-900">Property Details</h3>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge variant="outline" className="bg-indigo-50">
                                                            {selectedLead.timeline || "No timeline"}
                                                        </Badge>
                                                        {selectedLead.motivation && (
                                                            <Badge variant="outline" className="bg-purple-50">
                                                                {selectedLead.motivation}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Property Address & Value */}
                                                <Card>
                                                    <CardHeader className="p-4 pb-2">
                                                        <CardTitle className="text-sm font-medium text-slate-600">
                                                            <div className="flex items-center">
                                                                <Building className="h-4 w-4 mr-2 text-indigo-500" />
                                                                Property Information
                                                            </div>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-1 space-y-4">
                                                        <div className="bg-slate-50 p-3 rounded-lg">
                                                            <p className="text-sm text-slate-500">Property Address</p>
                                                            <p className="text-base font-medium text-slate-900 mt-1">
                                                                {selectedLead.property?.address || "Not specified"}
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="flex space-x-4">
                                                            <div className="flex-1 text-center p-3 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Property Type</p>
                                                                <p className="text-base font-semibold text-slate-900 mt-1">
                                                                    {selectedLead.property?.type || "N/A"}
                                                                </p>
                                                            </div>
                                                            <div className="flex-1 text-center p-3 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Estimated Value</p>
                                                                <p className="text-base font-semibold text-slate-900 mt-1">
                                                                    {selectedLead.property?.estimatedValue ? formatCurrency(selectedLead.property.estimatedValue) : "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-4 gap-3">
                                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Beds</p>
                                                                <p className="text-base font-semibold text-slate-900">
                                                                    {selectedLead.property?.bedrooms || "N/A"}
                                                                </p>
                                                            </div>
                                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Baths</p>
                                                                <p className="text-base font-semibold text-slate-900">
                                                                    {selectedLead.property?.bathrooms || "N/A"}
                                                                </p>
                                                            </div>
                                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Sq. Ft.</p>
                                                                <p className="text-base font-semibold text-slate-900">
                                                                    {selectedLead.property?.area || "N/A"}
                                                                </p>
                                                            </div>
                                                            <div className="text-center p-2 bg-slate-50 rounded-lg">
                                                                <p className="text-xs text-slate-500">Year</p>
                                                                <p className="text-base font-semibold text-slate-900">
                                                                    {selectedLead.property?.yearBuilt || "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* Property Features & Marketing Preferences */}
                                                <Card>
                                                    <CardHeader className="p-4 pb-2">
                                                        <CardTitle className="text-sm font-medium text-slate-600">
                                                            <div className="flex items-center">
                                                                <Star className="h-4 w-4 mr-2 text-amber-500" />
                                                                Features & Marketing
                                                            </div>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-1 space-y-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-600 mb-2">Property Features</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {selectedLead.property?.features?.map((feature, index) => (
                                                                    <Badge key={index} variant="outline">
                                                                        {feature}
                                                                    </Badge>
                                                                )) || "None specified"}
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-600 mb-2">Marketing Preferences</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {selectedLead.marketingPreferences?.map((pref, index) => (
                                                                    <Badge key={index} variant="secondary" className="bg-purple-50">
                                                                        {pref}
                                                                    </Badge>
                                                                )) || "None specified"}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </>
                                        )}
                                    </TabsContent>

                                    {/* Activity Tab */}
                                    <TabsContent value="activity" className="p-6 pb-20 mt-0">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-slate-900">Activity Timeline</h3>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Activity
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80">
                                                    <div className="space-y-4">
                                                        <h4 className="font-medium">Add New Activity</h4>
                                                        <Select>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select activity type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="note">Note</SelectItem>
                                                                <SelectItem value="email">Email</SelectItem>
                                                                <SelectItem value="call">Call</SelectItem>
                                                                <SelectItem value="meeting">Meeting</SelectItem>
                                                                <SelectItem value="showing">Showing</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <Textarea 
                                                            placeholder="Activity details..."
                                                            className="min-h-20"
                                                        />
                                                        <div className="flex justify-end">
                                                            <Button size="sm">
                                                                Save Activity
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        
                                        {selectedLead.activities && selectedLead.activities.length > 0 ? (
                                            <div className="space-y-4">
                                                {selectedLead.activities.slice().reverse().map((activity) => (
                                                    <Card key={activity.id} className="overflow-hidden">
                                                        <div className="flex border-l-4 border-l-slate-300 hover:border-l-indigo-500 transition-colors">
                                                            <div className="p-4 flex">
                                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 mr-3 flex-shrink-0">
                                                                    {activity.type === 'Note' && <FileText className="h-5 w-5 text-slate-600" />}
                                                                    {activity.type === 'Email' && <Mail className="h-5 w-5 text-blue-600" />}
                                                                    {activity.type === 'Call' && <Phone className="h-5 w-5 text-green-600" />}
                                                                    {activity.type === 'Meeting' && <Users className="h-5 w-5 text-purple-600" />}
                                                                    {activity.type === 'Showing' && <Home className="h-5 w-5 text-amber-600" />}
                                                                    {activity.type === 'Status Change' && <ArrowRight className="h-5 w-5 text-indigo-600" />}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="text-sm font-medium text-slate-900 truncate">{activity.type}</h4>
                                                                        <time className="text-xs text-slate-500">{format(new Date(activity.date), 'MMM d, yyyy')}</time>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-slate-600">{activity.content}</p>
                                                                    <div className="mt-2 flex items-center">
                                                                        <div className="flex-shrink-0">
                                                                            <Avatar className="h-6 w-6">
                                                                                <AvatarFallback className="text-xs bg-slate-200">
                                                                                    {getInitials(activity.user)}
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                        </div>
                                                                        <div className="ml-2 flex items-center text-xs text-slate-500">
                                                                            <p>{activity.user}</p>
                                                                            <span className="mx-1">•</span>
                                                                            <time>{format(new Date(activity.date), 'h:mm a')}</time>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <Card className="p-8 text-center">
                                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                                                    <Clock className="h-6 w-6 text-slate-600" />
                                                </div>
                                                <CardTitle className="mt-4">No activity recorded yet</CardTitle>
                                                <CardDescription className="mt-2">
                                                    Add your first activity to start tracking interactions with this lead.
                                                </CardDescription>
                                                <div className="mt-6">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button>
                                                                <Plus className="h-4 w-4 mr-2" />
                                                                Add Activity
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80">
                                                            <div className="space-y-4">
                                                                <h4 className="font-medium">Add New Activity</h4>
                                                                <Select>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select activity type" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="note">Note</SelectItem>
                                                                        <SelectItem value="email">Email</SelectItem>
                                                                        <SelectItem value="call">Call</SelectItem>
                                                                        <SelectItem value="meeting">Meeting</SelectItem>
                                                                        <SelectItem value="showing">Showing</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <Textarea 
                                                                    placeholder="Activity details..."
                                                                    className="min-h-20"
                                                                />
                                                                <div className="flex justify-end">
                                                                    <Button size="sm">
                                                                        Save Activity
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </Card>
                                        )}
                                    </TabsContent>
                                </ScrollArea>
                            </Tabs>

                            {/* Footer Actions */}
                            <div className="p-4 border-t mt-auto">
                                <div className="flex justify-between">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setDetailsOpen(false)}
                                    >
                                        Close
                                    </Button>
                                    <div className="flex space-x-2">
                                        <Button 
                                            variant="outline"
                                            className="border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                            onClick={() => openUpdateForm(selectedLead)}
                                        >
                                            <Edit2 className="h-4 w-4 mr-2" />
                                            Edit Lead
                                        </Button>
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Activity
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

            {/* Create Lead Modal */}
            <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Lead</DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new lead in the system.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={createFormMethods.handleSubmit(handleCreateLead)}>
                        <Tabs defaultValue="basic" className="mt-5">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                                <TabsTrigger value="buyer" disabled={createFormMethods.watch('type') !== 'Buyer'}>
                                    Buyer Details
                                </TabsTrigger>
                                <TabsTrigger value="seller" disabled={createFormMethods.watch('type') !== 'Seller'}>
                                    Seller Details
                                </TabsTrigger>
                            </TabsList>

                            {/* Basic Information Tab */}
                            <TabsContent value="basic" className="space-y-4 py-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. John Smith"
                                            {...createFormMethods.register("name", { required: "Name is required" })}
                                        />
                                        {createFormMethods.formState.errors.name && (
                                            <p className="text-sm text-red-500">{createFormMethods.formState.errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="e.g. john@example.com"
                                            {...createFormMethods.register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                        {createFormMethods.formState.errors.email && (
                                            <p className="text-sm text-red-500">{createFormMethods.formState.errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            placeholder="e.g. (555) 123-4567"
                                            {...createFormMethods.register("phone", { required: "Phone number is required" })}
                                        />
                                        {createFormMethods.formState.errors.phone && (
                                            <p className="text-sm text-red-500">{createFormMethods.formState.errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type">Lead Type *</Label>
                                        <Controller
                                            control={createFormMethods.control}
                                            name="type"
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        if (value === 'Buyer') {
                                                            createFormMethods.setValue('property', {
                                                                address: '',
                                                                type: '',
                                                                bedrooms: '',
                                                                bathrooms: '',
                                                                area: '',
                                                                yearBuilt: '',
                                                                estimatedValue: '',
                                                                features: []
                                                            });
                                                            createFormMethods.setValue('motivation', '');
                                                            createFormMethods.setValue('marketingPreferences', []);
                                                        } else {
                                                            createFormMethods.setValue('preferences', {
                                                                budget: { min: '', max: '' },
                                                                propertyTypes: [],
                                                                bedrooms: '',
                                                                bathrooms: '',
                                                                locations: [],
                                                                features: []
                                                            });
                                                            createFormMethods.setValue('timeline', '');
                                                            createFormMethods.setValue('preApproved', false);
                                                            createFormMethods.setValue('preApprovalAmount', '');
                                                        }
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select lead type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Buyer">Buyer</SelectItem>
                                                        <SelectItem value="Seller">Seller</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Lead Status *</Label>
                                        <Controller
                                            control={createFormMethods.control}
                                            name="status"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {leadStatuses.map((status) => (
                                                            <SelectItem key={status.value} value={status.value}>
                                                                {status.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="source">Lead Source *</Label>
                                        <Controller
                                            control={createFormMethods.control}
                                            name="source"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select source" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {leadSources.map((source) => (
                                                            <SelectItem key={source.value} value={source.value}>
                                                                <div className="flex items-center">
                                                                    {source.icon}
                                                                    <span className="ml-2">{source.label}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {createFormMethods.formState.errors.source && (
                                            <p className="text-sm text-red-500">{createFormMethods.formState.errors.source.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="assignedAgent">Assigned Agent *</Label>
                                        <Controller
                                            control={createFormMethods.control}
                                            name="assignedAgent"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select agent" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {agents.map((agent) => (
                                                            <SelectItem key={agent.id} value={agent.id.toString()}>
                                                                {agent.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {createFormMethods.formState.errors.assignedAgent && (
                                            <p className="text-sm text-red-500">{createFormMethods.formState.errors.assignedAgent.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Add any relevant notes about this lead..."
                                            rows={4}
                                            {...createFormMethods.register("notes")}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Buyer Details Tab */}
                            <TabsContent value="buyer" className="space-y-4 py-4">
                                <div className="space-y-6">
                                    <div>
                                        <Label className="mb-2">Budget Range</Label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="min-budget" className="text-xs text-slate-500">Minimum ($)</Label>
                                                <Input
                                                    id="min-budget"
                                                    type="number"
                                                    placeholder="e.g. 300000"
                                                    {...createFormMethods.register("preferences.budget.min")}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="max-budget" className="text-xs text-slate-500">Maximum ($)</Label>
                                                <Input
                                                    id="max-budget"
                                                    type="number"
                                                    placeholder="e.g. 500000"
                                                    {...createFormMethods.register("preferences.budget.max")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-2">Property Types</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {propertyTypes.map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <Controller
                                                        control={createFormMethods.control}
                                                        name="preferences.propertyTypes"
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                id={`property-type-${type}`}
                                                                checked={field.value?.includes(type)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValues = field.value || [];
                                                                    const newValues = checked
                                                                        ? [...currentValues, type]
                                                                        : currentValues.filter(value => value !== type);
                                                                    field.onChange(newValues);
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Label htmlFor={`property-type-${type}`} className="text-sm">
                                                        {type}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bedrooms">Bedrooms</Label>
                                            <Select
                                                onValueChange={(value) => createFormMethods.setValue('preferences.bedrooms', value)}
                                                value={createFormMethods.watch('preferences.bedrooms')}
                                            >
                                                <SelectTrigger id="bedrooms">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Any">Any</SelectItem>
                                                    <SelectItem value="1">1+</SelectItem>
                                                    <SelectItem value="2">2+</SelectItem>
                                                    <SelectItem value="3">3+</SelectItem>
                                                    <SelectItem value="4">4+</SelectItem>
                                                    <SelectItem value="5">5+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bathrooms">Bathrooms</Label>
                                            <Select
                                                onValueChange={(value) => createFormMethods.setValue('preferences.bathrooms', value)}
                                                value={createFormMethods.watch('preferences.bathrooms')}
                                            >
                                                <SelectTrigger id="bathrooms">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Any">Any</SelectItem>
                                                    <SelectItem value="1">1+</SelectItem>
                                                    <SelectItem value="1.5">1.5+</SelectItem>
                                                    <SelectItem value="2">2+</SelectItem>
                                                    <SelectItem value="2.5">2.5+</SelectItem>
                                                    <SelectItem value="3">3+</SelectItem>
                                                    <SelectItem value="3.5">3.5+</SelectItem>
                                                    <SelectItem value="4">4+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-2">Preferred Locations</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {locations.map((location) => (
                                                <div key={location} className="flex items-center space-x-2">
                                                    <Controller
                                                        control={createFormMethods.control}
                                                        name="preferences.locations"
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                id={`location-${location}`}
                                                                checked={field.value?.includes(location)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValues = field.value || [];
                                                                    const newValues = checked
                                                                        ? [...currentValues, location]
                                                                        : currentValues.filter(value => value !== location);
                                                                    field.onChange(newValues);
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Label htmlFor={`location-${location}`} className="text-sm">
                                                        {location}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-2">Desired Features</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {propertyFeatures.map((feature) => (
                                                <div key={feature} className="flex items-center space-x-2">
                                                    <Controller
                                                        control={createFormMethods.control}
                                                        name="preferences.features"
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                id={`feature-${feature}`}
                                                                checked={field.value?.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValues = field.value || [];
                                                                    const newValues = checked
                                                                        ? [...currentValues, feature]
                                                                        : currentValues.filter(value => value !== feature);
                                                                    field.onChange(newValues);
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Label htmlFor={`feature-${feature}`} className="text-sm">
                                                        {feature}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="timeline">Timeline</Label>
                                            <Select
                                                onValueChange={(value) => createFormMethods.setValue('timeline', value)}
                                                value={createFormMethods.watch('timeline')}
                                            >
                                                <SelectTrigger id="timeline">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ASAP">ASAP</SelectItem>
                                                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                                                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                                                    <SelectItem value="6-12 months">6-12 months</SelectItem>
                                                    <SelectItem value="12+ months">12+ months</SelectItem>
                                                    <SelectItem value="No specific timeline">No specific timeline</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pre-approved" className="mb-2 block">Pre-Approved for Mortgage</Label>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    control={createFormMethods.control}
                                                    name="preApproved"
                                                    render={({ field }) => (
                                                        <Switch
                                                            id="pre-approved"
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="pre-approved" className="text-sm">
                                                    {createFormMethods.watch('preApproved') ? 'Yes' : 'No'}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    {createFormMethods.watch('preApproved') && (
                                        <div className="space-y-2">
                                            <Label htmlFor="pre-approval-amount">Pre-Approval Amount ($)</Label>
                                            <Input
                                                id="pre-approval-amount"
                                                type="number"
                                                placeholder="e.g. 450000"
                                                {...createFormMethods.register("preApprovalAmount")}
                                            />
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Seller Details Tab */}
                            <TabsContent value="seller" className="space-y-4 py-4">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="property-address">Property Address</Label>
                                        <Input
                                            id="property-address"
                                            placeholder="e.g. 123 Main St, City, State, Zip"
                                            {...createFormMethods.register("property.address")}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="property-type">Property Type</Label>
                                        <Controller
                                            control={createFormMethods.control}
                                            name="property.type"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger id="property-type">
                                                        <SelectValue placeholder="Select property type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {propertyTypes.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="property-bedrooms">Bedrooms</Label>
                                            <Input
                                                id="property-bedrooms"
                                                type="number"
                                                placeholder="e.g. 3"
                                                {...createFormMethods.register("property.bedrooms")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="property-bathrooms">Bathrooms</Label>
                                            <Input
                                                id="property-bathrooms"
                                                type="number"
                                                step="0.5"
                                                placeholder="e.g. 2.5"
                                                {...createFormMethods.register("property.bathrooms")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="property-area">Area (sq ft)</Label>
                                            <Input
                                                id="property-area"
                                                type="number"
                                                placeholder="e.g. 2000"
                                                {...createFormMethods.register("property.area")}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="property-year-built">Year Built</Label>
                                            <Input
                                                id="property-year-built"
                                                type="number"
                                                min="1800"
                                                max={new Date().getFullYear()}
                                                placeholder="e.g. 2005"
                                                {...createFormMethods.register("property.yearBuilt")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="property-value">Estimated Value ($)</Label>
                                            <Input
                                                id="property-value"
                                                type="number"
                                                placeholder="e.g. 450000"
                                                {...createFormMethods.register("property.estimatedValue")}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-2">Property Features</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {propertyFeatures.map((feature) => (
                                                <div key={feature} className="flex items-center space-x-2">
                                                    <Controller
                                                        control={createFormMethods.control}
                                                        name="property.features"
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                id={`property-feature-${feature}`}
                                                                checked={field.value?.includes(feature)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValues = field.value || [];
                                                                    const newValues = checked
                                                                        ? [...currentValues, feature]
                                                                        : currentValues.filter(value => value !== feature);
                                                                    field.onChange(newValues);
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Label htmlFor={`property-feature-${feature}`} className="text-sm">
                                                        {feature}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="seller-timeline">Timeline</Label>
                                            <Select
                                                onValueChange={(value) => createFormMethods.setValue('timeline', value)}
                                                value={createFormMethods.watch('timeline')}
                                            >
                                                <SelectTrigger id="seller-timeline">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ASAP">ASAP</SelectItem>
                                                    <SelectItem value="1-3 months">1-3 months</SelectItem>
                                                    <SelectItem value="3-6 months">3-6 months</SelectItem>
                                                    <SelectItem value="6-12 months">6-12 months</SelectItem>
                                                    <SelectItem value="No specific timeline">No specific timeline</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="motivation">Motivation for Selling</Label>
                                            <Select
                                                onValueChange={(value) => createFormMethods.setValue('motivation', value)}
                                                value={createFormMethods.watch('motivation')}
                                            >
                                                <SelectTrigger id="motivation">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Relocation">Relocation</SelectItem>
                                                    <SelectItem value="Upgrading">Upgrading</SelectItem>
                                                    <SelectItem value="Downsizing">Downsizing</SelectItem>
                                                    <SelectItem value="Investment">Investment</SelectItem>
                                                    <SelectItem value="Financial">Financial Reasons</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-2">Marketing Preferences</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    control={createFormMethods.control}
                                                    name="marketingPreferences"
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            id="marketing-virtual-tour-seller"
                                                            checked={field.value?.includes("Virtual Tour")}
                                                            onCheckedChange={(checked) => {
                                                                const currentValues = field.value || [];
                                                                const newValues = checked
                                                                    ? [...currentValues, "Virtual Tour"]
                                                                    : currentValues.filter(value => value !== "Virtual Tour");
                                                                field.onChange(newValues);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="marketing-virtual-tour-seller" className="text-sm">
                                                    Virtual Tour
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    control={createFormMethods.control}
                                                    name="marketingPreferences"
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            id="marketing-social-media-seller"
                                                            checked={field.value?.includes("Social Media")}
                                                            onCheckedChange={(checked) => {
                                                                const currentValues = field.value || [];
                                                                const newValues = checked
                                                                    ? [...currentValues, "Social Media"]
                                                                    : currentValues.filter(value => value !== "Social Media");
                                                                field.onChange(newValues);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="marketing-social-media-seller" className="text-sm">
                                                    Social Media
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    control={createFormMethods.control}
                                                    name="marketingPreferences"
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            id="marketing-email-marketing-seller"
                                                            checked={field.value?.includes("Email Marketing")}
                                                            onCheckedChange={(checked) => {
                                                                const currentValues = field.value || [];
                                                                const newValues = checked
                                                                    ? [...currentValues, "Email Marketing"]
                                                                    : currentValues.filter(value => value !== "Email Marketing");
                                                                field.onChange(newValues);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="marketing-email-marketing-seller" className="text-sm">
                                                    Email Marketing
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    control={createFormMethods.control}
                                                    name="marketingPreferences"
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            id="marketing-mls-listing"
                                                            checked={field.value?.includes("MLS Listing")}
                                                            onCheckedChange={(checked) => {
                                                                const currentValues = field.value || [];
                                                                const newValues = checked
                                                                    ? [...currentValues, "MLS Listing"]
                                                                    : currentValues.filter(value => value !== "MLS Listing");
                                                                field.onChange(newValues);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="marketing-mls-listing" className="text-sm">
                                                    MLS Listing
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    control={createFormMethods.control}
                                                    name="marketingPreferences"
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            id="marketing-brokers-open"
                                                            checked={field.value?.includes("Broker's Open")}
                                                            onCheckedChange={(checked) => {
                                                                const currentValues = field.value || [];
                                                                const newValues = checked
                                                                    ? [...currentValues, "Broker's Open"]
                                                                    : currentValues.filter(value => value !== "Broker's Open");
                                                                field.onChange(newValues);
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="marketing-brokers-open" className="text-sm">
                                                    Broker's Open
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter>
                            <Button type="submit">Create Lead</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Update Lead Modal */}
            <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Lead</DialogTitle>
                        <DialogDescription>
                            Update the information for this lead.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={updateFormMethods.handleSubmit(handleUpdateLead)}>
                        {/* For brevity, you can reuse the form sections from Create Lead Modal */}
                        <div className="space-y-4 py-4">
                            {/* Example: Only update name and notes */}
                            <div className="space-y-2">
                                <Label htmlFor="update-name">Full Name *</Label>
                                <Input id="update-name" {...updateFormMethods.register("name", { required: "Name is required" })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="update-notes">Notes</Label>
                                <Textarea id="update-notes" rows={4} {...updateFormMethods.register("notes")} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Modernized LeadCard Component
const LeadCard = ({ lead, onViewDetails, onEdit, onStatusChange }) => {
    const getStatusBadgeVariant = (status) => {
        const leadStatuses = [
            { value: "New", label: "New", color: "default" },
            { value: "Contacted", label: "Contacted", color: "secondary" },
            { value: "Nurturing", label: "Nurturing", color: "warning" },
            { value: "Qualified", label: "Qualified", color: "success" },
            { value: "Negotiation", label: "Negotiation", color: "info" },
            { value: "Closed", label: "Closed", color: "primary" },
            { value: "Cold", label: "Cold", color: "destructive" }
        ];
        return leadStatuses.find(s => s.value === status)?.color || "default";
    };
    return (
        <Card 
            onClick={() => onViewDetails(lead)} 
            className="cursor-pointer bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
            <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarFallback>{lead.name ? lead.name[0] : '?'}</AvatarFallback>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}`} />
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg font-semibold">{lead.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-500">{lead.email}</CardDescription>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(lead)}>Edit Lead</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onStatusChange(lead.id, "Contacted")}>Mark as Contacted</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <p className="text-sm text-gray-700">{lead.notes}</p>
            </CardContent>
            <CardFooter className="px-4 py-2 flex justify-between items-center border-t">
                <div className="flex space-x-2">
                    <Badge>{lead.type}</Badge>
                    <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                </div>
                <span className="text-sm text-gray-500">{formatDate(lead.createdAt)}</span>
            </CardFooter>
        </Card>
    );
};

// Modernized LeadsTable Component
const LeadsTable = ({ leads, onViewDetails, onEdit, onStatusChange }) => {
    const getStatusBadgeVariant = (status) => {
        const leadStatuses = [
            { value: "New", label: "New", color: "default" },
            { value: "Contacted", label: "Contacted", color: "secondary" },
            { value: "Nurturing", label: "Nurturing", color: "warning" },
            { value: "Qualified", label: "Qualified", color: "success" },
            { value: "Negotiation", label: "Negotiation", color: "info" },
            { value: "Closed", label: "Closed", color: "primary" },
            { value: "Cold", label: "Cold", color: "destructive" }
        ];
        return leadStatuses.find(s => s.value === status)?.color || "default";
    };
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                        <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                    {leads.map(lead => (
                        <TableRow 
                            key={lead.id} 
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <TableCell className="px-6 py-4 whitespace-nowrap">{lead.name}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{lead.email}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{lead.type}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{lead.phone}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                                <Button size="sm" onClick={() => onViewDetails(lead)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LeadsPage;