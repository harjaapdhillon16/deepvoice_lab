'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Users, UserPlus, Menu, Globe, ChevronRight } from "lucide-react";
import { useTranslation } from "next-i18next";

// Import shadcn UI components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const navItems = [
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

  return (
    <aside 
      className={`${
        collapsed ? "w-16" : "w-64"
      } h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 transition-all duration-300 ease-in-out flex flex-col justify-between shadow-xl`}
    >
      {/* Header and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h2 className="text-xl font-bold text-teal-500 text-transparent">
            AI Product
          </h2>
        )}
        <Button 
          onClick={() => setCollapsed(!collapsed)} 
          variant="ghost" 
          size="icon"
          className="rounded-full hover:bg-gray-700 text-gray-300"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow py-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item, index) => {
            const isActive = currentPath === item.href;
            return (
              <TooltipProvider key={index} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <li>
                      <Link href={item.href} legacyBehavior>
                        <a
                          className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all group ${
                            isActive 
                              ? "bg-emerald-500 text-white shadow-md" 
                              : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                          }`}
                        >
                          <div className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
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
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </ul>
      </nav>

      {/* Language Switcher Dropdown */}
      <div className="p-4 border-t border-gray-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`${
                collapsed ? "w-full justify-center p-2" : "w-full justify-between"
              } bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-gray-200`}
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
                className={`text-sm cursor-pointer ${
                  selectedLanguage === lang.value 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
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
      </div>
    </aside>
  );
}