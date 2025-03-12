// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    Filter,
    ArrowUpDown,
    MoreHorizontal,
    Calendar,
    Users,
    Home,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    Ban,
    Trash2,
    Edit,
    ChevronRight,
    ChevronDown,
    X,
    CheckCircle,
    Circle,
    ListTodo,
    CalendarClock,
    Clipboard,
    DollarSign,
    UserCheck,
    Building,
    User,
    UserPlus,
    Download,
    Eye,
    ClipboardCopy,
    MapPin,
    RefreshCw
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
    DropdownMenuLabel,
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

const ContractsPage = () => {
    // State variables for contracts management
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContract, setSelectedContract] = useState(null);
    const [isViewingContract, setIsViewingContract] = useState(false);
    const [isEditingContract, setIsEditingContract] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [isAddingTodo, setIsAddingTodo] = useState(false);
    const [newTodoItem, setNewTodoItem] = useState({ title: '', description: '', dueDate: '', priority: 'medium', assignedTo: '', completed: false });

    // New contract modal state
    const [showNewContractModal, setShowNewContractModal] = useState(false);
    const [newContract, setNewContract] = useState({
        id: '',
        contractNumber: '',
        title: '',
        type: 'purchase', // 'purchase', 'sale', 'lease'
        status: 'pending', // 'pending', 'active', 'completed', 'cancelled'
        property: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
            price: '',
            propertyType: 'residential' // 'residential', 'commercial', 'land'
        },
        client: {
            name: '',
            email: '',
            phone: '',
            role: 'buyer' // 'buyer', 'seller', 'tenant', 'landlord'
        },
        agent: {
            name: 'John Smith',
            email: 'john@propertypro.ai',
            phone: '(555) 123-4567'
        },
        dates: {
            created: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            contractDate: '',
            closingDate: '',
            inspectionDate: '',
            appraisalDate: '',
            financingDate: '',
            leaseStart: '',
            leaseEnd: ''
        },
        financials: {
            contractPrice: '',
            earnestMoney: '',
            downPayment: '',
            loanAmount: '',
            closingCosts: '',
            commission: '',
            monthlyRent: '',
            securityDeposit: '',
            annualIncrease: '',
            commissionTotal: ''
        },
        progress: 0,
        todos: [],
        documents: [],
        notes: ''
    });

    // Sample contract data (this would be replaced with API data in a real application)
    useEffect(() => {
        const sampleContracts = [
            {
                id: 'C-2025-001',
                contractNumber: 'PA-2025-001',
                title: 'Purchase Agreement - 123 Ocean View',
                type: 'purchase',
                status: 'active',
                property: {
                    address: '123 Ocean View Dr',
                    city: 'Malibu',
                    state: 'CA',
                    zipCode: '90265',
                    price: '$2,450,000',
                    propertyType: 'residential'
                },
                client: {
                    name: 'Robert Johnson',
                    email: 'robert.johnson@example.com',
                    phone: '(310) 555-1234',
                    role: 'buyer'
                },
                agent: {
                    name: 'John Smith',
                    email: 'john@propertypro.ai',
                    phone: '(555) 123-4567'
                },
                dates: {
                    created: '2025-02-15',
                    lastUpdated: '2025-03-10',
                    contractDate: '2025-02-15',
                    closingDate: '2025-04-15',
                    inspectionDate: '2025-02-25',
                    appraisalDate: '2025-03-05',
                    financingDate: '2025-03-30',
                    leaseStart: '',
                    leaseEnd: ''
                },
                financials: {
                    contractPrice: '$2,450,000',
                    earnestMoney: '$50,000',
                    downPayment: '$490,000',
                    loanAmount: '$1,960,000',
                    closingCosts: '$12,500',
                    commission: '$73,500'
                },
                progress: 65,
                todos: [
                    {
                        id: 't1',
                        title: 'Schedule final walkthrough',
                        description: 'Coordinate with seller agent and buyers for final property inspection',
                        dueDate: '2025-04-10',
                        priority: 'high',
                        assignedTo: 'John Smith',
                        completed: false
                    },
                    {
                        id: 't2',
                        title: 'Review closing disclosure',
                        description: 'Review final closing statement with buyers',
                        dueDate: '2025-04-05',
                        priority: 'high',
                        assignedTo: 'John Smith',
                        completed: false
                    }
                ],
                documents: [
                    { id: 'd1', name: 'Purchase Agreement.pdf', type: 'contract', uploadDate: '2025-02-15' },
                    { id: 'd2', name: 'Inspection Report.pdf', type: 'inspection', uploadDate: '2025-02-26' },
                    { id: 'd3', name: 'Loan Approval.pdf', type: 'financing', uploadDate: '2025-03-10' }
                ],
                notes: 'Buyers are very excited about the ocean view property. Inspection revealed minor roof repairs needed.'
            },
            {
                id: 'C-2025-002',
                contractNumber: 'LS-2025-001',
                title: 'Listing Agreement - 456 Mountain View',
                type: 'sale',
                status: 'pending',
                property: {
                    address: '456 Mountain View Rd',
                    city: 'Aspen',
                    state: 'CO',
                    zipCode: '81611',
                    price: '$3,750,000',
                    propertyType: 'residential'
                },
                client: {
                    name: 'Elizabeth Taylor',
                    email: 'elizabeth.taylor@example.com',
                    phone: '(970) 555-6789',
                    role: 'seller'
                },
                agent: {
                    name: 'John Smith',
                    email: 'john@propertypro.ai',
                    phone: '(555) 123-4567'
                },
                dates: {
                    created: '2025-03-01',
                    lastUpdated: '2025-03-05',
                    contractDate: '2025-03-01',
                    closingDate: '',
                    inspectionDate: '',
                    appraisalDate: '',
                    financingDate: '',
                    leaseStart: '',
                    leaseEnd: '',
                    listingExpirationDate: '2025-09-01'
                },
                financials: {
                    listingPrice: '$3,750,000',
                    suggestedPrice: '$3,600,000',
                    commission: '5.5%',
                    marketingBudget: '$2,500'
                },
                progress: 15,
                todos: [
                    {
                        id: 't1',
                        title: 'Schedule professional photography',
                        description: 'Arrange for professional photos and virtual tour',
                        dueDate: '2025-03-15',
                        priority: 'high',
                        assignedTo: 'John Smith',
                        completed: false
                    }
                ],
                documents: [
                    { id: 'd1', name: 'Listing Agreement.pdf', type: 'contract', uploadDate: '2025-03-01' },
                    { id: 'd2', name: 'Property Disclosure.pdf', type: 'disclosure', uploadDate: '2025-03-05' }
                ],
                notes: 'Seller is motivated due to relocation. Great mountain views and access to hiking trails.'
            },
            // ... additional sample contracts
        ];
        setContracts(sampleContracts);
        setFilteredContracts(sampleContracts);
    }, []);

    // Apply search, filters, and sorting
    useEffect(() => {
        let result = [...contracts];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(contract =>
                contract.title.toLowerCase().includes(query) ||
                contract.contractNumber.toLowerCase().includes(query) ||
                contract.property.address.toLowerCase().includes(query) ||
                contract.client.name.toLowerCase().includes(query)
            );
        }
        if (statusFilter !== 'all') {
            result = result.filter(contract => contract.status === statusFilter);
        }
        if (typeFilter !== 'all') {
            result = result.filter(contract => contract.type === typeFilter);
        }
        switch (sortBy) {
            case 'date-asc':
                result.sort((a, b) => new Date(a.dates.created) - new Date(b.dates.created));
                break;
            case 'date-desc':
                result.sort((a, b) => new Date(b.dates.created) - new Date(a.dates.created));
                break;
            case 'progress-asc':
                result.sort((a, b) => a.progress - b.progress);
                break;
            case 'progress-desc':
                result.sort((a, b) => b.progress - a.progress);
                break;
            case 'alpha-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'alpha-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }
        setFilteredContracts(result);
    }, [contracts, searchQuery, statusFilter, typeFilter, sortBy]);

    // Handlers for viewing, editing, updating, and deleting contracts
    const handleViewContract = (contract) => {
        setSelectedContract(contract);
        setIsViewingContract(true);
        setIsEditingContract(false);
    };

    const handleEditContract = () => {
        setIsEditingContract(true);
    };

    const handleUpdateContract = () => {
        const updatedContracts = contracts.map(contract =>
            contract.id === selectedContract.id ? selectedContract : contract
        );
        setContracts(updatedContracts);
        setIsEditingContract(false);
        // Update lastUpdated date
        const updatedContract = { ...selectedContract };
        updatedContract.dates.lastUpdated = new Date().toISOString().split('T')[0];
        setSelectedContract(updatedContract);
    };

    const handleDeleteContract = (id) => {
        const updatedContracts = contracts.filter(contract => contract.id !== id);
        setContracts(updatedContracts);
        if (selectedContract && selectedContract.id === id) {
            setSelectedContract(null);
            setIsViewingContract(false);
            setIsEditingContract(false);
        }
    };

    const handleAddContract = () => {
        // Generate a new ID and contract number
        const newId = `C-2025-${String(contracts.length + 1).padStart(3, '0')}`;
        const contractNum = `${newContract.type.substring(0, 2).toUpperCase()}-2025-${String(contracts.length + 1).padStart(3, '0')}`;
        const contractToAdd = {
            ...newContract,
            id: newId,
            contractNumber: contractNum,
            dates: {
                ...newContract.dates,
                created: new Date().toISOString().split('T')[0],
                lastUpdated: new Date().toISOString().split('T')[0],
            }
        };
        setContracts([...contracts, contractToAdd]);
        setShowNewContractModal(false);
        // Reset new contract state
        setNewContract({
            id: '',
            contractNumber: '',
            title: '',
            type: 'purchase',
            status: 'pending',
            property: {
                address: '',
                city: '',
                state: '',
                zipCode: '',
                price: '',
                propertyType: 'residential'
            },
            client: {
                name: '',
                email: '',
                phone: '',
                role: 'buyer'
            },
            agent: {
                name: 'John Smith',
                email: 'john@propertypro.ai',
                phone: '(555) 123-4567'
            },
            dates: {
                created: new Date().toISOString().split('T')[0],
                lastUpdated: new Date().toISOString().split('T')[0],
                contractDate: '',
                closingDate: '',
                inspectionDate: '',
                appraisalDate: '',
                financingDate: '',
                leaseStart: '',
                leaseEnd: ''
            },
            financials: {
                contractPrice: '',
                earnestMoney: '',
                downPayment: '',
                loanAmount: '',
                closingCosts: '',
                commission: '',
                monthlyRent: '',
                securityDeposit: '',
                annualIncrease: '',
                commissionTotal: ''
            },
            progress: 0,
            todos: [],
            documents: [],
            notes: ''
        });
    };

    // To-do handlers
    const handleAddTodo = () => {
        if (!newTodoItem.title) return;
        const todoId = `t${selectedContract.todos.length + 1}`;
        const todoToAdd = { ...newTodoItem, id: todoId };
        const updatedContract = { ...selectedContract, todos: [...selectedContract.todos, todoToAdd] };
        updatedContract.dates.lastUpdated = new Date().toISOString().split('T')[0];
        setSelectedContract(updatedContract);
        const updatedContracts = contracts.map(contract =>
            contract.id === selectedContract.id ? updatedContract : contract
        );
        setContracts(updatedContracts);
        setIsAddingTodo(false);
        setNewTodoItem({ title: '', description: '', dueDate: '', priority: 'medium', assignedTo: '', completed: false });
    };

    const handleToggleTodoStatus = (todoId) => {
        const updatedContract = { ...selectedContract };
        updatedContract.todos = updatedContract.todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        updatedContract.dates.lastUpdated = new Date().toISOString().split('T')[0];
        setSelectedContract(updatedContract);
        const updatedContracts = contracts.map(contract =>
            contract.id === selectedContract.id ? updatedContract : contract
        );
        setContracts(updatedContracts);
    };

    const handleDeleteTodo = (todoId) => {
        const updatedContract = { ...selectedContract };
        updatedContract.todos = updatedContract.todos.filter(todo => todo.id !== todoId);
        updatedContract.dates.lastUpdated = new Date().toISOString().split('T')[0];
        setSelectedContract(updatedContract);
        const updatedContracts = contracts.map(contract =>
            contract.id === selectedContract.id ? updatedContract : contract
        );
        setContracts(updatedContracts);
    };

    // Calculate progress based on contract type and completed to-dos or key dates
    const calculateProgress = (contract) => {
        if (!contract) return 0;
        if (contract.type === 'purchase' || contract.type === 'sale') {
            let totalPoints = 0;
            let completedPoints = 0;
            if (contract.todos.length > 0) {
                totalPoints += contract.todos.length * 10;
                completedPoints += contract.todos.filter(todo => todo.completed).length * 10;
            }
            const keyDates = ['contractDate', 'closingDate', 'inspectionDate', 'appraisalDate', 'financingDate'];
            const filledDates = keyDates.filter(dateKey => contract.dates[dateKey] && contract.dates[dateKey] !== '');
            totalPoints += keyDates.length * 10;
            completedPoints += filledDates.length * 10;
            if (contract.status === 'completed') return 100;
            else if (contract.status === 'cancelled') return 0;
            const progress = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
            return Math.min(Math.max(progress, 5), 95);
        } else if (contract.type === 'lease') {
            const today = new Date();
            const leaseStart = new Date(contract.dates.leaseStart);
            const contractDate = new Date(contract.dates.contractDate);
            if (today >= leaseStart) return 100;
            const totalDays = (leaseStart - contractDate) / (1000 * 60 * 60 * 24);
            const daysPassed = (today - contractDate) / (1000 * 60 * 60 * 24);
            const progress = Math.round((daysPassed / totalDays) * 100);
            return Math.min(Math.max(progress, 5), 95);
        }
        return contract.progress;
    };

    const formatCurrencyValue = (value) => {
        if (!value) return '';
        if (typeof value === 'string' && value.includes('$')) return value;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // Badge helpers
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Active
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Pending
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Completed
                    </Badge>
                );
            case 'cancelled':
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                        <Ban className="w-3.5 h-3.5 mr-1" />
                        Cancelled
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getTypeBadge = (type) => {
        switch (type) {
            case 'purchase':
                return (
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">
                        <Home className="w-3.5 h-3.5 mr-1" />
                        Purchase
                    </Badge>
                );
            case 'sale':
                return (
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        Sale
                    </Badge>
                );
            case 'lease':
                return (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                        <FileText className="w-3.5 h-3.5 mr-1" />
                        Lease
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getPropertyTypeBadge = (type) => {
        switch (type) {
            case 'residential':
                return (
                    <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-300">
                        <Home className="w-3.5 h-3.5 mr-1" />
                        Residential
                    </Badge>
                );
            case 'commercial':
                return (
                    <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-300">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        Commercial
                    </Badge>
                );
            case 'land':
                return (
                    <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-300">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        Land
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'high':
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-300">
                        High Priority
                    </Badge>
                );
            case 'medium':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        Medium Priority
                    </Badge>
                );
            case 'low':
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        Low Priority
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'buyer':
                return (
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        <User className="w-3.5 h-3.5 mr-1" />
                        Buyer
                    </Badge>
                );
            case 'seller':
                return (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <UserCheck className="w-3.5 h-3.5 mr-1" />
                        Seller
                    </Badge>
                );
            case 'tenant':
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        <UserPlus className="w-3.5 h-3.5 mr-1" />
                        Tenant
                    </Badge>
                );
            case 'landlord':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        Landlord
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getProgressColor = (progress) => {
        if (progress < 25) return 'bg-red-500';
        if (progress < 50) return 'bg-yellow-500';
        if (progress < 75) return 'bg-blue-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            <Sidebar activePage="contracts" />
            <div className="lg:pl-72 min-h-screen">
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contracts</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Manage your property contracts, track progress, spending and to-do lists.
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowNewContractModal(true)}
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            <Plus className="w-4 h-4 mr-2" /> New Contract
                        </Button>
                    </div>

                    {/* Filters and Search */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                placeholder="Search contracts..."
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
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="typeFilter" className="min-w-[80px]">Type:</Label>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger id="typeFilter" className="flex-1">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="purchase">Purchase</SelectItem>
                                    <SelectItem value="sale">Sale</SelectItem>
                                    <SelectItem value="lease">Lease</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="sortBy" className="min-w-[80px]">Sort by:</Label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger id="sortBy" className="flex-1">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                                    <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                                    <SelectItem value="progress-desc">Progress (High to Low)</SelectItem>
                                    <SelectItem value="progress-asc">Progress (Low to High)</SelectItem>
                                    <SelectItem value="alpha-asc">Title (A-Z)</SelectItem>
                                    <SelectItem value="alpha-desc">Title (Z-A)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contracts List */}
                        <div className={`lg:col-span-${isViewingContract ? '1' : '3'}`}>
                            <Card className="border border-slate-200 dark:border-slate-700">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Contracts ({filteredContracts.length})</CardTitle>
                                        <Badge variant="outline" className="text-xs bg-slate-100 dark:bg-slate-800">
                                            {statusFilter === 'all' ? 'All Statuses' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        {filteredContracts.length === 0
                                            ? 'No contracts match your filters'
                                            : `Showing ${filteredContracts.length} of ${contracts.length} contracts`}
                                    </CardDescription>
                                </CardHeader>
                                <ScrollArea className="h-[calc(100vh-300px)]">
                                    <CardContent className="py-6">
                                        <div className="space-y-4">
                                            {filteredContracts.length > 0 ? (
                                                filteredContracts.map((contract) => (
                                                    <div
                                                        key={contract.id}
                                                        className={`group relative p-5 rounded-xl transition-all border-l-4 shadow-sm hover:shadow-md ${selectedContract && selectedContract.id === contract.id
                                                                ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-l-indigo-500'
                                                                : 'bg-white dark:bg-slate-900 border-l-transparent hover:border-l-indigo-300 dark:hover:border-l-indigo-700'
                                                            }`}
                                                        onClick={() => handleViewContract(contract)}
                                                    >
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                                                            <h3 className="font-semibold text-slate-900 dark:text-white flex-1 text-sm">
                                                                {contract.title}
                                                            </h3>
                                                            {getStatusBadge(contract.status)}
                                                        </div>

                                                        <div className="flex flex-wrap gap-3 mb-4">
                                                            <div className="flex items-center text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                                                <FileText className="w-3.5 h-3.5 mr-1.5" />
                                                                {contract.contractNumber}
                                                            </div>
                                                            {getTypeBadge(contract.type)}
                                                        </div>

                                                        <div className="grid sm:grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                                                                        <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                                                    </div>
                                                                    <span className='text-[8px]'>{contract.property.address}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                                                                        <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                                                    </div>
                                                                    <span className='text-[8px]'>{contract.client.name}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col justify-end gap-1.5">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Progress</span>
                                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                                        {calculateProgress(contract)}%
                                                                    </span>
                                                                </div>
                                                                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full transition-all ${getProgressColor(calculateProgress(contract))}`}
                                                                        style={{ width: `${calculateProgress(contract)}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-12 px-4">
                                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-full mb-4">
                                                        <FileText size={32} className="text-slate-400 dark:text-slate-500" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No contracts found</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-sm">
                                                        We couldn't find any contracts matching your current filters.
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        className="flex items-center gap-2"
                                                        onClick={() => {
                                                            setSearchQuery('');
                                                            setStatusFilter('all');
                                                            setTypeFilter('all');
                                                        }}
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                        <span>Reset Filters</span>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </ScrollArea>
                            </Card>
                        </div>

                        {/* Contract Details */}
                        {isViewingContract && selectedContract && (
                            <div className="lg:col-span-2">
                                <Card className="border border-slate-200 dark:border-slate-700">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <CardTitle>{isEditingContract ? 'Edit Contract' : 'Contract Details'}</CardTitle>
                                                {!isEditingContract && getStatusBadge(selectedContract.status)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {!isEditingContract ? (
                                                    <>
                                                        <Button variant="outline" size="sm" onClick={() => { setSelectedContract(null); setIsViewingContract(false); }}>
                                                            <X className="w-4 h-4 mr-1" /> Close
                                                        </Button>
                                                        <Button variant="default" size="sm" onClick={handleEditContract}>
                                                            <Edit className="w-4 h-4 mr-1" /> Edit
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button variant="outline" size="sm" onClick={() => setIsEditingContract(false)}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="default" size="sm" onClick={handleUpdateContract}>
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Save Changes
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[calc(100vh-300px)]">
                                            <Tabs defaultValue="details" className="w-full">
                                                <TabsList className="mb-4">
                                                    <TabsTrigger value="details">Details</TabsTrigger>
                                                    <TabsTrigger value="todos">
                                                        To-Dos{' '}
                                                        {selectedContract.todos.length > 0 && (
                                                            <Badge className="ml-1 bg-indigo-100 text-indigo-800 border-indigo-200">
                                                                {selectedContract.todos.filter(todo => !todo.completed).length}
                                                            </Badge>
                                                        )}
                                                    </TabsTrigger>
                                                    <TabsTrigger value="documents">Documents</TabsTrigger>
                                                    <TabsTrigger value="notes">Notes</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="details" className="mt-0">
                                                    <div className="space-y-6">
                                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                                            <div>
                                                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            value={selectedContract.title}
                                                                            onChange={(e) => setSelectedContract({ ...selectedContract, title: e.target.value })}
                                                                            className="mt-1"
                                                                        />
                                                                    ) : (
                                                                        selectedContract.title
                                                                    )}
                                                                </h2>
                                                                <div className="flex flex-wrap gap-2 items-center mt-2 text-sm text-slate-500 dark:text-slate-400">
                                                                    <div className="flex items-center">
                                                                        <FileText className="w-4 h-4 mr-1" />
                                                                        {selectedContract.contractNumber}
                                                                    </div>
                                                                    <span>•</span>
                                                                    <div>
                                                                        {getTypeBadge(selectedContract.type)}
                                                                    </div>
                                                                    {isEditingContract && (
                                                                        <Select
                                                                            value={selectedContract.type}
                                                                            onValueChange={(value) => setSelectedContract({ ...selectedContract, type: value })}
                                                                        >
                                                                            <SelectTrigger className="w-32 h-8 text-xs">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="purchase">Purchase</SelectItem>
                                                                                <SelectItem value="sale">Sale</SelectItem>
                                                                                <SelectItem value="lease">Lease</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <span className="text-sm font-medium">{selectedContract.progress}% Complete</span>
                                                                    {isEditingContract && (
                                                                        <Input
                                                                            type="number"
                                                                            min="0"
                                                                            max="100"
                                                                            className="w-16 h-8 text-xs"
                                                                            value={selectedContract.progress}
                                                                            onChange={(e) => setSelectedContract({ ...selectedContract, progress: parseInt(e.target.value) || 0 })}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="w-full sm:w-64 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full ${getProgressColor(selectedContract.progress)}`}
                                                                        style={{ width: `${selectedContract.progress}%` }}
                                                                    ></div>
                                                                </div>
                                                                {isEditingContract && (
                                                                    <div className="mt-2 flex items-center gap-2">
                                                                        <Label>Status:</Label>
                                                                        <Select
                                                                            value={selectedContract.status}
                                                                            onValueChange={(value) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    status: value,
                                                                                    progress: value === 'completed' ? 100 : value === 'cancelled' ? 0 : selectedContract.progress
                                                                                })
                                                                            }
                                                                        >
                                                                            <SelectTrigger className="w-32 text-xs">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="pending">Pending</SelectItem>
                                                                                <SelectItem value="active">Active</SelectItem>
                                                                                <SelectItem value="completed">Completed</SelectItem>
                                                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Property Information</h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <Label className="text-sm">Address</Label>
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            value={selectedContract.property.address}
                                                                            onChange={(e) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    property: { ...selectedContract.property, address: e.target.value }
                                                                                })
                                                                            }
                                                                            className="mt-1"
                                                                        />
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">{selectedContract.property.address}</div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm">City, State, ZIP</Label>
                                                                    {isEditingContract ? (
                                                                        <div className="grid grid-cols-3 gap-2 mt-1">
                                                                            <Input
                                                                                value={selectedContract.property.city}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        property: { ...selectedContract.property, city: e.target.value }
                                                                                    })
                                                                                }
                                                                                placeholder="City"
                                                                            />
                                                                            <Input
                                                                                value={selectedContract.property.state}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        property: { ...selectedContract.property, state: e.target.value }
                                                                                    })
                                                                                }
                                                                                placeholder="State"
                                                                            />
                                                                            <Input
                                                                                value={selectedContract.property.zipCode}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        property: { ...selectedContract.property, zipCode: e.target.value }
                                                                                    })
                                                                                }
                                                                                placeholder="ZIP"
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                            {selectedContract.property.city}, {selectedContract.property.state} {selectedContract.property.zipCode}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm">Property Type</Label>
                                                                    {isEditingContract ? (
                                                                        <Select
                                                                            value={selectedContract.property.propertyType}
                                                                            onValueChange={(value) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    property: { ...selectedContract.property, propertyType: value }
                                                                                })
                                                                            }
                                                                        >
                                                                            <SelectTrigger className="mt-1">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="residential">Residential</SelectItem>
                                                                                <SelectItem value="commercial">Commercial</SelectItem>
                                                                                <SelectItem value="land">Land</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    ) : (
                                                                        <div className="mt-1">{getPropertyTypeBadge(selectedContract.property.propertyType)}</div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm">Price</Label>
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            value={selectedContract.property.price.replace(/[$,]/g, '')}
                                                                            onChange={(e) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    property: { ...selectedContract.property, price: formatCurrencyValue(e.target.value) }
                                                                                })
                                                                            }
                                                                            className="mt-1"
                                                                            placeholder="0"
                                                                        />
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">{selectedContract.property.price}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Client Information</h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <Label className="text-sm">Client Name</Label>
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            value={selectedContract.client.name}
                                                                            onChange={(e) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    client: { ...selectedContract.client, name: e.target.value }
                                                                                })
                                                                            }
                                                                            className="mt-1"
                                                                        />
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">{selectedContract.client.name}</div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm">Client Role</Label>
                                                                    {isEditingContract ? (
                                                                        <Select
                                                                            value={selectedContract.client.role}
                                                                            onValueChange={(value) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    client: { ...selectedContract.client, role: value }
                                                                                })
                                                                            }
                                                                        >
                                                                            <SelectTrigger className="mt-1">
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="buyer">Buyer</SelectItem>
                                                                                <SelectItem value="seller">Seller</SelectItem>
                                                                                <SelectItem value="tenant">Tenant</SelectItem>
                                                                                <SelectItem value="landlord">Landlord</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    ) : (
                                                                        <div className="mt-1">{getRoleBadge(selectedContract.client.role)}</div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm">Email</Label>
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            value={selectedContract.client.email}
                                                                            onChange={(e) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    client: { ...selectedContract.client, email: e.target.value }
                                                                                })
                                                                            }
                                                                            className="mt-1"
                                                                            type="email"
                                                                        />
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">{selectedContract.client.email}</div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <Label className="text-sm">Phone</Label>
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            value={selectedContract.client.phone}
                                                                            onChange={(e) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    client: { ...selectedContract.client, phone: e.target.value }
                                                                                })
                                                                            }
                                                                            className="mt-1"
                                                                        />
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">{selectedContract.client.phone}</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg mt-4">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar>
                                                                        <AvatarFallback>JS</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-medium text-slate-900 dark:text-white">{selectedContract.agent.name}</div>
                                                                        <div className="text-sm text-slate-500 dark:text-slate-400">Assigned Agent</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Key Dates</h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                                <div>
                                                                    <Label className="text-sm">Contract Date</Label>
                                                                    {isEditingContract ? (
                                                                        <Input
                                                                            type="date"
                                                                            value={selectedContract.dates.contractDate}
                                                                            onChange={(e) =>
                                                                                setSelectedContract({
                                                                                    ...selectedContract,
                                                                                    dates: { ...selectedContract.dates, contractDate: e.target.value }
                                                                                })
                                                                            }
                                                                            className="mt-1"
                                                                        />
                                                                    ) : (
                                                                        <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                            {selectedContract.dates.contractDate || 'Not set'}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {(selectedContract.type === 'purchase' || selectedContract.type === 'sale') && (
                                                                    <div>
                                                                        <Label className="text-sm">Closing Date</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                type="date"
                                                                                value={selectedContract.dates.closingDate}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        dates: { ...selectedContract.dates, closingDate: e.target.value }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.dates.closingDate || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {selectedContract.type === 'purchase' && (
                                                                    <>
                                                                        <div>
                                                                            <Label className="text-sm">Inspection Date</Label>
                                                                            {isEditingContract ? (
                                                                                <Input
                                                                                    type="date"
                                                                                    value={selectedContract.dates.inspectionDate}
                                                                                    onChange={(e) =>
                                                                                        setSelectedContract({
                                                                                            ...selectedContract,
                                                                                            dates: { ...selectedContract.dates, inspectionDate: e.target.value }
                                                                                        })
                                                                                    }
                                                                                    className="mt-1"
                                                                                />
                                                                            ) : (
                                                                                <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                    {selectedContract.dates.inspectionDate || 'Not set'}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm">Appraisal Date</Label>
                                                                            {isEditingContract ? (
                                                                                <Input
                                                                                    type="date"
                                                                                    value={selectedContract.dates.appraisalDate}
                                                                                    onChange={(e) =>
                                                                                        setSelectedContract({
                                                                                            ...selectedContract,
                                                                                            dates: { ...selectedContract.dates, appraisalDate: e.target.value }
                                                                                        })
                                                                                    }
                                                                                    className="mt-1"
                                                                                />
                                                                            ) : (
                                                                                <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                    {selectedContract.dates.appraisalDate || 'Not set'}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm">Financing Date</Label>
                                                                            {isEditingContract ? (
                                                                                <Input
                                                                                    type="date"
                                                                                    value={selectedContract.dates.financingDate}
                                                                                    onChange={(e) =>
                                                                                        setSelectedContract({
                                                                                            ...selectedContract,
                                                                                            dates: { ...selectedContract.dates, financingDate: e.target.value }
                                                                                        })
                                                                                    }
                                                                                    className="mt-1"
                                                                                />
                                                                            ) : (
                                                                                <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                    {selectedContract.dates.financingDate || 'Not set'}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                )}
                                                                {selectedContract.type === 'lease' && (
                                                                    <>
                                                                        <div>
                                                                            <Label className="text-sm">Lease Start</Label>
                                                                            {isEditingContract ? (
                                                                                <Input
                                                                                    type="date"
                                                                                    value={selectedContract.dates.leaseStart}
                                                                                    onChange={(e) =>
                                                                                        setSelectedContract({
                                                                                            ...selectedContract,
                                                                                            dates: { ...selectedContract.dates, leaseStart: e.target.value }
                                                                                        })
                                                                                    }
                                                                                    className="mt-1"
                                                                                />
                                                                            ) : (
                                                                                <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                    {selectedContract.dates.leaseStart || 'Not set'}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm">Lease End</Label>
                                                                            {isEditingContract ? (
                                                                                <Input
                                                                                    type="date"
                                                                                    value={selectedContract.dates.leaseEnd}
                                                                                    onChange={(e) =>
                                                                                        setSelectedContract({
                                                                                            ...selectedContract,
                                                                                            dates: { ...selectedContract.dates, leaseEnd: e.target.value }
                                                                                        })
                                                                                    }
                                                                                    className="mt-1"
                                                                                />
                                                                            ) : (
                                                                                <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                    {selectedContract.dates.leaseEnd || 'Not set'}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                )}
                                                                <div>
                                                                    <Label className="text-sm">Last Updated</Label>
                                                                    <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                        {selectedContract.dates.lastUpdated}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                        {(selectedContract.type === 'purchase' || selectedContract.type === 'sale') && (
                                                            <div>
                                                                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Financial Information</h3>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                                    <div>
                                                                        <Label className="text-sm">Contract Price</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.contractPrice?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            contractPrice: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.contractPrice || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Earnest Money</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.earnestMoney?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            earnestMoney: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.earnestMoney || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Down Payment</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.downPayment?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            downPayment: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.downPayment || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Loan Amount</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.loanAmount?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            loanAmount: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.loanAmount || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Closing Costs</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.closingCosts?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            closingCosts: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.closingCosts || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Commission</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.commission?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            commission: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.commission || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {selectedContract.type === 'lease' && (
                                                            <div>
                                                                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Lease Information</h3>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                                    <div>
                                                                        <Label className="text-sm">Monthly Rent</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.monthlyRent?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            monthlyRent: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.monthlyRent || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Security Deposit</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.securityDeposit?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            securityDeposit: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.securityDeposit || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Annual Increase</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.annualIncrease?.replace(/%/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            annualIncrease: `${e.target.value}%`
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0%"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.annualIncrease || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <Label className="text-sm">Total Commission</Label>
                                                                        {isEditingContract ? (
                                                                            <Input
                                                                                value={selectedContract.financials.commissionTotal?.replace(/[$,]/g, '')}
                                                                                onChange={(e) =>
                                                                                    setSelectedContract({
                                                                                        ...selectedContract,
                                                                                        financials: {
                                                                                            ...selectedContract.financials,
                                                                                            commissionTotal: formatCurrencyValue(e.target.value)
                                                                                        }
                                                                                    })
                                                                                }
                                                                                className="mt-1"
                                                                                placeholder="0"
                                                                            />
                                                                        ) : (
                                                                            <div className="mt-1 text-slate-700 dark:text-slate-300">
                                                                                {selectedContract.financials.commissionTotal || 'Not set'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="todos" className="mt-0">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">To-Do List</h3>
                                                        <Button
                                                            onClick={() => setIsAddingTodo(true)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                            Add Item
                                                        </Button>
                                                    </div>
                                                    {isAddingTodo ? (
                                                        <Card className="mb-4 border-2 border-indigo-200 dark:border-indigo-800">
                                                            <CardContent className="pt-4">
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <Label htmlFor="todo-title">Title*</Label>
                                                                        <Input
                                                                            id="todo-title"
                                                                            value={newTodoItem.title}
                                                                            onChange={(e) => setNewTodoItem({ ...newTodoItem, title: e.target.value })}
                                                                            placeholder="Enter task title"
                                                                            className="mt-1"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="todo-description">Description</Label>
                                                                        <Textarea
                                                                            id="todo-description"
                                                                            value={newTodoItem.description}
                                                                            onChange={(e) => setNewTodoItem({ ...newTodoItem, description: e.target.value })}
                                                                            placeholder="Enter task description"
                                                                            className="mt-1"
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <div>
                                                                            <Label htmlFor="todo-due-date">Due Date</Label>
                                                                            <Input
                                                                                id="todo-due-date"
                                                                                type="date"
                                                                                value={newTodoItem.dueDate}
                                                                                onChange={(e) => setNewTodoItem({ ...newTodoItem, dueDate: e.target.value })}
                                                                                className="mt-1"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <Label htmlFor="todo-priority">Priority</Label>
                                                                            <Select
                                                                                value={newTodoItem.priority}
                                                                                onValueChange={(value) => setNewTodoItem({ ...newTodoItem, priority: value })}
                                                                            >
                                                                                <SelectTrigger id="todo-priority" className="mt-1">
                                                                                    <SelectValue placeholder="Select priority" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="low">Low</SelectItem>
                                                                                    <SelectItem value="medium">Medium</SelectItem>
                                                                                    <SelectItem value="high">High</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="todo-assigned">Assigned To</Label>
                                                                        <Input
                                                                            id="todo-assigned"
                                                                            value={newTodoItem.assignedTo}
                                                                            onChange={(e) => setNewTodoItem({ ...newTodoItem, assignedTo: e.target.value })}
                                                                            placeholder="Enter name"
                                                                            className="mt-1"
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center justify-end gap-2 pt-2">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                setIsAddingTodo(false);
                                                                                setNewTodoItem({ title: '', description: '', dueDate: '', priority: 'medium', assignedTo: '', completed: false });
                                                                            }}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                        <Button size="sm" onClick={handleAddTodo} disabled={!newTodoItem.title}>
                                                                            Add To-Do
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ) : null}
                                                    {selectedContract.todos.length === 0 ? (
                                                        <div className="text-center py-8">
                                                            <div className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4">
                                                                <ListTodo size={48} />
                                                            </div>
                                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No to-do items</h3>
                                                            <p className="text-slate-500 dark:text-slate-400 mb-4">Add to-do items to track progress</p>
                                                            <Button onClick={() => setIsAddingTodo(true)} variant="outline">
                                                                <Plus className="w-4 h-4 mr-2" />
                                                                Add First Item
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            {selectedContract.todos
                                                                .sort((a, b) => {
                                                                    if (a.completed !== b.completed) return a.completed ? 1 : -1;
                                                                    const priorityOrder = { high: 1, medium: 2, low: 3 };
                                                                    if (a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority];
                                                                    if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
                                                                    return 0;
                                                                })
                                                                .map((todo) => (
                                                                    <div
                                                                        key={todo.id}
                                                                        className={`p-4 border rounded-lg transition-colors ${todo.completed
                                                                                ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700'
                                                                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                                                            }`}
                                                                    >
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="flex items-start">
                                                                                <div className="pt-0.5">
                                                                                    <Checkbox
                                                                                        checked={todo.completed}
                                                                                        onCheckedChange={() => handleToggleTodoStatus(todo.id)}
                                                                                        className="h-5 w-5"
                                                                                    />
                                                                                </div>
                                                                                <div className="ml-3">
                                                                                    <div className={`font-medium ${todo.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                                                                        {todo.title}
                                                                                    </div>
                                                                                    {todo.description && (
                                                                                        <div className={`text-sm mt-1 ${todo.completed ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'}`}>
                                                                                            {todo.description}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <DropdownMenu>
                                                                                <DropdownMenuTrigger asChild>
                                                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                                    </Button>
                                                                                </DropdownMenuTrigger>
                                                                                <DropdownMenuContent align="end">
                                                                                    <DropdownMenuItem onClick={() => handleToggleTodoStatus(todo.id)}>
                                                                                        {todo.completed ? (
                                                                                            <>
                                                                                                <Circle className="mr-2 h-4 w-4" />
                                                                                                <span>Mark as incomplete</span>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                                                <span>Mark as complete</span>
                                                                                            </>
                                                                                        )}
                                                                                    </DropdownMenuItem>
                                                                                    <DropdownMenuSeparator />
                                                                                    <DropdownMenuItem onClick={() => handleDeleteTodo(todo.id)} className="text-red-600 dark:text-red-400">
                                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                                        <span>Delete</span>
                                                                                    </DropdownMenuItem>
                                                                                </DropdownMenuContent>
                                                                            </DropdownMenu>
                                                                        </div>
                                                                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
                                                                            {todo.dueDate && (
                                                                                <div className="flex items-center text-slate-500 dark:text-slate-400">
                                                                                    <CalendarClock className="w-4 h-4 mr-1" />
                                                                                    <span>Due: {todo.dueDate}</span>
                                                                                </div>
                                                                            )}
                                                                            {todo.assignedTo && (
                                                                                <div className="flex items-center text-slate-500 dark:text-slate-400">
                                                                                    <Users className="w-4 h-4 mr-1" />
                                                                                    <span>Assigned to: {todo.assignedTo}</span>
                                                                                </div>
                                                                            )}
                                                                            <div>{getPriorityBadge(todo.priority)}</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
                                                </TabsContent>

                                                <TabsContent value="documents" className="mt-0">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Documents</h3>
                                                        <Button
                                                            onClick={() => {
                                                                /* Document upload handler */
                                                            }}
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                            Upload Document
                                                        </Button>
                                                    </div>
                                                    {selectedContract.documents.length === 0 ? (
                                                        <div className="text-center py-8">
                                                            <div className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4">
                                                                <FileText size={48} />
                                                            </div>
                                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No documents</h3>
                                                            <p className="text-slate-500 dark:text-slate-400 mb-4">
                                                                Upload contract documents to keep them organized
                                                            </p>
                                                            <Button
                                                                onClick={() => {
                                                                    /* Document upload handler */
                                                                }}
                                                                variant="outline"
                                                            >
                                                                <Plus className="w-4 h-4 mr-2" />
                                                                Upload First Document
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {selectedContract.documents.map((doc) => (
                                                                <div
                                                                    key={doc.id}
                                                                    className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                                                                >
                                                                    <div className="flex items-center">
                                                                        <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mr-3" />
                                                                        <div>
                                                                            <div className="font-medium text-slate-900 dark:text-white">{doc.name}</div>
                                                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                                                Uploaded on {doc.uploadDate} • {doc.type}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <TooltipProvider>
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                                        <Eye className="h-4 w-4" />
                                                                                    </Button>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent>View Document</TooltipContent>
                                                                            </Tooltip>
                                                                        </TooltipProvider>
                                                                        <TooltipProvider>
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                                        <Download className="h-4 w-4" />
                                                                                    </Button>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent>Download</TooltipContent>
                                                                            </Tooltip>
                                                                        </TooltipProvider>
                                                                        <DropdownMenu>
                                                                            <DropdownMenuTrigger asChild>
                                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                            <DropdownMenuContent align="end">
                                                                                <DropdownMenuItem>
                                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                                    <span>Rename</span>
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem>
                                                                                    <ClipboardCopy className="mr-2 h-4 w-4" />
                                                                                    <span>Copy Link</span>
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuSeparator />
                                                                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                                    <span>Delete</span>
                                                                                </DropdownMenuItem>
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </TabsContent>

                                                <TabsContent value="notes" className="mt-0">
                                                    <div className="space-y-4">
                                                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Notes</h3>
                                                        {isEditingContract ? (
                                                            <Textarea
                                                                value={selectedContract.notes}
                                                                onChange={(e) =>
                                                                    setSelectedContract({ ...selectedContract, notes: e.target.value })
                                                                }
                                                                className="mt-1"
                                                                rows={4}
                                                            />
                                                        ) : (
                                                            <p className="text-slate-700 dark:text-slate-300">{selectedContract.notes || 'No notes available.'}</p>
                                                        )}
                                                    </div>
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

            {/* New Contract Modal */}
            <Dialog open={showNewContractModal} onOpenChange={setShowNewContractModal}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>New Contract</DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new property contract.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label>Title</Label>
                                <Input
                                    value={newContract.title}
                                    onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                                    placeholder="Contract Title"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select
                                    value={newContract.type}
                                    onValueChange={(value) => setNewContract({ ...newContract, type: value })}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="purchase">Purchase</SelectItem>
                                        <SelectItem value="sale">Sale</SelectItem>
                                        <SelectItem value="lease">Lease</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Status</Label>
                                <Select
                                    value={newContract.status}
                                    onValueChange={(value) => setNewContract({ ...newContract, status: value })}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Contract Date</Label>
                                <Input
                                    type="date"
                                    value={newContract.dates.contractDate}
                                    onChange={(e) =>
                                        setNewContract({
                                            ...newContract,
                                            dates: { ...newContract.dates, contractDate: e.target.value }
                                        })
                                    }
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Property Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label>Address</Label>
                                    <Input
                                        value={newContract.property.address}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                property: { ...newContract.property, address: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>City</Label>
                                    <Input
                                        value={newContract.property.city}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                property: { ...newContract.property, city: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>State</Label>
                                    <Input
                                        value={newContract.property.state}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                property: { ...newContract.property, state: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>ZIP Code</Label>
                                    <Input
                                        value={newContract.property.zipCode}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                property: { ...newContract.property, zipCode: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Price</Label>
                                    <Input
                                        value={newContract.property.price.replace(/[$,]/g, '')}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                property: { ...newContract.property, price: formatCurrencyValue(e.target.value) }
                                            })
                                        }
                                        placeholder="0"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Property Type</Label>
                                    <Select
                                        value={newContract.property.propertyType}
                                        onValueChange={(value) =>
                                            setNewContract({
                                                ...newContract,
                                                property: { ...newContract.property, propertyType: value }
                                            })
                                        }
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="residential">Residential</SelectItem>
                                            <SelectItem value="commercial">Commercial</SelectItem>
                                            <SelectItem value="land">Land</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Client Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label>Client Name</Label>
                                    <Input
                                        value={newContract.client.name}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                client: { ...newContract.client, name: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={newContract.client.email}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                client: { ...newContract.client, email: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        value={newContract.client.phone}
                                        onChange={(e) =>
                                            setNewContract({
                                                ...newContract,
                                                client: { ...newContract.client, phone: e.target.value }
                                            })
                                        }
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Role</Label>
                                    <Select
                                        value={newContract.client.role}
                                        onValueChange={(value) =>
                                            setNewContract({
                                                ...newContract,
                                                client: { ...newContract.client, role: value }
                                            })
                                        }
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="buyer">Buyer</SelectItem>
                                            <SelectItem value="seller">Seller</SelectItem>
                                            <SelectItem value="tenant">Tenant</SelectItem>
                                            <SelectItem value="landlord">Landlord</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddContract}>Create Contract</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// QuickStatusUpdate Component (if needed in the future)
const QuickStatusUpdate = ({ contractId, currentStatus, onStatusChange }) => (
    <Select onValueChange={(value) => onStatusChange(contractId, value)} value={currentStatus}>
        <SelectTrigger>
            <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent>
            {['pending', 'active', 'completed', 'cancelled'].map((status) => (
                <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

// Modernized LeadsTable Component for contracts list
const LeadsTable = ({ contracts, onViewContract, onEditContract, onStatusChange }) => {
    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-300';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-slate-100 text-slate-800 border-slate-300';
        }
    };
    return (
        <div className="overflow-x-auto">
            {/* You could use a Table component here similar to the LeadsPage */}
        </div>
    );
};

export default ContractsPage;