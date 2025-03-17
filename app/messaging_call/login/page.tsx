'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'
import { useUnauthenticatedLayout } from '@/components/common/auth_unauthrouting'
import { useTranslation } from 'next-i18next'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState('')

  useUnauthenticatedLayout()

  const { t } = useTranslation('common')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setLoginError('')

    try {
      // Sign in with Supabase Auth
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) throw error

      // On successful login, you can redirect or update the state accordingly.
      // For example, you might want to route to the dashboard:
      // router.push('/dashboard')

    } catch (error) {
      console.error('Login error:', error)
      setLoginError(error.message || t('login.errors.generic'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(rgba(16,185,129,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0',
              opacity: 0.2
            }}
          ></div>
        </div>
        {/* Form Content */}
        <div className="min-h-screen bg-gradient-to-b bg-black flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6 transition-transform hover:scale-105">
                <span className="text-2xl font-bold tracking-tight inline-flex items-center">
                  <span className="text-white">{t('login.brand')}</span>
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-transparent bg-clip-text">
                    AI
                  </span>
                  <span className="ml-1 inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                </span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
                {t('login.welcomeBack')}
              </h1>
              <p className="text-emerald-200/70">
                {t('login.accessAccount')}
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50 ring-1 ring-white/5">
              {loginError && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-emerald-200 mb-1.5">
                    {t('login.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700/50 focus:border-emerald-500'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200`}
                    placeholder={t('login.emailPlaceholder')}
                    {...register("email", {
                      required: t('login.errors.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('login.errors.invalidEmail')
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-emerald-200 mb-1.5">
                    {t('login.password')}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700/50 focus:border-emerald-500'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200`}
                      placeholder={t('login.passwordPlaceholder')}
                      {...register("password", { required: t('login.errors.passwordRequired') })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-emerald-500 focus:ring-offset-slate-900"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('login.loggingIn')}
                      </span>
                    ) : t('login.logIn')}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-emerald-200/70">
                {t('login.noAccount')}{' '}
                <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  {t('login.createAccount')}
                </Link>
              </p>
            </div>

            <div className="mt-10 text-center">
              <Link href="/" className="inline-flex items-center text-sm text-emerald-200/70 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {t('login.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Branding Image */}
      <div className="hidden lg:block relative w-1/2">
        <img
          src="https://images.unsplash.com/photo-1532463788086-56a492a0b34a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHNwZWVkfGVufDB8MXwwfHx8MA%3D%3D"
          alt={t('login.imageAlt')}
          className="object-cover w-full border-0 h-[100vh]"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold">{t('login.imageTitle')}</h2>
          <p className="mt-2 text-lg">
            {t('login.imageSubtitle')}
          </p>
        </div>
      </div>
    </div>
  )
}
