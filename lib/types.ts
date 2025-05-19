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
  category: string;
  subject: string;
  message: string;
  recommendation?: string;
  image_urls?: string[];
  video_urls?: string[];
  is_anonymous: boolean;
  is_private: boolean;
}

// export interface UserProfile {
//   id: string;
//   user_id: string;
//   first_name: string;
//   last_name: string;
//   phone_number?: string;
//   is_student: boolean;
//   department?: string;
//   level?: string;
//   student_id?: string;
//   created_at: string;
//   updated_at: string;
// }

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isStudent: boolean;
  department?: string;
  level?: string;
  studentId?: string;
}

export interface PostFormData {
  title: string;
  content: string[];
  tags: string[];
  cover_image?: string;
  is_published: boolean;
  author_id: string;
}

export interface Comment {
  id: string;
  content: string;
  post_id: number;
  user_id: string;
  profile_id: number;
  is_edited: boolean;
  parent_comment_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields from users table
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}