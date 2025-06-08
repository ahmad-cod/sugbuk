"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
// import { signIn } from '@/utils/auth';
import { useProfile } from '@/contexts/ProfileContext';
import { createClient } from '@/utils/supabase/client';
import { EyeOff, LucideEye } from 'lucide-react';

// Form input validation types
type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};


export default function SignIn() {
  const router = useRouter();
  const supabase = createClient()
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { refreshProfile, profile } = useProfile();
  const [showPasswordValue, toggleShowValue] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const togglePasswordShow = 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {

      const { data, error } = await supabase.auth.signInWithPassword(formData)

      if (error) {
        console.error('Sign in error:', error);
        setErrors({ 
          ...errors, 
          password: "Invalid email or password" 
        });
        return;
      }

      
      await refreshProfile() // Refresh user profile after login

      // Redirect after successful login
      const role = data.user?.user_metadata?.role
      router.replace(role === 'admin' ? '/dashboard' : '/')
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        ...errors, 
        password: "Invalid email or password" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | SUGBUK - Student Union BUK</title>
        <meta name="description" content="Sign in to your SUGBUK account" />
      </Head>

      <div className="max-w-7xl min-h-screen flex flex-col mx-auto">


        {/* Main Content */}
        <main className="flex-grow flex flex-col md:flex-row items-stretch">
          {/* Left column: Form */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-10 md:px-12 lg:px-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full max-w-md">
              <motion.div 
                className="mb-8 text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Welcome back!</h1>
                <p className="text-gray-600">Sign in to access your student portal</p>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <motion.div
                    whileTap={{ scale: 0.995 }}
                    className={`relative rounded-lg border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden transition-all`}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      ref={emailInputRef}
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 placeholder-gray-400 focus:outline-none ${
                        errors.email ? 'bg-red-50' : 'bg-white'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                  {errors.email && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link 
                      href="/forgot-password" 
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      Forgot Password?
                    </Link>
                  </div>
                  <motion.div
                    whileTap={{ scale: 0.995 }}
                    className={`flex items-center relative rounded-lg border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden transition-all`}
                  >
                    <input
                      id="password"
                      name="password"
                      type={showPasswordValue ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 placeholder-gray-400 focus:outline-none ${
                        errors.password ? 'bg-red-50' : 'bg-white'
                      }`}
                      placeholder="••••••••"
                    />
                    <div className="px-2">
                      {
                        showPasswordValue ? 
                        <LucideEye className='w-8' onClick={() => toggleShowValue(false)} />
                        : <EyeOff className='w-8' onClick={() => toggleShowValue(true)} />
                      }
                    </div>
                  </motion.div>
                  {errors.password && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white 
                    ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    href="/sign-up" 
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column: Image/Graphics (hidden on mobile) */}
          <motion.div 
            className="hidden md:flex md:w-1/2 bg-blue-700 flex-col justify-center items-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-800 rounded-full -ml-40 -mb-20 opacity-30"></div>
            </div>
            
            <div className="max-w-md px-8 z-10 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h2 className="text-white text-3xl font-bold mb-4">Student Union Government</h2>
                <h3 className="text-blue-100 text-xl mb-8">Bayero University Kano</h3>
                <p className="text-blue-100 mb-6">
                  Your voice. Your community. Your university experience.
                </p>
              </motion.div>
              
              <motion.div
                className="w-full flex justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Image 
                  src="/student-illustration.png" 
                  alt="Student illustration" 
                  width={300} 
                  height={300}
                  className="max-w-xs w-full h-auto"
                />
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
