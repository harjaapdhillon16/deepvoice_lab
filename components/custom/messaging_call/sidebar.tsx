// @ts-nocheck

'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, UserPlus, Menu, Globe, ChevronRight, Settings, LifeBuoy, LogOut } from "lucide-react";
import { useTranslation } from "next-i18next";

// Import shadcn UI components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/lib/utils";

export default function Sidebar() {
  const { t, i18n } = useTranslation("common");
  const [currentPath, setCurrentPath] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  // Use the window object to get the current route
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Language options for the dropdown
  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "es", label: "Español", flag: "🇪🇸" }
  ];
  const selectedLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Navigation items for the sidebar
  const mainNavItems = [
    {
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
      label: t("sidebar.dashboard", "Dashboard")
    },
    {
      href: "/dashboard/clients",
      icon: <Users className="w-5 h-5" />,
      label: t("sidebar.clients", "Clients")
    },
    {
      href: "/dashboard/leads",
      icon: <UserPlus className="w-5 h-5" />,
      label: t("sidebar.leads", "Leads")
    }
  ];

  // Settings and support items
  const bottomNavItems = [
    {
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
      label: t("sidebar.settings", "Settings")
    },
    {
      href: "/dashboard/support",
      icon: <LifeBuoy className="w-5 h-5" />,
      label: t("sidebar.support", "Support")
    }
  ];

  return (
    <aside
      className={`${collapsed ? "w-16" : "w-64"
        } h-screen bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out flex flex-col justify-between shadow-xl relative overflow-hidden`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-950 opacity-50"></div>

      {/* Content container (on top of gradient) */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header and Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          {!collapsed ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3">
                <span className="text-gray-800 font-bold text-xl">F</span>
              </div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                Fidelio AI
              </h2>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mx-auto">
              <span className="text-gray-800 font-bold text-xl">F</span>
            </div>
          )}
          <Button
            onClick={() => setCollapsed(!collapsed)}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-700/50 text-gray-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-grow py-6">
          <div className={`${!collapsed ? "px-4 mb-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" : "text-center mb-2"}`}>
            {!collapsed ? t("sidebar.main", "Main") : "•••"}
          </div>
          <ul className="space-y-1 px-2">
            {mainNavItems.map((item, index) => {
              const isActive = currentPath === item.href;
              return (
                <TooltipProvider key={index} delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li>
                        <Link href={item.href} legacyBehavior>
                          <a
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all group ${isActive
                                ? "bg-white/10 backdrop-blur-sm text-white shadow-md border border-white/10"
                                : "hover:bg-gray-800/50 text-gray-200 hover:text-white"
                              }`}
                          >
                            <div className={`${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                              {item.icon}
                            </div>
                            {!collapsed && (
                              <span>{item.label}</span>
                            )}
                            {!collapsed && isActive && (
                              <ChevronRight className="ml-auto h-4 w-4" />
                            )}
                          </a>
                        </Link>
                      </li>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </ul>

          {/* Settings and Support Section */}
          <div className={`mt-8 ${!collapsed ? "px-4 mb-2 text-xs font-semibold text-gray-300 uppercase tracking-wider" : "text-center mb-2"}`}>
            {!collapsed ? t("sidebar.system", "System") : "•••"}
          </div>
          <ul className="space-y-1 px-2">
            {bottomNavItems.map((item, index) => {
              const isActive = currentPath === item.href;
              return (
                <TooltipProvider key={index} delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li>
                        <Link href={item.href} legacyBehavior>
                          <a
                            className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all group ${isActive
                                ? "bg-white/10 backdrop-blur-sm text-white shadow-md border border-white/10"
                                : "hover:bg-gray-800/50 text-gray-200 hover:text-white"
                              }`}
                          >
                            <div className={`${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                              {item.icon}
                            </div>
                            {!collapsed && (
                              <span>{item.label}</span>
                            )}
                            {!collapsed && isActive && (
                              <ChevronRight className="ml-auto h-4 w-4" />
                            )}
                          </a>
                        </Link>
                      </li>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section with Language Switcher and Logout */}
        <div className="p-4 border-t border-gray-700/50 space-y-3">
          {/* Language Switcher Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${collapsed ? "w-full justify-center p-2" : "w-full justify-between"
                  } bg-gray-800/40 border-gray-700/50 hover:bg-gray-700 hover:border-gray-600 text-gray-200`}
              >
                {collapsed ? (
                  <Globe className="h-5 w-5" />
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>
                        {languages.find(lang => lang.value === selectedLanguage)?.label || "Language"}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700 text-gray-100">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.value}
                  onSelect={() => changeLanguage(lang.value)}
                  className={`text-sm cursor-pointer ${selectedLanguage === lang.value
                      ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white"
                      : "hover:bg-gray-700 text-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logout Button */}
          {!collapsed ? (
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
              onClick={() => {
                supabase.auth.signOut()
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t("sidebar.logout", "Log Out")}
            </Button>
          ) : (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={()=>{
                      supabase.auth.signOut()
                    }}
                    className="w-full justify-center text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                  {t("sidebar.logout", "Log Out")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </aside>
  );
}