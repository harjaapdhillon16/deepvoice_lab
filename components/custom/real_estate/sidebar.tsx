import React, { useState } from 'react';
import {
    Home,
    Users,
    Building,
    PhoneCall,
    Calendar,
    FileText,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X,
    Bell,
    MessageSquare,
    Search,
    ChevronRight,
    ChevronDown,
    Sparkles
} from 'lucide-react';

const Sidebar = ({ activePage = 'dashboard' }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Notifications demo data
    const notifications = [
        {
            id: 1,
            type: 'meeting',
            message: 'Client meeting with John Smith in 30 minutes',
            time: '30m',
            read: false
        },
        {
            id: 2,
            type: 'lead',
            message: 'New lead interested in Ocean View property',
            time: '2h',
            read: false
        },
        {
            id: 3,
            type: 'contract',
            message: 'Contract for 123 Main St needs review',
            time: '1d',
            read: true
        }
    ];

    const navigationItems = [
        { name: 'Dashboard', icon: <Home size={20} />, href: '/dashboard', active: activePage === 'dashboard' },
        { name: 'Properties', icon: <Building size={20} />, href: '/dashboard/properties', active: activePage === 'properties' },
        { name: 'Leads', icon: <Users size={20} />, href: '/dashboard/leads', active: activePage === 'leads' },
        { name: 'Calendar', icon: <Calendar size={20} />, href: '/dashboard/calendar', active: activePage === 'calendar' },
        { name: 'Contracts', icon: <FileText size={20} />, href: '/dashboard/contracts', active: activePage === 'contracts' },
        { name: 'AI Calls', icon: <PhoneCall size={20} />, href: '/dashboard/calls', active: activePage === 'calls' },
    ];

    const bottomNavigationItems = [
        { name: 'Settings', icon: <Settings size={20} />, href: '/settings', active: activePage === 'settings' },
        { name: 'Help & Support', icon: <HelpCircle size={20} />, href: '/help', active: activePage === 'help' },
    ];

    return (
        <>
            {/* Mobile menu backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}

            {/* Mobile header */}
            <div className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-slate-700 lg:hidden"
                    onClick={() => setMobileOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="flex flex-1 items-center justify-between gap-x-4">
                    <div className="flex items-center">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PropertyPro</span>
                        <div className="flex items-center ml-1">
                            <span className="text-base font-semibold text-slate-500">AI</span>
                            <Sparkles size={14} className="ml-1 text-amber-400" />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4">
                        <div className="relative">
                            <button
                                type="button"
                                className="relative rounded-full bg-white p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                            >
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" aria-hidden="true" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>

                            {/* Mobile Notifications dropdown */}
                            {notificationsOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-4 py-2 border-b border-slate-200">
                                        <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`px-4 py-3 ${!notification.read ? 'bg-indigo-50' : ''} hover:bg-slate-50`}
                                            >
                                                <div className="flex justify-between">
                                                    <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-slate-500">{notification.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-2 border-t border-slate-200">
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            View all notifications
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                type="button"
                                className="flex items-center gap-x-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                                    JS
                                </div>
                            </button>

                            {/* Mobile User dropdown */}
                            {userMenuOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-4 py-3 border-b border-slate-200">
                                        <p className="text-sm font-medium text-slate-900">John Smith</p>
                                        <p className="text-xs text-slate-500 truncate">john@example.com</p>
                                    </div>
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Your Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Account Settings</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Sign out</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar for desktop */}
            <div
                className={`fixed bg-white inset-y-0 z-50 flex flex-col transition-all duration-300 ease-in-out
                  ${mobileOpen ? 'left-0' : '-left-80 lg:left-0'} 
                  ${collapsed ? 'lg:w-20' : 'lg:w-72'}
                  backdrop-blur-lg lg:border-r lg:border-slate-200/70`}
            >
                <div className="flex grow flex-col gap-y-1 px-6 py-4">
                    <div className="flex items-center justify-between shrink-0">
                        {!collapsed && (
                            <div className="flex items-center">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PropertyPro</span>
                                <div className="flex items-center ml-1">
                                    <span className="text-lg font-semibold text-slate-500">AI</span>
                                    <Sparkles size={14} className="ml-1 text-amber-400" />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            {/* Mobile close button */}
                            <button
                                type="button"
                                className="lg:hidden -m-2.5 p-2.5 text-slate-700 hover:text-slate-900"
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Desktop collapse button */}
                           
                        </div>
                    </div>

                    {/* Search */}
                    {!collapsed && (
                        <div className="my-4 relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="search"
                                placeholder="Search..."
                                className="block w-full rounded-lg border-0 py-2 pl-10 text-slate-900 bg-white/60 backdrop-blur-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    )}

                    {/* User */}
                    <div className={`flex ${collapsed ? 'justify-center' : 'items-center'} rounded-lg py-4 px-2 ${collapsed ? 'bg-white/60 backdrop-blur-sm mb-4' : 'bg-white/40 backdrop-blur-sm mb-6'}`}>
                        {collapsed ? (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                                JS
                            </div>
                        ) : (
                            <>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                                    JS
                                </div>
                                <div className="ml-3 min-w-0 flex-1">
                                    <div className="text-sm font-medium text-slate-900 truncate">John Smith</div>
                                    <div className="text-xs text-slate-500 truncate">Broker / Owner</div>
                                </div>
                                <button className="flex-shrink-0 p-1 rounded-full hover:bg-slate-100">
                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigationItems.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={`
                                                    group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium
                                                    transition-all duration-150 ease-in-out
                                                    ${item.active
                                                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                                                        : 'text-slate-700 hover:bg-white/70 hover:text-indigo-600'
                                                    } ${collapsed ? 'justify-center' : ''}
                                                `}
                                            >
                                                <div className={`flex items-center justify-center ${item.active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-500'}`}>
                                                    {item.icon}
                                                </div>
                                                {!collapsed && <span>{item.name}</span>}
                                                {!collapsed && item.active && (
                                                    <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                                                )}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className="mt-auto">
                                <ul role="list" className="-mx-2 space-y-1">
                                    {bottomNavigationItems.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={`
                                                    group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium
                                                    transition-all duration-150 ease-in-out
                                                    ${item.active
                                                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                                                        : 'text-slate-700 hover:bg-white/70 hover:text-indigo-600'
                                                    } ${collapsed ? 'justify-center' : ''}
                                                `}
                                            >
                                                <div className={`flex items-center justify-center ${item.active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-500'}`}>
                                                    {item.icon}
                                                </div>
                                                {!collapsed && <span>{item.name}</span>}
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <a
                                            href="/logout"
                                            className={`
                                                group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium
                                                transition-all duration-150 ease-in-out
                                                text-slate-700 hover:bg-white/70 hover:text-red-500
                                                ${collapsed ? 'justify-center' : ''}
                                            `}
                                        >
                                            <div className="flex items-center justify-center text-slate-500 group-hover:text-red-500">
                                                <LogOut size={20} />
                                            </div>
                                            {!collapsed && <span>Logout</span>}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;