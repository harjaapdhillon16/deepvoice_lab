'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic validation
        const errors = {};
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Show loading state
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // Reset submission state
            setIsSubmitting(false);

            // Here you would typically redirect on successful login
            console.log('Login attempt with:', { email, password, rememberMe });
        }, 1500);
    };

    const handleGoogleLogin = () => {
        // This would typically integrate with Google OAuth
        console.log('Google login initiated');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden opacity-30 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                {/* Back to home */}
                <a href="/" className="absolute -top-10 left-0 flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-300">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </a>

                {/* Logo */}
                <div className="flex justify-center">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PropertyPro</span>
                        <span className="ml-1 text-lg font-semibold text-slate-500">AI</span>
                    </div>
                </div>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Or{' '}
                    <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        create a new account
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100 relative overflow-hidden">

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setFormErrors({ ...formErrors, email: '' });
                                    }}
                                    className={`appearance-none block w-full px-4 py-3 bg-slate-50 border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        } rounded-xl placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                                    placeholder="you@example.com"
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setFormErrors({ ...formErrors, password: '' });
                                    }}
                                    className={`appearance-none block w-full px-4 py-3 bg-slate-50 border ${formErrors.password ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        } rounded-xl placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                                {formErrors.password && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                                </span>
                                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full flex justify-center items-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-base font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                    </g>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-slate-600">
                    By signing in, you agree to our{' '}
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
    );
};

export default LoginPage;
