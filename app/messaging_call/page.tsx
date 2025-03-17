// @ts-nocheck
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Zap,
  Cpu,
  Code,
  TrendingUp,
  UserPlus,
  Check,
  MessageSquare,
  BarChart2,
  Link2,
  Brain,
  Sparkles,
  Bot,
  LineChart,
  LayoutGrid,
  Share2,
  Network,
  ChevronRight,
  Car,
  Home,
  ShoppingCart,
  DollarSign
} from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useUnauthenticatedLayout } from '@/components/common/auth_unauthrouting'
import { Inter, Space_Grotesk, Outfit } from 'next/font/google'
import { useSearchParams } from 'next/navigation'

// Import and configure fonts
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap'
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap'
})

// Keep Geist Mono for code blocks
const geistMono = {
  variable: '--font-geist-mono'
}

export default function HomePage() {
  useUnauthenticatedLayout()
  const { t, i18n } = useTranslation('common')
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  // Get URL search params
  const searchParams = useSearchParams()

  // Change language if ?lng=... is present
  useEffect(() => {
    const langParam = searchParams.get('lng')
    if (langParam) {
      i18n.changeLanguage(langParam)
    }
  }, [searchParams, i18n])


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-cycle through AI features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % aiFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const changeLanguage = (lng:any) => {
    i18n.changeLanguage(lng)
  }



  // AI features now store translation keys
  const aiFeatures = [
    {
      Icon: Brain,
      titleKey: 'aiFeatures.0.title',
      descriptionKey: 'aiFeatures.0.description'
    },
    {
      Icon: LineChart,
      titleKey: 'aiFeatures.1.title',
      descriptionKey: 'aiFeatures.1.description'
    },
    {
      Icon: Network,
      titleKey: 'aiFeatures.2.title',
      descriptionKey: 'aiFeatures.2.description'
    },
    {
      Icon: Sparkles,
      titleKey: 'aiFeatures.3.title',
      descriptionKey: 'aiFeatures.3.description'
    }
  ]

  // How It Works steps (using translation keys)
  const howItWorksSteps = [
    {
      Icon: Brain,
      titleKey: 'howItWorks.steps.0.title',
      descriptionKey: 'howItWorks.steps.0.description'
    },
    {
      Icon: Code,
      titleKey: 'howItWorks.steps.1.title',
      descriptionKey: 'howItWorks.steps.1.description'
    },
    {
      Icon: TrendingUp,
      titleKey: 'howItWorks.steps.2.title',
      descriptionKey: 'howItWorks.steps.2.description'
    },
    {
      Icon: Share2,
      titleKey: 'howItWorks.steps.3.title',
      descriptionKey: 'howItWorks.steps.3.description'
    }
  ]

  // Why Choose features (using translation keys)
  const whyChooseFeatures = [
    {
      Icon: Sparkles,
      titleKey: 'whyChoose.features.0.title',
      descriptionKey: 'whyChoose.features.0.description'
    },
    {
      Icon: Bot,
      titleKey: 'whyChoose.features.1.title',
      descriptionKey: 'whyChoose.features.1.description'
    },
    {
      Icon: LayoutGrid,
      titleKey: 'whyChoose.features.2.title',
      descriptionKey: 'whyChoose.features.2.description'
    },
    {
      Icon: Network,
      titleKey: 'whyChoose.features.3.title',
      descriptionKey: 'whyChoose.features.3.description'
    }
  ]

  // Industries list now uses translation keys for text
  const industriesList = [
    { Icon: Car, textKey: 'industries.list.0.text' },
    { Icon: Home, textKey: 'industries.list.1.text' },
    { Icon: ShoppingCart, textKey: 'industries.list.2.text' },
    { Icon: DollarSign, textKey: 'industries.list.3.text' }
  ]

  return (
    <div
      className={`
        ${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${geistMono.variable}
        min-h-screen bg-black text-white
      `}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-black/90 backdrop-blur-md py-2 shadow-xl border-b border-emerald-900/20'
            : 'bg-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="md:text-2xl text-lg font-bold flex items-center">
                <Bot className="h-8 hidden md:block w-8 mr-2 text-emerald-500" />
                <span>{t('home.brand')}</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#how-it-works">
                <span className="text-lg hover:text-emerald-400 transition-colors">
                  {t('navigation.howItWorks')}
                </span>
              </Link>
              <Link href="#why-choose">
                <span className="text-lg hover:text-emerald-400 transition-colors">
                  {t('navigation.whyChoose')}
                </span>
              </Link>
              <Link href="#pricing">
                <span className="text-lg hover:text-emerald-400 transition-colors">
                  {t('navigation.pricing')}
                </span>
              </Link>
              <Link href="#industries">
                <span className="text-lg hover:text-emerald-400 transition-colors">
                  {t('navigation.industries')}
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/login">
                <span className="md:text-lg text-xs hover:text-white transition-colors">
                  {t('navigation.login')}
                </span>
              </Link>
              <Link href="/signup">
                <span className="px-6 md:text-lg text-xs py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-lg shadow-emerald-900/30">
                  {t('navigation.getStarted')}
                </span>
              </Link>
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  title="English"
                >
                  🇺🇸
                </button>
                <button
                  onClick={() => changeLanguage('es')}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  title="Español"
                >
                  🇪🇸
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 bg-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {/* Neural network nodes */}
            {Array(20)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-emerald-700/20 animate-pulse"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 8 + 4}s`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            {/* Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"></div>
            {/* Gradient blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-700/20 text-emerald-300 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('hero.platformTag')}
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-300 tracking-tight leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mb-12">{t('hero.subtitle')}</p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Link href="/signup">
              <span className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-lg shadow-emerald-900/30 flex items-center">
                {t('hero.getStarted')}
                <ChevronRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
            {/* <Link href="/demo">
              <span className="px-8 py-4 rounded-full border border-emerald-700/30 bg-black/50 backdrop-blur-sm text-gray-300 hover:text-white hover:border-emerald-500/50 transition-colors flex items-center">
                {t('hero.scheduleDemo')}
              </span>
            </Link> */}
          </div>

          {/* AI Feature Showcase */}
          <div className="relative w-full max-w-4xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10 pointer-events-none"></div>
            <div className="relative bg-gradient-to-br from-emerald-950/30 to-emerald-900/30 rounded-2xl border border-emerald-900/20 backdrop-blur-sm p-8 shadow-2xl">
              {/* AI Brain visualization */}
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full bg-emerald-900/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
                  <Brain className="absolute inset-0 w-full h-full text-emerald-500/80" />
                  {/* Neural connections */}
                  {Array(8)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-20 h-0.5 bg-gradient-to-r from-emerald-500/80 to-transparent origin-left"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 45}deg)`,
                          opacity: activeFeature === i % 4 ? 0.8 : 0.2,
                          transition: 'opacity 0.5s ease'
                        }}
                      />
                    ))}
                </div>
              </div>

              {/* Feature carousel */}
              <div className="transition-all duration-500 ease-in-out min-h-[100px]">
                {aiFeatures.map((feature, idx) => {
                  const FeatureIcon = feature.Icon
                  return (
                    <div
                      key={idx}
                      className={`flex items-start space-x-4 transition-all duration-500 ${activeFeature === idx ? 'opacity-100 relative' : 'opacity-0 absolute'
                        }`}
                      style={{ position: activeFeature === idx ? 'relative' : 'absolute' }}
                    >
                      <FeatureIcon className="w-12 h-12 text-emerald-500 shrink-0" />
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-2">{t(feature.titleKey)}</h3>
                        <p className="text-gray-400 max-w-lg">{t(feature.descriptionKey)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Feature indicator dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {aiFeatures.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${activeFeature === idx ? 'bg-emerald-500' : 'bg-gray-600/30'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{t('howItWorks.title')}</h2>
            <div className="mt-4 h-1 w-16 bg-emerald-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {howItWorksSteps.map((step, i) => {
              const StepIcon = step.Icon
              return (
                <div key={i} className="text-center">
                  <div className="mb-4">
                    <StepIcon className="w-12 h-12 mx-auto text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-400">{t(step.descriptionKey)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{t('whyChoose.title')}</h2>
            <div className="mt-4 h-1 w-16 bg-emerald-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {whyChooseFeatures.map((feature, i) => {
              const FeatureIcon = feature.Icon
              return (
                <div key={i} className="flex items-center mx-auto space-x-4">
                  <FeatureIcon className="w-10 h-10 text-emerald-500" />
                  <div>
                    <h3 className="text-2xl w-80 font-semibold">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-400 w-80">{t(feature.descriptionKey)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section - Coming Soon */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-emerald-400">{t('pricing.title')}</h2>
          <div className="mt-4 h-1 w-16 bg-emerald-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-emerald-200">{t('pricing.description')}</p>
          <div className="mt-12">
            <p className="text-2xl text-emerald-400 font-bold">{t('pricing.comingSoon')}</p>
          </div>
        </div>
      </section>

      {/* Call To Action (CTA) Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ animationDuration: '6s' }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <span className="px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium hover:from-emerald-500 hover:to-emerald-600 transition-transform transform hover:scale-105 shadow-lg">
                {t('cta.getStarted')}
              </span>
            </Link>
            <Link href="/contact">
              <span className="px-10 py-4 rounded-full border border-gray-700 text-gray-400 hover:border-emerald-400 hover:text-emerald-400 transition-colors shadow-lg">
                {t('cta.talkToExpert')}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">{t('industries.title')}</h2>
            <div className="mt-4 h-1 w-16 bg-emerald-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 text-center md:grid-cols-2 gap-12">
            {industriesList.map((industry, i) => {
              const IndustryIcon = industry.Icon
              return (
                <div key={i} className="items-center space-x-4 p-4 bg-emerald-900 bg-opacity-[0.2] py-10 rounded-lg transition">
                  <div className="bg-emerald-100 mx-auto w-10 h-10 flex justify-center items-center mb-3 text-center rounded-xl">
                    <IndustryIcon className="w-5 mx-auto h-5 text-emerald-500" />
                  </div>
                  <div className="text-xl">{t(industry.textKey)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">{t('footer.brand')}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
              <Link href="/privacy">
                <span className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                  {t('footer.privacy')}
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                  {t('footer.terms')}
                </span>
              </Link>
              <Link href="/about">
                <span className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                  {t('footer.about')}
                </span>
              </Link>
              <Link href="/blog">
                <span className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                  {t('footer.blog')}
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                  {t('footer.contact')}
                </span>
              </Link>
            </div>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="text-gray-600 hover:text-emerald-400 transition-transform transform hover:scale-110"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="pt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
