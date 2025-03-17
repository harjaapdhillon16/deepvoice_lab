// @ts-nocheck
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUnauthenticatedLayout } from '@/components/common/auth_unauthrouting'
import { useTranslation } from 'next-i18next'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Signup() {
  useUnauthenticatedLayout()
  const { t, i18n } = useTranslation('common')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupError, setSignupError] = useState('')
  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSignupError('')

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            organization: data.organization
          }
        }
      })

      if (authError) throw authError

      // Insert user profile data into users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            name: data.name,
            email: data.email,
            organization: data.organization
          }
        ])

      if (profileError) throw profileError

      setSignupSuccess(true)
      push("/dashboard")
    } catch (error) {
      console.error('Signup error:', error)
      setSignupError(error.message || t('signup.errors.generic'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative bg-black text-white">
        {/* Background Elements */}
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
          {/* Additional Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6 transition-transform hover:scale-105">
                <span className="text-2xl font-bold tracking-tight inline-flex items-center">
                  <span className="text-white">{t('signup.brand')}</span>
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-transparent bg-clip-text">AI</span>
                  <span className="ml-1 inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                </span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
                {t('signup.joinTitle')}
              </h1>
              <p className="text-emerald-200/70">
                {t('signup.joinSubtitle')}
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50 ring-1 ring-white/5">
              {signupSuccess ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{t('signup.accountCreated')}</h3>
                  <p className="text-emerald-200/70 mb-6">{t('signup.verifyEmail')}</p>
                  <Link href="/login">
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 focus:ring-2 focus:ring-emerald-400">
                      {t('signup.continueToLogin')}
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  {signupError && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {signupError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-emerald-200 mb-1.5">
                        {t('signup.fullName')}
                      </label>
                      <input
                        id="name"
                        className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700/50 focus:border-emerald-500'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200`}
                        placeholder={t('signup.fullNamePlaceholder')}
                        {...register("name", { required: t('signup.errors.nameRequired') })}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-emerald-200 mb-1.5">
                        {t('signup.email')}
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700/50 focus:border-emerald-500'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200`}
                        placeholder={t('signup.emailPlaceholder')}
                        {...register("email", {
                          required: t('signup.errors.emailRequired'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('signup.errors.invalidEmail')
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
                      <label htmlFor="organization" className="block text-sm font-medium text-emerald-200 mb-1.5">
                        {t('signup.organization')}
                      </label>
                      <input
                        id="organization"
                        className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${errors.organization ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700/50 focus:border-emerald-500'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200`}
                        placeholder={t('signup.organizationPlaceholder')}
                        {...register("organization", { required: t('signup.errors.organizationRequired') })}
                      />
                      {errors.organization && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.organization.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-emerald-200">
                          {t('signup.password')}
                        </label>
                        <span className="text-xs text-emerald-300/70 hover:text-emerald-300 cursor-pointer">
                          {t('signup.passwordTips')}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700/50 focus:border-emerald-500'} text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200`}
                          placeholder={t('signup.passwordPlaceholder')}
                          {...register("password", {
                            required: t('signup.errors.passwordRequired'),
                            minLength: {
                              value: 8,
                              message: t('signup.errors.passwordMinLength')
                            }
                          })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? t('signup.hidePassword') : t('signup.showPassword')}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password ? (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password.message}
                        </p>
                      ) : (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            <span className="h-1 w-1/4 rounded-full bg-emerald-500/30"></span>
                            <span className="h-1 w-1/4 rounded-full bg-emerald-500/30"></span>
                            <span className="h-1 w-1/4 rounded-full bg-emerald-500/30"></span>
                            <span className="h-1 w-1/4 rounded-full bg-emerald-500/30"></span>
                          </div>
                          <p className="text-xs text-emerald-300/70">
                            {t('signup.passwordCriteria')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center pt-2">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-700 rounded bg-black/30"
                        {...register("terms", { required: t('signup.errors.terms') })}
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-emerald-200">
                        {t('signup.termsAgreement')}{' '}
                        <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                          {t('signup.terms')}
                        </Link>{' '}
                        {t('signup.and')}{' '}
                        <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                          {t('signup.privacyPolicy')}
                        </Link>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-xs text-red-400 -mt-1">
                        {errors.terms.message}
                      </p>
                    )}

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
                            {t('signup.creatingAccount')}
                          </span>
                        ) : t('signup.createAccount')}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-emerald-200/70">
                {t('signup.alreadyHaveAccount')}{' '}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  {t('signup.loginNow')}
                </Link>
              </p>
            </div>

            <div className="mt-10 text-center">
              <Link href="/" className="inline-flex items-center text-sm text-emerald-200/70 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {t('signup.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Branding Image */}
      <div className="hidden lg:block relative w-1/2">
        <img
          src="https://images.unsplash.com/photo-1532463788086-56a492a0b34a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHNwZWVkfGVufDB8MXwwfHx8MA%3D%3D"
          alt={t('signup.imageAlt')}
          className="object-cover w-full border-0 h-[125vh]"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold">{t('signup.imageTitle')}</h2>
          <p className="mt-2 text-lg">
            {t('signup.imageSubtitle')}
          </p>
        </div>
      </div>
    </div>
  )
}
