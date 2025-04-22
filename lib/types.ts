export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location: string;
  image: string;
  organizer?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  faculty: string;
  department?: string;
  image: string;
  contact: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface FeedbackFormData {
  name: string;
  email: string;
  regNumber: string;
  faculty: string;
  department: string;
  category: string;
  subject: string;
  message: string;
  isAnonymous: boolean;
}