// @ts-nocheck

'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, X, Menu, Home, Users, DollarSign, BarChart2, MessageSquare, Star, Mail, Phone, ArrowRight, ArrowUpRight, Plus, Minus, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [hoverFeature, setHoverFeature] = useState(null);
  const [activePlan, setActivePlan] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaqs, setExpandedFaqs] = useState({});
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const heroRef = useRef(null);
  const testimonialIntervalRef = useRef(null);

  // Mouse follower cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(testimonialIntervalRef.current);
  }, []);

  // Parallax effect for hero section
  const calculateHeroTransform = () => {
    if (!heroRef.current) return {};
    const scrollValue = Math.min(scrollY, 500);
    const opacity = 1 - scrollValue / 500;
    const translateY = scrollValue * 0.5;

    return {
      opacity: Math.max(0, opacity),
      transform: `translateY(${translateY}px)`
    };
  };

  // Features data with modern icons as SVG
  const features = [
    {
      icon: <Home className="w-10 h-10 text-indigo-600" />,
      title: "Intelligent Property Management",
      description: "AI-powered listing management with predictive market analysis and virtual staging capabilities.",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      title: "Advanced Lead Intelligence",
      description: "Behavioral tracking with smart segmentation and automated nurturing sequences based on engagement patterns.",
      color: "from-fuchsia-500 to-purple-600"
    },
    {
      icon: <DollarSign className="w-10 h-10 text-emerald-600" />,
      title: "Frictionless Transaction Engine",
      description: "Paperless closings with blockchain-verified contracts and integrated escrow management for seamless deals.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-amber-600" />,
      title: "Real-time Performance Metrics",
      description: "Dynamic dashboards with predictive revenue forecasting and team performance benchmarking.",
      color: "from-orange-500 to-amber-600"
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-rose-600" />,
      title: "Omni-channel Client Hub",
      description: "Unified messaging across email, SMS, WhatsApp and social with AI response suggestions and sentiment analysis.",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: <Star className="w-10 h-10 text-sky-600" />,
      title: "Immersive Marketing Suite",
      description: "3D virtual tours, AI-copywriting, and multi-platform content distribution with performance tracking.",
      color: "from-cyan-500 to-sky-600"
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Essential",
      price: "$49",
      period: "per month",
      description: "Perfect for individual agents",
      features: [
        "50 active property listings",
        "Basic lead tracking",
        "Email notifications",
        "Mobile app access",
        "5 team members"
      ],
      cta: "Start Free Trial",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing agencies",
      features: [
        "Unlimited property listings",
        "Advanced lead management",
        "Automated follow-ups",
        "Performance analytics",
        "25 team members",
        "Marketing toolkit"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large brokerages",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "White-label solution",
        "API access",
        "Dedicated account manager",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "PropertyPro has completely transformed how we manage our leads. We've seen a 40% increase in conversions since implementing the platform.",
      author: "Sarah Johnson",
      role: "Managing Broker, Urban Homes Realty",
      image: "/api/placeholder/100/100",
      rating: 5
    },
    {
      quote: "The automation features have saved our team countless hours. What used to take days now happens in minutes. I can't imagine running our brokerage without it.",
      author: "Michael Chen",
      role: "Sales Director, Elite Properties",
      image: "/api/placeholder/100/100",
      rating: 5
    },
    {
      quote: "The analytics dashboard gives me a clear picture of our sales pipeline and helps us forecast revenue with remarkable accuracy.",
      author: "Jennifer Patel",
      role: "CEO, Landmark Real Estate Group",
      image: "/api/placeholder/100/100",
      rating: 5
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How long does it take to get started?",
      answer: "Most clients are up and running within 48 hours. Our onboarding team provides comprehensive training and helps with data migration from your existing systems."
    },
    {
      question: "Can I import my existing leads and properties?",
      answer: "Absolutely! We provide tools to easily import your data from CSV files, Excel spreadsheets, or directly from other popular CRM platforms."
    },
    {
      question: "Is there a long-term contract?",
      answer: "No. All our plans are month-to-month with no long-term commitment required. We also offer discounted annual plans if you prefer."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include 24/7 email support and access to our knowledge base. Professional and Enterprise plans also include priority phone support and dedicated account managers."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFeatureHover = (index) => {
    setHoverFeature(index);
    setCursorText('Explore');
  };

  const handleFeatureLeave = () => {
    setHoverFeature(null);
    setCursorText('');
  };

  const handlePricingHover = () => {
    setCursorText('Choose');
  };

  const handlePricingLeave = () => {
    setCursorText('');
  };

  const handleCallToActionHover = () => {
    setCursorText('Get Started');
  };

  const handleCallToActionLeave = () => {
    setCursorText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 overflow-hidden">
      {/* Custom cursor */}
      {showCursor && (
        <div
          className={`fixed pointer-events-none z-50 flex items-center justify-center transition-all duration-100 ${cursorText ? 'h-24 w-24 rounded-full bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30' : 'h-6 w-6 rounded-full bg-indigo-500'}`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {cursorText && (
            <span className="text-indigo-700 text-sm font-medium">{cursorText}</span>
          )}
        </div>
      )}

      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden opacity-30 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div>
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PropertyPro</span>
                  <span className="ml-1 text-xl font-semibold text-slate-500">AI</span>
                </div>
                <a target='_blank' href="https://www.primedepthlabs.com/">Powered by Prime Depth Labs</a>
              </div>

              <div className="hidden md:ml-10 md:flex md:space-x-10">
                <a href="#home" className={`text-sm font-medium ${activeSection === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'} transition-colors duration-200`}>
                  Home
                </a>
                <a href="#features" className={`text-sm font-medium ${activeSection === 'features' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'} transition-colors duration-200`}>
                  Features
                </a>
                <a href="#pricing" className={`text-sm font-medium ${activeSection === 'pricing' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'} transition-colors duration-200`}>
                  Pricing
                </a>
                <a href="#testimonials" className={`text-sm font-medium ${activeSection === 'testimonials' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'} transition-colors duration-200`}>
                  Testimonials
                </a>
                <a href="#faq" className={`text-sm font-medium ${activeSection === 'faq' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'} transition-colors duration-200`}>
                  FAQ
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                className="group relative overflow-hidden ml-8 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30"
                onMouseEnter={handleCallToActionHover}
                onMouseLeave={handleCallToActionLeave}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-slate-100">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <a
                href="#home"
                className={`block py-3 text-base font-medium ${activeSection === 'home' ? 'text-indigo-600' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className={`block py-3 text-base font-medium ${activeSection === 'features' ? 'text-indigo-600' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={`block py-3 text-base font-medium ${activeSection === 'pricing' ? 'text-indigo-600' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className={`block py-3 text-base font-medium ${activeSection === 'testimonials' ? 'text-indigo-600' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className={`block py-3 text-base font-medium ${activeSection === 'faq' ? 'text-indigo-600' : 'text-slate-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="block w-full mt-4 text-center py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate/[0.05] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={heroRef} style={calculateHeroTransform()} className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 flex flex-col justify-center mb-12 lg:mb-0">
              <div className="flex items-center space-x-2 mb-6">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded-full">Next Gen Platform</span>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 rounded-full">AI-Powered</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900">
                <span className="block">Revolutionize Your</span>
                <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Real Estate Business
                </span>
              </h1>

              <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl">
                The all-in-one intelligent platform that transforms leads into clients and properties into profits with AI-driven insights and automation.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#contact"
                  className="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-center shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-300"
                  onMouseEnter={handleCallToActionHover}
                  onMouseLeave={handleCallToActionLeave}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Using
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="#features"
                  className="px-8 py-4 rounded-full bg-white text-slate-700 font-medium text-center border border-slate-200 hover:border-indigo-200 hover:bg-slate-50 transition-all duration-300"
                >
                  Discover Features
                </a>
              </div>

              <div className="mt-8 flex items-center text-slate-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-medium text-white shadow-lg">TH</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-medium text-white shadow-lg">SP</div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-medium text-white shadow-lg">JM</div>
                </div>
                <div className="ml-4 text-sm">
                  <span className="font-medium text-slate-700">500+</span> agents using PropertyPro AI
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-full w-full flex items-center justify-center">
                {/* 3D Floating Dashboard Mockup */}
                <div className="relative w-full max-w-2xl perspective-1000">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-200 transform rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1565402170291-8491f14678db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="PropertyPro AI Dashboard"
                      className="w-full h-auto"
                    />
                    {/* Floating UI elements */}
                    <div className="absolute top-5 left-5 p-3 bg-white/80 backdrop-blur-md rounded-lg text-slate-700 text-sm z-20 shadow-lg transform hover:-translate-y-1 transition-transform">
                      <div className="flex items-center">
                        <BarChart2 className="w-4 h-4 mr-2 text-indigo-600" />
                        <span>Lead Conversion: <span className="text-green-600">+28%</span></span>
                      </div>
                    </div>
                    <div className="absolute bottom-5 right-5 p-3 bg-white/80 backdrop-blur-md rounded-lg text-slate-700 text-sm z-20 shadow-lg transform hover:-translate-y-1 transition-transform">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-purple-600" />
                        <span>Active Leads: <span className="font-bold">342</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-blue-500/10 backdrop-blur-xl rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-purple-500/10 backdrop-blur-xl rounded-full"></div>
                <div className="absolute -bottom-6 right-1/3 w-24 h-24 bg-pink-500/10 backdrop-blur-xl rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-slate-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate/[0.03] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-16">
            <h2 className="inline-block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wider mb-3">Features</h2>
            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Intelligent Tools for Modern Agents
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600">
              Our AI-driven platform delivers the next generation of real estate technology with powerful tools designed for today's competitive market.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${hoverFeature === index ? 'scale-105 z-10' : 'scale-100 z-0'}`}
                onMouseEnter={() => handleFeatureHover(index)}
                onMouseLeave={handleFeatureLeave}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: hoverFeature === index ? 'translateZ(20px)' : 'translateZ(0px)'
                }}
              >
                <div className="h-full p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl border border-slate-100 hover:border-indigo-100 transition-all duration-300 relative z-10">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-indigo-50 transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 relative bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate/[0.03] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-16">
            <h2 className="inline-block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wider mb-3">Pricing</h2>
            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Value-driven Pricing
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600">
              Choose the plan that works best for your business needs with transparent, straightforward pricing.
            </p>
          </div>

          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-4 lg:space-x-8 justify-center items-center">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`w-full md:w-96 ${activePlan === index ? 'md:scale-110 z-10' : 'scale-100 z-0'} transition-all duration-500`}
                onMouseEnter={() => {
                  setActivePlan(index);
                  handlePricingHover();
                }}
                onMouseLeave={handlePricingLeave}
              >
                <div className={`h-full rounded-3xl bg-white shadow-lg hover:shadow-xl ${activePlan === index ? 'border-2 border-indigo-500 shadow-xl shadow-indigo-100' : 'border border-slate-100'} overflow-hidden transition-all duration-300`}>
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold ${activePlan === index ? 'text-indigo-600' : 'text-slate-800'} transition-colors duration-300`}>{plan.name}</h3>
                    <p className="mt-2 text-slate-600 h-12">{plan.description}</p>
                    <div className="mt-6">
                      <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                      <span className="text-slate-500 ml-2">{plan.period}</span>
                    </div>

                    <a
                      href="#contact"
                      className={`mt-8 block w-full py-3 px-6 rounded-xl shadow text-center font-medium transition-all duration-300 ${activePlan === index
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-100'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                      {plan.cta}
                    </a>
                  </div>

                  <div className="p-8 bg-slate-50">
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Features</h4>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className={`flex-shrink-0 h-5 w-5 ${activePlan === index ? 'text-indigo-600' : 'text-green-600'} transition-colors duration-300`} />
                          <span className="ml-3 text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-32 relative bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate/[0.03] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-16">
            <h2 className="inline-block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wider mb-3">Testimonials</h2>
            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Trusted by Industry Leaders
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600">
              Hear what real estate professionals say about PropertyPro AI.
            </p>
          </div>

          <div className="relative mt-16 py-10">
            {/* Testimonial carousel */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-100">
              <div className="relative h-96 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 p-12 transition-all duration-1000 ease-in-out flex flex-col justify-center
                    ${activeTestimonial === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                  >
                    <div className="relative">
                      <div className="absolute -top-6 -left-6 text-6xl text-indigo-200">"</div>
                      <p className="text-xl md:text-2xl text-slate-700 relative z-10 mb-8 max-w-3xl">
                        {testimonial.quote}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                            {testimonial.author.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-slate-900">{testimonial.author}</h4>
                          <p className="text-slate-500">{testimonial.role}</p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${activeTestimonial === index ? 'w-8 bg-indigo-500' : 'bg-slate-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 relative bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate/[0.03] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-16">
            <h2 className="inline-block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wider mb-3">FAQ</h2>
            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Common Questions
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600">
              Everything you need to know about PropertyPro AI.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-indigo-100 hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium text-slate-800">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0 p-2 rounded-full bg-slate-100">
                      {expandedFaqs[index] ? (
                        <Minus className="h-5 w-5 text-slate-500" />
                      ) : (
                        <Plus className="h-5 w-5 text-slate-500" />
                      )}
                    </span>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${expandedFaqs[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="p-6 pt-0 border-t border-slate-100">
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 md:py-32 relative bg-gradient-to-b from-indigo-50 to-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-indigo-50/50 to-purple-50/50" />
          <div className="absolute inset-0 bg-grid-slate/[0.03] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-16">
            <h2 className="inline-block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 uppercase tracking-wider mb-3">Get Started</h2>
            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
              Ready to Transform Your Business?
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600">
              Start your 14-day free trial now. No credit card required.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-3xl overflow-hidden bg-white shadow-2xl border border-indigo-100 p-1">
              <div className="p-6 md:p-10 bg-white rounded-2xl">
                <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="py-3 px-4 block w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="py-3 px-4 block w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="py-3 px-4 block w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                      Company / Agency
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="h-5 w-5 bg-slate-50 border border-slate-300 rounded text-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base text-slate-600">
                          I agree to the{' '}
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-lg shadow-indigo-100 text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                      onMouseEnter={handleCallToActionHover}
                      onMouseLeave={handleCallToActionLeave}
                    >
                      Start Your Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 relative bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PropertyPro</span>
                <span className="ml-1 text-lg font-semibold text-slate-500">AI</span>
              </div>
              <p className="mt-4 text-slate-500">
                The next generation of real estate technology, designed to transform how agents work.
              </p>
              <div className="mt-8 flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Support
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                  <a href="mailto:info@propertypro.ai" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300">
                    primedepthlabs@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-indigo-600 mr-3" />
                  <a href="tel:+15555555555" className="text-slate-500 hover:text-indigo-600 transition-colors duration-300">
                    +918146851290
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-slate-500 text-center">
              &copy; 2025 PropertyPro AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <a href="#home" className="fixed bottom-8 right-8 p-2 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition-colors duration-300 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>
    </div>
  );
};

export default LandingPage;
