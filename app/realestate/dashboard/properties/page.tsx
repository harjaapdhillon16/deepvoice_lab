// @ts-nocheck

'use client'
import React, { useState, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { 
  Building, 
  Search, 
  Plus, 
  Filter, 
  Grid, 
  List, 
  MoreVertical,
  Edit2, 
  Trash2, 
  ChevronDown, 
  X, 
  Camera, 
  Map, 
  Heart, 
  Share2, 
  DollarSign, 
  Square, 
  Home, 
  Users, 
  Upload,
  Check,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone
} from 'lucide-react';
import Sidebar from '@/components/custom/real_estate/sidebar';

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Demo property data
const propertyData = [
    {
      id: 1,
      title: "Modern Waterfront Villa",
      address: "123 Coastal Highway, Miami, FL 33101",
      price: 1250000,
      status: "For Sale",
      type: "Residential",
      bedrooms: 4,
      bathrooms: 3.5,
      area: 2850,
      yearBuilt: 2019,
      description: "Stunning modern villa with breathtaking ocean views. Features include an infinity pool, gourmet kitchen, and smart home technology throughout.",
      features: ["Swimming Pool", "Smart Home", "Ocean View", "Security System", "Garage", "Fireplace"],
      images: [
        "https://plus.unsplash.com/premium_photo-1682377521630-8ca87f643f49",
      ],
      agent: {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@propertypro.com",
        phone: "(305) 555-8976"
      },
      createdAt: "2023-12-15T14:30:00Z",
      updatedAt: "2024-02-10T09:45:00Z",
      featured: true
    },
    {
      id: 2,
      title: "Downtown Luxury Penthouse",
      address: "456 Skyline Avenue, New York, NY 10001",
      price: 3750000,
      status: "For Sale",
      type: "Condo",
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      yearBuilt: 2021,
      description: "Exclusive penthouse with panoramic city views. Premium finishes, floor-to-ceiling windows, private elevator access, and a spacious rooftop terrace.",
      features: ["Doorman", "Gym", "Parking", "Rooftop Terrace", "Concierge", "Private Elevator"],
      images: [
        "https://images.unsplash.com/photo-1448630360428-65456885c650"
      ],
      agent: {
        id: 1,
        name: "John Smith",
        email: "john@propertypro.com",
        phone: "(212) 555-1234"
      },
      createdAt: "2024-01-05T11:15:00Z",
      updatedAt: "2024-02-18T16:20:00Z",
      featured: true
    },
    {
      id: 3,
      title: "Suburban Family Home",
      address: "789 Maple Street, Bellevue, WA 98004",
      price: 875000,
      status: "For Sale",
      type: "Single Family",
      bedrooms: 5,
      bathrooms: 3,
      area: 3100,
      yearBuilt: 2015,
      description: "Spacious family home in a quiet suburban neighborhood. Large backyard, modern kitchen, finished basement, and close to excellent schools.",
      features: ["Backyard", "Finished Basement", "Close to Schools", "Central Air", "Garden", "Deck"],
      images: [
        "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
      ],
      agent: {
        id: 3,
        name: "Michael Chen",
        email: "michael@propertypro.com",
        phone: "(425) 555-7890"
      },
      createdAt: "2024-01-12T08:45:00Z",
      updatedAt: "2024-02-05T13:10:00Z",
      featured: false
    },
    {
      id: 4,
      title: "Historic Brownstone",
      address: "321 Heritage Row, Boston, MA 02108",
      price: 1650000,
      status: "For Sale",
      type: "Townhouse",
      bedrooms: 4,
      bathrooms: 2.5,
      area: 2400,
      yearBuilt: 1890,
      description: "Meticulously restored historic brownstone with original architectural details. Modern amenities including updated kitchen and bathrooms while preserving its historic charm.",
      features: ["Original Hardwood Floors", "Crown Molding", "Bay Windows", "Fireplace", "Updated Kitchen", "Patio"],
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1",
        "https://images.unsplash.com/photo-1530810266744-9b6ca3d72c48?ixlib=rb-1.2.1",
        "https://images.unsplash.com/photo-1501621965065-c6e1cf6b53e2?ixlib=rb-1.2.1"
      ],
      agent: {
        id: 4,
        name: "Emma Wilson",
        email: "emma@propertypro.com",
        phone: "(617) 555-4321"
      },
      createdAt: "2023-11-20T15:30:00Z",
      updatedAt: "2024-01-25T10:15:00Z",
      featured: false
    },
    {
      id: 5,
      title: "Mountain View Cabin",
      address: "555 Summit Trail, Aspen, CO 81611",
      price: 925000,
      status: "For Sale",
      type: "Cabin",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      yearBuilt: 2018,
      description: "Cozy yet modern cabin with breathtaking mountain views. Vaulted ceilings, stone fireplace, and expansive deck for outdoor entertaining.",
      features: ["Mountain View", "Fireplace", "Deck", "Hiking Trails", "Wood Floors", "Open Floor Plan"],
      images: [
        "https://plus.unsplash.com/premium_photo-1686090450479-370d5ddf4de1"
      ],
      agent: {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@propertypro.com",
        phone: "(305) 555-8976"
      },
      createdAt: "2023-12-05T09:20:00Z",
      updatedAt: "2024-02-12T14:45:00Z",
      featured: false
    },
    {
      id: 6,
      title: "Beachfront Condo",
      address: "777 Ocean Drive, San Diego, CA 92109",
      price: 950000,
      status: "For Sale",
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      yearBuilt: 2020,
      description: "Modern beachfront condo offering stunning sunset views. Open concept living area, designer kitchen, and a large balcony overlooking the ocean.",
      features: ["Ocean View", "Pool", "Gym", "Balcony", "Secured Building", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1"
      ],
      agent: {
        id: 5,
        name: "David Thompson",
        email: "david@propertypro.com",
        phone: "(619) 555-6789"
      },
      createdAt: "2024-01-15T13:40:00Z",
      updatedAt: "2024-02-08T11:30:00Z",
      featured: true
    }
  ];
  

// Property statuses
const propertyStatuses = [
  { value: "For Sale", label: "For Sale", color: "success" },
  { value: "For Rent", label: "For Rent", color: "info" },
  { value: "Pending", label: "Pending", color: "warning" },
  { value: "Sold", label: "Sold", color: "secondary" },
  { value: "Off Market", label: "Off Market", color: "default" }
];

// Property types
const propertyTypes = [
  { value: "Residential", label: "Residential" },
  { value: "Condo", label: "Condo" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Apartment", label: "Apartment" },
  { value: "Single Family", label: "Single Family" },
  { value: "Multi Family", label: "Multi Family" },
  { value: "Loft", label: "Loft" },
  { value: "Cabin", label: "Cabin" },
  { value: "Estate", label: "Estate" },
  { value: "Commercial", label: "Commercial" },
  { value: "Land", label: "Land" }
];

// Demo agent data
const agents = [
  { id: 1, name: "John Smith", email: "john@propertypro.com", phone: "(212) 555-1234" },
  { id: 2, name: "Sarah Johnson", email: "sarah@propertypro.com", phone: "(305) 555-8976" },
  { id: 3, name: "Michael Chen", email: "michael@propertypro.com", phone: "(425) 555-7890" },
  { id: 4, name: "Emma Wilson", email: "emma@propertypro.com", phone: "(617) 555-4321" },
  { id: 5, name: "David Thompson", email: "david@propertypro.com", phone: "(619) 555-6789" }
];

// Property features for selection
const propertyFeatures = [
  "Swimming Pool", "Backyard", "Garage", "Fireplace", "Central Air", "Gym", 
  "Security System", "Smart Home", "Ocean View", "Mountain View", "Balcony", 
  "Patio", "Deck", "Finished Basement", "Wine Cellar", "Home Theater", 
  "Garden", "Doorman", "Parking", "Waterfront", "Rooftop Terrace", "Concierge",
  "Private Elevator", "Open Floor Plan", "High Ceilings", "Hardwood Floors"
];

const PropertyPage = () => {
  // State for property display and filtering
  const [properties, setProperties] = useState(propertyData);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [bedroomsRange, setBedroomsRange] = useState([0, 6]);
  const [bathroomsRange, setBathroomsRange] = useState([0, 6]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState('newest');

  // State for modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  
  // State for image navigation in view modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Ref for scrolling back to top
  const topRef = useRef(null);
  
  // Function to scroll to top
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Form methods for create property
  const createFormMethods = useForm({
    defaultValues: {
      title: '',
      address: '',
      price: '',
      status: 'For Sale',
      type: 'Residential',
      bedrooms: '',
      bathrooms: '',
      area: '',
      yearBuilt: '',
      description: '',
      features: [],
      images: [],
      agent: agents[0].id.toString(),
    }
  });

  // Form methods for update property
  const updateFormMethods = useForm({
    defaultValues: {
      title: '',
      address: '',
      price: '',
      status: 'For Sale',
      type: 'Residential',
      bedrooms: '',
      bathrooms: '',
      area: '',
      yearBuilt: '',
      description: '',
      features: [],
      images: [],
      agent: '',
    }
  });
  
  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    // Search query filter
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = selectedTypes.length === 0 || 
      selectedTypes.includes(property.type);
    
    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || 
      selectedStatuses.includes(property.status);
    
    // Price range filter
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // Bedroom filter
    const matchesBedrooms = property.bedrooms >= bedroomsRange[0] && property.bedrooms <= bedroomsRange[1];
    
    // Bathroom filter
    const matchesBathrooms = property.bathrooms >= bathroomsRange[0] && property.bathrooms <= bathroomsRange[1];
    
    // Area filter
    const matchesArea = property.area >= areaRange[0] && property.area <= areaRange[1];
    
    return matchesSearch && matchesType && matchesStatus && 
      matchesPrice && matchesBedrooms && matchesBathrooms && matchesArea;
  });
  
  // Sort filtered properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'bedrooms-desc':
        return b.bedrooms - a.bedrooms;
      case 'area-desc':
        return b.area - a.area;
      default:
        return 0;
    }
  });
  
  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Handle property creation
  const handleCreateProperty = (data) => {
    // Create a new property
    const newPropertyObj = {
      ...data,
      id: properties.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featured: false,
      price: parseFloat(data.price),
      bedrooms: parseInt(data.bedrooms),
      bathrooms: parseFloat(data.bathrooms),
      area: parseInt(data.area),
      yearBuilt: parseInt(data.yearBuilt),
      agent: agents.find(agent => agent.id.toString() === data.agent),
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"], // Default images for demo
    };
    
    // Add the new property to the list
    setProperties([newPropertyObj, ...properties]);
    
    // Close the modal and reset form
    setCreateModalOpen(false);
    createFormMethods.reset();
  };
  
  // Handle property update
  const handleUpdateProperty = (data) => {
    // Update the property
    const updatedProperties = properties.map(p => 
      p.id === currentProperty.id ? {
        ...data,
        id: currentProperty.id,
        updatedAt: new Date().toISOString(),
        createdAt: currentProperty.createdAt,
        featured: currentProperty.featured,
        price: parseFloat(data.price),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseFloat(data.bathrooms),
        area: parseInt(data.area),
        yearBuilt: parseInt(data.yearBuilt),
        agent: agents.find(agent => agent.id.toString() === data.agent),
        images: currentProperty.images, // Keep the same images
      } : p
    );
    
    // Update the properties state
    setProperties(updatedProperties);
    
    // Close the modal
    setUpdateModalOpen(false);
  };
  
  // Handle property deletion
  const handleDeleteProperty = () => {
    // Filter out the property to be deleted
    const updatedProperties = properties.filter(p => p.id !== currentProperty.id);
    
    // Update the properties state
    setProperties(updatedProperties);
    
    // Close the modal
    setDeleteModalOpen(false);
  };
  
  // Open update modal with property data
  const openUpdateModal = (property) => {
    setCurrentProperty(property);
    
    // Set form values
    updateFormMethods.reset({
      title: property.title,
      address: property.address,
      price: property.price.toString(),
      status: property.status,
      type: property.type,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      yearBuilt: property.yearBuilt.toString(),
      description: property.description,
      features: property.features,
      agent: property.agent.id.toString(),
    });
    
    setUpdateModalOpen(true);
  };
  
  // Open view modal with property data
  const openViewModal = (property) => {
    setCurrentProperty(property);
    setCurrentImageIndex(0);
    setViewModalOpen(true);
  };
  
  // Open delete modal with property data
  const openDeleteModal = (property) => {
    setCurrentProperty(property);
    setDeleteModalOpen(true);
  };
  
  // Navigate to next image in view modal
  const nextImage = () => {
    if (currentProperty && currentProperty.images.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % currentProperty.images.length);
    }
  };
  
  // Navigate to previous image in view modal
  const prevImage = () => {
    if (currentProperty && currentProperty.images.length > 0) {
      setCurrentImageIndex((currentImageIndex - 1 + currentProperty.images.length) % currentProperty.images.length);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 5000000]);
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setBedroomsRange([0, 6]);
    setBathroomsRange([0, 6]);
    setAreaRange([0, 5000]);
    setSortOption('newest');
    setFiltersOpen(false);
  };
  
  // Toggle property type selection
  const togglePropertyType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  // Toggle property status selection
  const togglePropertyStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar component */}
      <Sidebar activePage="properties" />
      
      {/* Main content */}
      <div className="flex-1 pl-0 lg:pl-72">
        <main className="py-10">
          <div ref={topRef} className="px-4 sm:px-6 lg:px-8">
            
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Manage all your property listings
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <Button 
                  onClick={() => setCreateModalOpen(true)}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  Add Property
                </Button>
              </div>
            </div>
            
            {/* Search and filter bar */}
            <Card className="mb-6">
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
                      placeholder="Search properties..."
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
                    <div className="hidden sm:flex border-r border-slate-200 h-8 mx-1"></div>
                    <Button
                      variant={viewMode === 'grid' ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="p-2"
                    >
                      <Grid className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="p-2"
                    >
                      <List className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                
                {/* Advanced filters */}
                {filtersOpen && (
                  <>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Price Range */}
                      <div>
                        <Label htmlFor="price-range" className="mb-2 block">Price Range</Label>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm">{formatPrice(priceRange[0])}</span>
                          <span className="text-slate-500">-</span>
                          <span className="text-sm">{formatPrice(priceRange[1])}</span>
                        </div>
                        <div className="pt-4">
                          <Slider
                            defaultValue={[0, 5000000]}
                            max={5000000}
                            step={50000}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                        </div>
                      </div>
                      
                      {/* Property Type */}
                      <div>
                        <Label className="mb-2 block">Property Type</Label>
                        <div className="h-48 overflow-y-auto pr-2 space-y-2">
                          {propertyTypes.map((type) => (
                            <div key={type.value} className="flex items-center">
                              <Checkbox
                                id={`type-${type.value}`}
                                checked={selectedTypes.includes(type.value)}
                                onCheckedChange={() => togglePropertyType(type.value)}
                              />
                              <Label htmlFor={`type-${type.value}`} className="ml-2 text-sm">
                                {type.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Property Status */}
                      <div>
                        <Label className="mb-2 block">Status</Label>
                        <div className="space-y-2">
                          {propertyStatuses.map((status) => (
                            <div key={status.value} className="flex items-center">
                              <Checkbox
                                id={`status-${status.value}`}
                                checked={selectedStatuses.includes(status.value)}
                                onCheckedChange={() => togglePropertyStatus(status.value)}
                              />
                              <Label htmlFor={`status-${status.value}`} className="ml-2 text-sm">
                                {status.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Beds & Baths */}
                      <div className="space-y-4">
                        <div>
                          <Label className="mb-2 block">Bedrooms</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min={0}
                              max={10}
                              value={bedroomsRange[0]}
                              onChange={(e) => setBedroomsRange([parseInt(e.target.value), bedroomsRange[1]])}
                              className="w-20 text-sm"
                            />
                            <span className="text-slate-500">-</span>
                            <Input
                              type="number"
                              min={0}
                              max={10}
                              value={bedroomsRange[1]}
                              onChange={(e) => setBedroomsRange([bedroomsRange[0], parseInt(e.target.value)])}
                              className="w-20 text-sm"
                            />
                            <span className="text-sm text-slate-500">beds</span>
                          </div>
                        </div>
                        <div>
                          <Label className="mb-2 block">Bathrooms</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min={0}
                              max={10}
                              step={0.5}
                              value={bathroomsRange[0]}
                              onChange={(e) => setBathroomsRange([parseFloat(e.target.value), bathroomsRange[1]])}
                              className="w-20 text-sm"
                            />
                            <span className="text-slate-500">-</span>
                            <Input
                              type="number"
                              min={0}
                              max={10}
                              step={0.5}
                              value={bathroomsRange[1]}
                              onChange={(e) => setBathroomsRange([bathroomsRange[0], parseFloat(e.target.value)])}
                              className="w-20 text-sm"
                            />
                            <span className="text-sm text-slate-500">baths</span>
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
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="bedrooms-desc">Most Bedrooms</SelectItem>
                            <SelectItem value="area-desc">Largest Area</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Property count */}
            <div className="mb-6">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{sortedProperties.length}</span> properties
              </p>
            </div>
            
            {/* Property Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={property.images[0]} 
                        alt={property.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        <Badge variant={propertyStatuses.find(status => status.value === property.status)?.color || "default"}>
                          {property.status}
                        </Badge>
                        {property.featured && (
                          <Badge variant="outline" className="bg-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openViewModal(property)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openUpdateModal(property)}>Edit Property</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteModal(property)} className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
                            {property.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600 line-clamp-1">
                            {property.address}
                          </p>
                        </div>
                        <div className="text-xl font-bold text-indigo-600">
                          {formatPrice(property.price)}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Home className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.area} sq ft</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-4 pt-4 border-t border-slate-100 justify-between">
                        <span className="text-xs text-slate-500">
                          {property.type}
                        </span>
                        <span className="text-xs text-slate-500">
                          Listed: {new Date(property.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 bg-slate-50 border-t border-slate-100">
                      <div className="grid grid-cols-3 w-full">
                        <Button 
                          variant="ghost" 
                          onClick={() => openViewModal(property)}
                          className="rounded-none py-3"
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => openUpdateModal(property)}
                          className="rounded-none border-l border-r border-slate-200 py-3 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => openDeleteModal(property)}
                          className="rounded-none py-3 text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Property List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-60 h-48">
                        <img 
                          src={property.images[0]} 
                          alt={property.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                          <Badge variant={propertyStatuses.find(status => status.value === property.status)?.color || "default"}>
                            {property.status}
                          </Badge>
                          {property.featured && (
                            <Badge variant="outline" className="bg-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                              {property.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">
                              {property.address}
                            </p>
                          </div>
                          <div className="text-xl font-bold text-indigo-600">
                            {formatPrice(property.price)}
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.bedrooms} beds</span>
                          </div>
                          <div className="flex items-center">
                            <Home className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.bathrooms} baths</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.area} sq ft</span>
                          </div>
                          <div className="flex items-center">
                            <Building className="h-4 w-4 text-slate-400" />
                            <span className="ml-1.5 text-sm text-slate-700">{property.type}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-slate-600 line-clamp-2">{property.description}</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {property.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="bg-slate-100">
                              {feature}
                            </Badge>
                          ))}
                          {property.features.length > 3 && (
                            <Badge variant="outline" className="bg-slate-100">
                              +{property.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <div className="flex sm:flex-col justify-between p-4 border-t sm:border-t-0 sm:border-l border-slate-200 bg-slate-50">
                        <div className="text-sm text-slate-500">
                          <div>Listed: {new Date(property.createdAt).toLocaleDateString()}</div>
                          <div className="mt-1">Agent: {property.agent.name}</div>
                        </div>
                        <div className="flex sm:flex-col gap-2 sm:mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openViewModal(property)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                            onClick={() => openUpdateModal(property)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100"
                            onClick={() => openDeleteModal(property)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Empty state */}
            {sortedProperties.length === 0 && (
              <Card className="p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Building className="h-6 w-6 text-slate-600" />
                </div>
                <CardTitle className="mt-4">No properties found</CardTitle>
                <CardDescription className="mt-2">
                  Try adjusting your search or filters to find what you're looking for.
                </CardDescription>
                <div className="mt-6">
                  <Button onClick={resetFilters}>
                    Reset filters
                  </Button>
                </div>
              </Card>
            )}
            
            {/* Pagination */}
            {sortedProperties.length > 0 && (
              <div className="mt-8 flex justify-between items-center">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-medium">{sortedProperties.length}</span> of{' '}
                  <span className="font-medium">{properties.length}</span> properties
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={scrollToTop}>
                    Back to top
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Create Property Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new property listing.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={createFormMethods.handleSubmit(handleCreateProperty)}>
            <Tabs defaultValue="basic" className="mt-5">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="features">Features & Photos</TabsTrigger>
              </TabsList>
              
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Modern Waterfront Villa"
                      {...createFormMethods.register("title", { required: "Title is required" })}
                    />
                    {createFormMethods.formState.errors.title && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.title.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      placeholder="e.g. 123 Coastal Highway, Miami, FL 33101"
                      {...createFormMethods.register("address", { required: "Address is required" })}
                    />
                    {createFormMethods.formState.errors.address && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                        $
                      </span>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        className="pl-7"
                        {...createFormMethods.register("price", { 
                          required: "Price is required",
                          min: { value: 0, message: "Price must be positive" } 
                        })}
                      />
                    </div>
                    {createFormMethods.formState.errors.price && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.price.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Controller
                      control={createFormMethods.control}
                      name="status"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyStatuses.map((status) => (
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
                    <Label htmlFor="type">Property Type *</Label>
                    <Controller
                      control={createFormMethods.control}
                      name="type"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="agent">Assign Agent *</Label>
                    <Controller
                      control={createFormMethods.control}
                      name="agent"
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
                  </div>
                </div>
              </TabsContent>
              
              {/* Property Details Tab */}
              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms *</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="0"
                      {...createFormMethods.register("bedrooms", { 
                        required: "Bedrooms are required",
                        min: { value: 0, message: "Cannot be negative" } 
                      })}
                    />
                    {createFormMethods.formState.errors.bedrooms && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.bedrooms.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms *</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      {...createFormMethods.register("bathrooms", { 
                        required: "Bathrooms are required",
                        min: { value: 0, message: "Cannot be negative" } 
                      })}
                    />
                    {createFormMethods.formState.errors.bathrooms && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.bathrooms.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq ft) *</Label>
                    <Input
                      id="area"
                      type="number"
                      min="0"
                      {...createFormMethods.register("area", { 
                        required: "Area is required",
                        min: { value: 0, message: "Cannot be negative" } 
                      })}
                    />
                    {createFormMethods.formState.errors.area && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.area.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      min="1800"
                      max={new Date().getFullYear()}
                      {...createFormMethods.register("yearBuilt", { 
                        min: { value: 1800, message: "Year must be 1800 or later" },
                        max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                      })}
                    />
                    {createFormMethods.formState.errors.yearBuilt && (
                      <p className="text-sm text-red-500">{createFormMethods.formState.errors.yearBuilt.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Describe the property..."
                    {...createFormMethods.register("description", { required: "Description is required" })}
                  />
                  {createFormMethods.formState.errors.description && (
                    <p className="text-sm text-red-500">{createFormMethods.formState.errors.description.message}</p>
                  )}
                </div>
              </TabsContent>
              
              {/* Features & Photos Tab */}
              <TabsContent value="features" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {propertyFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Controller
                          control={createFormMethods.control}
                          name="features"
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
                
                <div className="space-y-2">
                  <Label>Photos</Label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload images</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    For demo purposes, sample images will be used.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Property</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Update Property Modal */}
      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the property details.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={updateFormMethods.handleSubmit(handleUpdateProperty)}>
            <Tabs defaultValue="basic" className="mt-5">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="features">Features & Photos</TabsTrigger>
              </TabsList>
              
              {/* Same form fields as create modal but using updateFormMethods */}
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Property Title *</Label>
                    <Input
                      id="edit-title"
                      placeholder="e.g. Modern Waterfront Villa"
                      {...updateFormMethods.register("title", { required: "Title is required" })}
                    />
                    {updateFormMethods.formState.errors.title && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.title.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-address">Address *</Label>
                    <Input
                      id="edit-address"
                      placeholder="e.g. 123 Coastal Highway, Miami, FL 33101"
                      {...updateFormMethods.register("address", { required: "Address is required" })}
                    />
                    {updateFormMethods.formState.errors.address && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Price *</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                        $
                      </span>
                      <Input
                        id="edit-price"
                        type="number"
                        placeholder="0"
                        className="pl-7"
                        {...updateFormMethods.register("price", { 
                          required: "Price is required",
                          min: { value: 0, message: "Price must be positive" } 
                        })}
                      />
                    </div>
                    {updateFormMethods.formState.errors.price && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.price.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status *</Label>
                    <Controller
                      control={updateFormMethods.control}
                      name="status"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyStatuses.map((status) => (
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
                    <Label htmlFor="edit-type">Property Type *</Label>
                    <Controller
                      control={updateFormMethods.control}
                      name="type"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-agent">Assign Agent *</Label>
                    <Controller
                      control={updateFormMethods.control}
                      name="agent"
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
                  </div>
                </div>
              </TabsContent>
              
              {/* Property Details Tab */}
              <TabsContent value="details" className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="edit-bedrooms">Bedrooms *</Label>
                    <Input
                      id="edit-bedrooms"
                      type="number"
                      min="0"
                      {...updateFormMethods.register("bedrooms", { 
                        required: "Bedrooms are required",
                        min: { value: 0, message: "Cannot be negative" } 
                      })}
                    />
                    {updateFormMethods.formState.errors.bedrooms && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.bedrooms.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-bathrooms">Bathrooms *</Label>
                    <Input
                      id="edit-bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      {...updateFormMethods.register("bathrooms", { 
                        required: "Bathrooms are required",
                        min: { value: 0, message: "Cannot be negative" } 
                      })}
                    />
                    {updateFormMethods.formState.errors.bathrooms && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.bathrooms.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-area">Area (sq ft) *</Label>
                    <Input
                      id="edit-area"
                      type="number"
                      min="0"
                      {...updateFormMethods.register("area", { 
                        required: "Area is required",
                        min: { value: 0, message: "Cannot be negative" } 
                      })}
                    />
                    {updateFormMethods.formState.errors.area && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.area.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-yearBuilt">Year Built</Label>
                    <Input
                      id="edit-yearBuilt"
                      type="number"
                      min="1800"
                      max={new Date().getFullYear()}
                      {...updateFormMethods.register("yearBuilt", { 
                        min: { value: 1800, message: "Year must be 1800 or later" },
                        max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                      })}
                    />
                    {updateFormMethods.formState.errors.yearBuilt && (
                      <p className="text-sm text-red-500">{updateFormMethods.formState.errors.yearBuilt.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description *</Label>
                  <Textarea
                    id="edit-description"
                    rows={4}
                    placeholder="Describe the property..."
                    {...updateFormMethods.register("description", { required: "Description is required" })}
                  />
                  {updateFormMethods.formState.errors.description && (
                    <p className="text-sm text-red-500">{updateFormMethods.formState.errors.description.message}</p>
                  )}
                </div>
              </TabsContent>
              
              {/* Features & Photos Tab */}
              <TabsContent value="features" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {propertyFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Controller
                          control={updateFormMethods.control}
                          name="features"
                          render={({ field }) => (
                            <Checkbox
                              id={`edit-feature-${feature}`}
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
                        <Label htmlFor={`edit-feature-${feature}`} className="text-sm">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Current Photos */}
                {currentProperty && (
                  <div className="space-y-2">
                    <Label>Current Photos</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {currentProperty.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={image} 
                            alt={`Property ${index + 1}`} 
                            className="h-24 w-full object-cover rounded-md" 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/80 hover:bg-white"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add Photos */}
                <div className="space-y-2">
                  <Label>Add Photos</Label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label
                          htmlFor="file-upload-update"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload images</span>
                          <input id="file-upload-update" name="file-upload-update" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setUpdateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Property Modal */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{currentProperty?.title}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProperty} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* View Property Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentProperty?.title}</DialogTitle>
            <DialogDescription>
              {currentProperty?.address}
            </DialogDescription>
          </DialogHeader>
          
          {currentProperty && (
            <div className="mt-4">
              {/* Property Image Slider */}
              <div className="relative">
                <img 
                  src={currentProperty.images[currentImageIndex]} 
                  alt={currentProperty.title} 
                  className="w-full h-64 md:h-96 object-cover rounded-lg" 
                />
                
                {/* Image navigation arrows */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {currentProperty.images.length}
                </div>
              </div>
              
              {/* Property Details */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{currentProperty.title}</h2>
                      <p className="mt-1 text-slate-600">{currentProperty.address}</p>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {formatPrice(currentProperty.price)}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-slate-900">Description</h3>
                    <p className="mt-2 text-slate-600">{currentProperty.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-slate-900">Features</h3>
                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
                      {currentProperty.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="ml-2 text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status</span>
                      <Badge variant={propertyStatuses.find(status => status.value === currentProperty.status)?.color || "default"}>
                        {currentProperty.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Property Type</span>
                      <span className="font-medium">{currentProperty.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Bedrooms</span>
                      <span className="font-medium">{currentProperty.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Bathrooms</span>
                      <span className="font-medium">{currentProperty.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Area</span>
                      <span className="font-medium">{currentProperty.area} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Year Built</span>
                      <span className="font-medium">{currentProperty.yearBuilt}</span>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Listing Agent</h4>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 bg-indigo-100 text-indigo-600">
                          <AvatarFallback>{currentProperty.agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{currentProperty.agent.name}</p>
                          <div className="flex mt-1 space-x-4">
                            <a href={`mailto:${currentProperty.agent.email}`} className="text-xs text-indigo-600 hover:text-indigo-500">
                              <Mail className="inline-block h-3 w-3 mr-1" />
                              Email
                            </a>
                            <a href={`tel:${currentProperty.agent.phone}`} className="text-xs text-indigo-600 hover:text-indigo-500">
                              <Phone className="inline-block h-3 w-3 mr-1" />
                              Call
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Map className="mr-2 h-4 w-4" />
                        View Map
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setViewModalOpen(false);
                    openUpdateModal(currentProperty);
                  }}
                  className="text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Property
                </Button>
                <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyPage;