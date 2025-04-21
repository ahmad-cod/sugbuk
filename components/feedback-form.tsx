"use client";

import { useState } from "react";
import Button from "@/components/ui/btn";

export default function FeedbackForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNumber: "",
    faculty: "",
    department: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faculties = [
    "Faculty of Agriculture",
    "Faculty of Arts and Islamic Studies",
    "Faculty of Communication",
    "Faculty of Computer Science and IT",
    "Faculty of Dentistry",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Law",
    "Faculty of Life Sciences",
    "Faculty of Management Sciences",
    "Faculty of Medicine",
    "Faculty of Pharmaceutical Sciences",
    "Faculty of Social Sciences",
  ];

  const categories = [
    "Academic Issues",
    "Campus Facilities",
    "Student Welfare",
    "Hostel/Accommodation",
    "Security Concerns",
    "Financial Issues",
    "Student Activities",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real implementation, you would send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        regNumber: "",
        faculty: "",
        department: "",
        category: "",
        subject: "",
        message: "",
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
      {!isAnonymous && (
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
      )}

      {/* Academic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Feedback Details */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Brief title of your feedback"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          placeholder="Explain your concern, feedback, or suggestion in detail..."
        ></textarea>
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
