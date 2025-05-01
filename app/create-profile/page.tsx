'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useProfile } from '@/contexts/ProfileContext';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isStudent: boolean;
  department: string;
  level: string;
  studentId: string;
};

export default function CreateProfile() {
  const router = useRouter();
  const supabase = createClient();
  const { refreshProfile } = useProfile();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    isStudent: false,
    department: '',
    level: '',
    studentId: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Move to next step
  const handleNextStep = () => {
    if (step === 1) {
      // Validate personal info fields
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('First name and last name are required');
        return;
      }
      
      // If valid, go to next step
      setError(null);
      setStep(2);
    }
  };

  // Move to previous step
  const handlePrevStep = () => {
    setStep(1);
    setError(null);
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get current user session
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }
      
      // Prepare profile data for Supabase
      const profileData = {
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phoneNumber || null,
        is_student: formData.isStudent,
        department: formData.isStudent ? formData.department : null,
        level: formData.isStudent ? formData.level : null,
        student_id: formData.isStudent ? formData.studentId : null,
      };
      
      // Insert profile into database
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([profileData]);
      
      if (insertError) {
        throw new Error(insertError.message);
      }
      
      // Redirect to feedbacks dashboard on success
      refreshProfile();
      router.push('/feedbacks');
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get to know you better
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6 px-4 sm:px-0">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-50 text-sm text-gray-500">
                Step {step} of 2
              </span>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Optional, but recommended for account recovery</p>
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      id="isStudent"
                      name="isStudent"
                      type="checkbox"
                      checked={formData.isStudent}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isStudent" className="ml-2 block text-sm text-gray-900">
                      I am a student
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Student Information (if applicable) */}
            {step === 2 && (
              <div className="space-y-6">
                {formData.isStudent ? (
                  <>
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="department"
                          name="department"
                          type="text"
                          required={formData.isStudent}
                          value={formData.department}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                        Level <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <select
                          id="level"
                          name="level"
                          required={formData.isStudent}
                          value={formData.level}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Select your level</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Graduate">Graduate</option>
                          <option value="PhD">PhD</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                        Student ID <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          id="studentId"
                          name="studentId"
                          type="text"
                          required={formData.isStudent}
                          value={formData.studentId}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>Non-student profile doesn't require additional information.</p>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {error}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || (formData.isStudent && (!formData.department || !formData.level || !formData.studentId))}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                  >
                    {loading ? 'Creating Profile...' : 'Complete Setup'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}