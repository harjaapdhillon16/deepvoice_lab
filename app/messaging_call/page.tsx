'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, MessageSquare, Shield, Zap, Users, ChevronRight } from 'lucide-react'
import { useTranslation } from 'next-i18next'

export default function Home() {
  const { t, i18n } = useTranslation('common')
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center relative">
              <span className="text-xl font-bold text-white relative">
                AI<span className="text-emerald-400">NEXUS</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 opacity-50 animate-pulse"></div>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              {[
                { key: 'navigation.features' },
                { key: 'navigation.process' },
                { key: 'navigation.pricing' }
              ].map((item, i) => (
                <Link href={`#${t(item.key).toLowerCase()}`} key={i}>
                  <span className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300 relative group">
                    {t(item.key)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/login">
                <span className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group">
                  {t('navigation.login')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
              <Link href="/signup">
                <span className="text-sm px-6 py-2 rounded-full bg-black border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">{t('navigation.start')}</span>
                  <span className="absolute inset-0 w-0 bg-emerald-400 transition-all duration-500 group-hover:w-full"></span>
                </span>
              </Link>
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <button onClick={() => changeLanguage('en')} className="text-xl" title="English">🇺🇸</button>
                <button onClick={() => changeLanguage('es')} className="text-xl" title="Español">🇪🇸</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-3/4 left-2/3 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/signup">
                  <span className="px-8 py-3 rounded-full bg-emerald-500 text-black font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group relative overflow-hidden">
                    <span className="relative z-10">{t('hero.getStarted')}</span>
                    <span className="absolute inset-0 w-full bg-emerald-400 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                  </span>
                </Link>
                <Link href="#demo">
                  <span className="px-8 py-3 rounded-full bg-transparent border border-gray-800 text-gray-400 font-medium hover:border-emerald-500 hover:text-emerald-500 transition-all duration-300 group relative overflow-hidden">
                    <span className="relative z-10">{t('hero.watchDemo')}</span>
                    <span className="absolute inset-0 w-full bg-emerald-500/5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="pr-2">{t('hero.trial')}</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden relative rounded-full bg-gradient-to-br from-black to-gray-900 p-1 border border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-emerald-500/5 rounded-full"></div>
                <div className="absolute w-full h-full flex items-center justify-center">
                  <Phone className="w-16 h-16 text-emerald-400 animate-pulse" style={{animationDuration: '3s'}} />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border border-emerald-500/20 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-emerald-500/10 rounded-full animate-pulse" style={{animationDuration: '6s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-full h-full">
                  <div className="absolute w-3 h-3 rounded-full bg-emerald-400 top-0 left-1/2 transform -translate-x-1/2" style={{animation: 'orbitY 8s linear infinite'}}></div>
                  <div className="absolute w-3 h-3 rounded-full bg-emerald-400 top-1/2 right-0 transform -translate-y-1/2" style={{animation: 'orbitX 8s linear infinite', animationDelay: '2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-12 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 opacity-30">
            {['Brand', 'Brand', 'Brand', 'Brand', 'Brand'].map((company, i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-sm font-medium uppercase tracking-wider text-gray-600">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-md">
            <h2 className="text-3xl font-bold mb-4">{t('features.coreTitle')}</h2>
            <div className="h-1 w-12 bg-emerald-400 mb-6 rounded-full"></div>
            <p className="text-gray-400">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t('features.list', { returnObjects: true }).map((feature, i) => (
              <div 
                key={i} 
                className="p-6 border border-gray-900 hover:border-emerald-500/30 rounded-xl transition-all duration-500 group relative overflow-hidden"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-emerald-400 mb-4 group-hover:text-emerald-300 transition-colors duration-300 transform group-hover:scale-110">
                    {i === 0 && <Phone className="w-5 h-5" />}
                    {i === 1 && <MessageSquare className="w-5 h-5" />}
                    {i === 2 && <Shield className="w-5 h-5" />}
                    {i === 3 && <Zap className="w-5 h-5" />}
                    {i === 4 && <Users className="w-5 h-5" />}
                    {i === 5 && <ChevronRight className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-md">
            <h2 className="text-3xl font-bold mb-4">{t('process.title')}</h2>
            <div className="h-1 w-12 bg-emerald-400 mb-6 rounded-full"></div>
            <p className="text-gray-400">
              {t('process.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {t('process.steps', { returnObjects: true }).map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-4xl font-bold text-emerald-500/20 group-hover:text-emerald-500/30 transition-colors duration-300 mb-4 group-hover:scale-110 origin-left transition-transform duration-300">
                  {`0${i + 1}`}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 right-0 transform translate-x-1/2">
                    <div className="relative">
                      <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6H58.5M58.5 6L53.5 1M58.5 6L53.5 11" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1"/>
                      </svg>
                      <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-emerald-400/50 transform -translate-y-1/2 animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-md">
            <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
            <div className="h-1 w-12 bg-emerald-400 mb-6 rounded-full"></div>
            <p className="text-gray-400">
              {t('pricing.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              t('pricing.plans.basic', { returnObjects: true }),
              t('pricing.plans.pro', { returnObjects: true }),
              t('pricing.plans.enterprise', { returnObjects: true })
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`p-6 border rounded-xl ${plan.highlighted ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-900/10 to-transparent' : 'border-gray-900'} relative overflow-hidden group hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-500`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-emerald-500 text-black text-xs font-medium px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-lg font-medium mb-1">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start text-sm group">
                      <svg className="w-4 h-4 text-emerald-400 mt-0.5 mr-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === "Enterprise" || plan.name === "Empresarial" ? "/contact" : "/signup"}>
                  <span className={`block w-full py-2 text-center rounded-full ${
                    plan.highlighted 
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/10' 
                      : 'bg-black border border-gray-800 text-gray-400 hover:border-emerald-500 hover:text-emerald-500'
                    } transition-all duration-300 relative overflow-hidden group`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                    {!plan.highlighted && <span className="absolute inset-0 w-full bg-emerald-500/5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDuration: '6s'}}></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            {t('cta.subTitle')}
          </p>
          <Link href="/signup">
            <span className="inline-block px-10 py-4 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:translate-y-[-2px] relative group overflow-hidden">
              <span className="relative z-10">{t('cta.button')}</span>
              <span className="absolute inset-0 w-full bg-white/20 transform scale-x-0 origin-right transition-transform duration-700 group-hover:scale-x-100"></span>
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 relative">
              <span className="text-xl font-bold text-white relative">
                AI<span className="text-emerald-400">NEXUS</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 opacity-50"></div>
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
              {[
                { key: 'footer.privacy' },
                { key: 'footer.terms' },
                { key: 'footer.about' },
                { key: 'footer.blog' },
                { key: 'footer.contact' }
              ].map((item, i) => (
                <Link href={`/${t(item.key).toLowerCase()}`} key={i}>
                  <span className="text-xs text-gray-500 hover:text-emerald-400 transition-colors duration-300 relative group">
                    {t(item.key)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a key={social} href={`#${social}`} className="text-gray-600 hover:text-emerald-400 transition-all duration-300 transform hover:scale-110">
                  <span className="sr-only">{social}</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="pt-8 text-center">
            <p className="text-xs text-gray-600">{t('footer.rights')}</p>
          </div>
        </div>
      </footer>

      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes orbitX {
          0% { transform: translateY(-50%) translateX(-50%); }
          50% { transform: translateY(-50%) translateX(150%); }
          100% { transform: translateY(-50%) translateX(-50%); }
        }
        @keyframes orbitY {
          0% { transform: translateX(-50%) translateY(-50%); }
          50% { transform: translateX(-50%) translateY(150%); }
          100% { transform: translateX(-50%) translateY(-50%); }
        }
      `}</style>
    </div>
  )
}