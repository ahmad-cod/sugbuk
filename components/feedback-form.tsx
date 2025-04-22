"use client";

import { useState } from "react";
import Button from "@/components/ui/btn";
import ImageUpload from "./image-upload";
import { categories } from "@/lib/constants";
import { FeedbackFormData } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { Sparkles, Info } from "lucide-react";
import { motion } from "motion/react";

export default function FeedbackForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    category: "",
    subject: "",
    message: "",
    recommendation: "",
    image_urls: [],
    is_anonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState("");


  const supabase = createClient()
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      image_urls: urls
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Here you would typically send the formData to your API
      // For example, using Supabase:
      const { data, error } = await supabase
        .from('feedbacks')
        .insert([formData])
        .select();
      if (error) throw error;
      
      // Show success message
      setIsSubmitted(true);
      setFormData({
        category: "",
        subject: "",
        message: "",
        recommendation: "",
        image_urls: [],
        is_anonymous: false,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you for your feedback!</h3>
        <p className="text-gray-600 mb-6">
          {isAnonymous
            ? "Your anonymous feedback has been submitted successfully."
            : "We've received your feedback and will get back to you soon."}
        </p>
        <Button
          variant="primary"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Feedback
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Anonymous Toggle */}
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div>
          <h3 className="text-base font-medium text-gray-900">Submit Anonymously</h3>
          <p className="text-sm text-gray-500">
            Your identity will not be shared with representatives
          </p>
        </div>
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
            isAnonymous
              ? "border-blue-600 bg-blue-600"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => setIsAnonymous(!isAnonymous)}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isAnonymous ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Personal Info (Hidden if Anonymous) */}
      {/* {!isAnonymous && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="regNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      )} */}

      {/* Academic Info */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="faculty"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Faculty
          </label>
          <select
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Faculty</option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div> */}

      {/* Feedback Details */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block font-medium mb-2 text-[14px]"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="lock w-full p-3 pl-4 pr-10 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white appearance-none"
          required
        >
          <option value="" disabled>What's this about?</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="subject"
          className="block font-medium mb-2 text-[14px]"
        >
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="block w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          required
          // placeholder="Brief title of your feedback"
          placeholder="Give your feedback a catchy title"
        />
        {/* <Input 
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Brief title of your feedback"
        /> */}
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="block font-medium mb-2 text-[14px]"
        >
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="block w-full p-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          required
          // placeholder="Explain your concern, feedback, or suggestion in detail..."
          placeholder="Spill the tea! Tell us what's on your mind..."
        ></textarea>
      </div>

      <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <label className="block font-medium text-[14px]">Recommendation</label>
              <div 
                className="relative cursor-pointer" 
                onMouseEnter={() => setTooltipVisible("recommendation")}
                onMouseLeave={() => setTooltipVisible("")}
              >
                <Info size={16} className="text-gray-400" />
                {tooltipVisible === "recommendation" && (
                  <div className="absolute z-10 w-64 p-2 text-xs bg-gray-800 text-white rounded shadow-lg -left-32 bottom-6">
                    Suggest how we could improve or what you'd like to see!
                  </div>
                )}
              </div>
            </div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="relative bg-blue-50 rounded-lg p-4 border border-blue-100"
            >
              <Sparkles size={18} className="absolute right-4 top-4 text-blue-400" />
              <textarea
                name="recommendation"
                value={formData.recommendation}
                onChange={handleChange}
                placeholder="Got ideas on how we can do better? We're all ears! 👂"
                rows={3}
                className="block w-full bg-transparent text-base resize-none focus:outline-none placeholder:text-blue-300"
              />
            </motion.div>
          </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label
          htmlFor="image"
          className="block font-medium mb-2 text-[14px]"
        >
          Upload Images (optional)
        </label>
        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <div className="flex items-center">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          required
        />
        <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            privacy policy
          </a>{" "}
          and consent to my data being processed as described.
        </label>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          // className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </form>
  );
}
