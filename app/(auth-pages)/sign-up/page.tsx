"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signUp } from '@/utils/auth';
import toast from 'react-hot-toast';
import { EyeOff, LucideEye } from 'lucide-react';

// Form input validation types
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUp() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswordValue, setShowPasswordValue] = useState(false);
  const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Focus on the email input field when the component mounts
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

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
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check password strength when password field changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true)
    
    try {
      // console.log('Submitting:', formData)
      
      await signUp({
        email: formData.email,
        password: formData.password,
      })


      // new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
      });
      setPasswordStrength(0);
      setErrors({});
      // send a toast notification
      toast.success("Thanks for signing up!\n\nKindly check your email for a verification link.");
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ 
        ...errors, 
        email: "This email may already be in use" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowValue = (value: boolean, name: 'password' | 'confirmPassword') => {
    if (name === 'password') {
      setShowPasswordValue(value)
      console.log(formData.password)
    } else {
      setShowConfirmPasswordValue(value)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col mx-auto rounded-xl">
        {/* Header */}

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
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Join SUGBUK</h1>
                <p className="text-gray-600">Create your account to get started</p>
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
                      ref={emailRef}
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
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
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 placeholder-gray-400 focus:outline-none ${
                        errors.password ? 'bg-red-50' : 'bg-white'
                      }`}
                      placeholder="Create a strong password"
                    />
                    <div className="px-2">
                      {
                        showPasswordValue ? 
                        <LucideEye onClick={() => toggleShowValue(false, 'password')} />
                        : <EyeOff onClick={() => toggleShowValue(true, 'password')} />
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
                  
                  {/* Password strength indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-1 h-1">
                        {[...Array(4)].map((_, index) => (
                          <motion.div 
                            key={index}
                            className={`h-full flex-1 rounded-full ${
                              index < passwordStrength 
                                ? index < 2 
                                  ? 'bg-red-400' 
                                  : index < 3 
                                    ? 'bg-yellow-400' 
                                    : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {passwordStrength === 0 && "Password is too weak"}
                        {passwordStrength === 1 && "Password is weak"}
                        {passwordStrength === 2 && "Password is fair"}
                        {passwordStrength === 3 && "Password is good"}
                        {passwordStrength === 4 && "Password is strong"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <motion.div
                    whileTap={{ scale: 0.995 }}
                    className={`flex items-center relative rounded-lg border ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    } focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden transition-all`}
                  >
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPasswordValue ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 placeholder-gray-400 focus:outline-none ${
                        errors.confirmPassword ? 'bg-red-50' : 'bg-white'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <div className="px-2">
                      {
                        showConfirmPasswordValue ? 
                        <LucideEye onClick={() => toggleShowValue(false, 'confirmPassword')} />
                        : <EyeOff onClick={() => toggleShowValue(true, 'confirmPassword')} />
                      }
                    </div>
                  </motion.div>
                  {errors.confirmPassword && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.confirmPassword}
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
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    href="/sign-in" 
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

            </div>
          </motion.div>

          {/* Right column: Image/Graphics (hidden on mobile) */}
          <motion.div 
            className="hidden md:flex md:w-1/2 bg-blue-600 flex-col justify-center items-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-800 rounded-full -ml-40 -mb-20 opacity-30"></div>
              <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-400 rounded-full opacity-10"></div>
            </div>
            
            <div className="max-w-md px-8 z-10 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h2 className="text-white text-3xl font-bold mb-4">Join the Community</h2>
                <h3 className="text-blue-100 text-xl mb-8">Bayero University Kano</h3>
                <p className="text-blue-100 mb-6">
                  Connect with other students, stay updated on campus events, and make your voice heard.
                </p>
              </motion.div>
              
              <motion.div
                className="w-full flex justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Image 
                  src="/nacoss_nem.webp" 
                  alt="Student community" 
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



// import { signUpAction } from "@/app/actions";
// import { FormMessage, Message } from "@/components/form-message";
// import { SubmitButton } from "@/components/submit-button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { SmtpMessage } from "../smtp-message";

// export default async function Signup(props: {
//   searchParams: Promise<Message>;
// }) {
//   const searchParams = await props.searchParams;
//   if ("message" in searchParams) {
//     return (
//       <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
//         <FormMessage message={searchParams} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <form className="flex flex-col min-w-64 max-w-64 mx-auto">
//         <h1 className="text-2xl font-medium">Sign up</h1>
//         <p className="text-sm text text-foreground">
//           Already have an account?{" "}
//           <Link className="text-primary font-medium underline" href="/sign-in">
//             Sign in
//           </Link>
//         </p>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             name="password"
//             placeholder="Your password"
//             minLength={6}
//             required
//           />
//           <SubmitButton formAction={signUpAction} pendingText="Signing up...">
//             Sign up
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//       <SmtpMessage />
//     </>
//   );
// }
