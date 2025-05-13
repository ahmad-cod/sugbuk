"use client"
import { getReadTime } from "@/app/post/utils";
import { useProfile } from "@/contexts/ProfileContext";
import { formatDistanceToNow } from "date-fns";
import { BookOpen } from "lucide-react";

interface PostContentProps {
  title: string;
  tags: string[];
  cover_image: string;
  created_at: string;
  time_to_read: string;
  content: string[];
}


export default function PostPage( { data } :  { data : PostContentProps } ) {
  const { profile } = useProfile()
  const { title, tags, cover_image, created_at, content, } = data;

  return (
    <section className="max-w-screen-md p-4 sm:p-6 mx-auto">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="flex flex-col sm:flex-row items-start justify-between my-4">
        <div className="flex items-center space-x-2">
          {tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex"><BookOpen className="mr-2" /> {getReadTime(content)}</span>
          <span className="text-indigo-700 text-xl">•</span>
          <span className="text-base ml-4">{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</span>
        </div>
      </div>
      <img 
        src={cover_image}
        alt="Post Image" 
        width={750}
        height={300}
        className="rounded-lg my-4"
        loading="lazy"
        />
      {/* <p>{content}</p> */}
      <article className="my-8 prose prose-slate">
        {content.map((paragraph, index) => (
          <p key={index} className="my-4 text-[15px] text-gray-800 leading-6 text-justify">
            {paragraph}
          </p>
        ))}
      </article>
 
      {/* if a user is not authenticated, call to action to login or register to post comments*/}

 { profile ? (
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center space-x-2">
          <img
            src={profile?.avatar_url || "/dev-avatar.jpg"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span>{profile?.first_name} {profile?.last_name}</span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Post Comment</button>
      </div>
 ) : (

      <div className="flex flex-col items-center justify-center my-8">
        <h2 className="text-lg font-semibold">Join the Conversation</h2>
        <p className="text-gray-600">Login or Register to post comments</p>
        <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Login / Register</div>
      </div>
 )}
    </section>
  );
}
