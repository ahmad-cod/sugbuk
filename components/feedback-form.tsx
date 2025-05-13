"use client";

import { useState } from "react";
import Button from "@/components/ui/btn";
import ImageUpload from "./image-upload";
import { categories } from "@/lib/constants";
import { FeedbackFormData } from "@/lib/types";
import { useProfile } from "@/contexts/ProfileContext";
import { Sparkles, Info } from "lucide-react";
import { motion } from "motion/react";
import { useSupabase } from "@/hooks/useSupabase";
import toast from "react-hot-toast";

export default function FeedbackForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { profile } = useProfile();
  const { insertFeedback } = useSupabase();
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
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!name) {
      console.warn("Input element is missing a name attribute");
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      image_urls: [...prev.image_urls!, ...urls]
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      toast.error("Please select a valid category.");
      return;
    }

    try {      
      const feedbackData = {
        ...formData,
        is_anonymous: isAnonymous,
        profile_id: profile?.id,
        user_id: profile?.user_id,
      };

      const { error } = await insertFeedback(feedbackData);

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
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FeedbackSuccessMessage
        isAnonymous={isAnonymous}
        handleReset={() => setIsSubmitted(false)}
      />
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
          placeholder="Brief title of your feedback"
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
          placeholder="Please share your feedback or concerns in detail..."
        ></textarea>
      </div>

      <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <label className="block font-medium text-[14px]">Recommendation</label>
              <div className="relative cursor-pointer">
                <Info size={16} className="text-gray-400" />
                <div
                  className={`absolute z-10 w-64 p-2 text-xs bg-gray-800 text-white rounded shadow-lg -left-32 bottom-6 transition-opacity duration-200 ${
                    tooltipVisible === "recommendation" ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  Suggest how we could improve or what you'd like to see!
                </div>
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
          Upload Relevant Images (optional)
        </label>
        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <div className="flex items-center">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          defaultChecked
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
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </div>
    </form>
  );
}

function FeedbackSuccessMessage({
  isAnonymous,
  handleReset,
}: {
  isAnonymous: boolean;
  handleReset: () => void;
}) {
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
        onClick={handleReset}
      >
        Submit Another Feedback
      </Button>
    </div>
  );
}