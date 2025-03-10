// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'next-i18next'

export default function Signup() {
  const { t, i18n } = useTranslation('common')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log('Signup data:', formData)
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 flex space-x-2 z-20">
        <button onClick={() => changeLanguage('en')} className="text-xl" title="English">🇺🇸</button>
        <button onClick={() => changeLanguage('es')} className="text-xl" title="Español">🇪🇸</button>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0',
            opacity: 0.3
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold tracking-tight inline-flex items-center">
                <span className="text-white">AI</span>
                <span className="text-emerald-400">NEXUS</span>
                <span className="ml-1 inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              </span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {t('signup.title', 'Create your account')}
            </h1>
            <p className="text-gray-400">
              {t('signup.subtitle', 'Start your 14-day free trial, no credit card required')}
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800">
            {/* Social Login */}
            <div className="mb-6">
              <button
                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white rounded-full py-3 border border-gray-800 transition-all duration-300"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path 
                    fill="currentColor" 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                  />
                  <path 
                    fill="currentColor" 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                  />
                  <path 
                    fill="currentColor" 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                  />
                  <path 
                    fill="currentColor" 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                <span>{t('signup.googleButton', 'Sign up with Google')}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900/50 text-gray-400">
                  {t('signup.orContinueWith', 'or continue with')}
                </span>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('signup.fullName', 'Full Name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    placeholder={t('signup.namePlaceholder', 'Enter your name')}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('signup.emailAddress', 'Email Address')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    placeholder={t('signup.emailPlaceholder', 'you@example.com')}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('signup.password', 'Password')}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                      placeholder={t('signup.passwordPlaceholder', 'Create a password')}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('signup.passwordNote', 'Must be at least 8 characters')}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-medium py-3 px-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    {t('signup.createAccountButton', 'Create Account')}
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              {t('signup.agreeText', 'By signing up, you agree to our')}{' '}
              <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">
                {t('signup.terms', 'Terms of Service')}
              </Link>{' '}
              {t('signup.andText', 'and')}{' '}
              <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">
                {t('signup.privacyPolicy', 'Privacy Policy')}
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {t('signup.alreadyAccount', 'Already have an account?')}{' '}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
                {t('signup.login', 'Log in')}
              </Link>
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('signup.backToHome', 'Back to home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}