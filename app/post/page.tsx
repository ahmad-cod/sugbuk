// import { Book, BookAIcon, BookOpen } from "lucide-react";
// import Image from "next/image";
// import { getReadTime } from "./utils";

// const data = {
//   title: "VC Welcomes Newly Elected SUG Executives, Urges Commitment to Student Welfare",
//   tags: ["sample", "post"],
//   cover_image: "https://res.cloudinary.com/annasr800/image/upload/v1746118861/sugbuk-r-uploads/yhlsxdbctfphytxwetfo.jpg",
//   banner_image: "https://res.cloudinary.com/annasr800/image/upload/v1746637050/sugbuk-r-uploads/hjlvsae81tvorjv3icog.jpg",
//   created_at: "March 27, 2025",
//   time_to_read: "5 min",
//   content: [
//     `The Vice-Chancellor of Bayero University, Kano (BUK), Professor Sagir Adamu Abbas, on Thursday, March 27, 2025, received the newly elected executives of the Student Union Government (SUG), led by its President, Comrade Abdullahi Usman Baba. The delegation was accompanied by the Dean of Student Affairs, Professor Shamsuddeen Umar.`,
//     `Congratulating the new leaders, Professor Abbas urged them to prioritize the welfare of students and foster a strong working relationship with both the university staff and management. He emphasized that their role extends beyond representation, calling on them to initiate programs that promote academic excellence and mentorship among students. He also reminded them of their civic responsibilities, encouraging active participation in community service and volunteerism to contribute positively to the university’s growth. Stressing the importance of responsible leadership, he advised them to uphold accountability, transparency, 
//     and inclusivity in their administration while providing a platform for dialogue and constructive engagement with students.`,
//     `Professor Abbas reaffirmed the university’s commitment to student welfare, citing several initiatives undertaken by his administration. He highlighted the student job scheme, which costs the university over ₦2 million monthly, as a key effort to support students financially while providing them with valuable work experience. He also spoke about the skills acquisition program introduced to equip students with entrepreneurial skills for self-reliance after graduation. Additionally,
//     he disclosed that the university had invested over ₦100 million at Aminu Kano Teaching Hospital to ensure continuous water and electricity supply, demonstrating its commitment to maintaining essential services.`
//   ],
//   isDraft: false,
// }

// export default function PostPage() {
//   const { title, tags, banner_image, created_at, content, isDraft } = data;

//   return (
//     <section className="max-w-screen-md p-4 sm:p-6 mx-auto">
//       <h1 className="text-2xl font-semibold">{title}</h1>
//       <div className="flex flex-col sm:flex-row items-start justify-between my-4">
//         <div className="flex items-center space-x-2">
//           {tags.map((tag, index) => (
//             <span key={index}>#{tag}</span>
//           ))}
//         </div>
//         <div className="flex items-center space-x-4">
//           <span className="flex"><BookOpen className="mr-2" /> {getReadTime(content)}</span>
//           <span className="text-indigo-700 text-xl">•</span>
//           <span className="text-base ml-4">{created_at}</span>
//         </div>
//       </div>
//       <Image 
//         src={banner_image}
//         alt="Post Image" 
//         width={750}
//         height={300}
//         className="rounded-lg my-4"
//         />
//       {/* <p>{content}</p> */}
//       <article className="my-8 prose prose-slate">
//         {content.map((paragraph, index) => (
//           <p key={index} className="my-4 text-[15px] text-gray-800 leading-6 text-justify">
//             {paragraph}
//           </p>
//         ))}
//       </article>
 
//       {/* if a user is not authenticated, call to action to login or register to post comments*/}

//       <div className="flex flex-col items-center justify-center my-8">
//         <h2 className="text-lg font-semibold">Join the Conversation</h2>
//         <p className="text-gray-600">Login or Register to post comments</p>
//         <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Login / Register</div>
//       </div>
//     </section>
//   );
// }

// create a file for viewing all posts
import { createClient } from "@/utils/supabase/client";

export const metadata = {
  title: "SUGBUK | Posts",
  description: "View all posts",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SUGBUK | Posts",
    description: "View all posts",
    url: "https://sugbuk.com/posts",
    siteName: "SUGBUK",
    images: [
      {
        url: "https://sugbuk.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUGBUK",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUGBUK | Posts",
    description: "View all posts",
    images: ["https://sugbuk.com/images/og-image.png"],
    creator: "@sugbuk",
  },
  alternates: {
    canonical: "https://sugbuk.com/posts",
  },
  robots: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
  },
}

export default async function PostsPage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, cover_image, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading posts</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      <ul className="space-y-4">
        {data.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <a href={`/post/${post.slug}`} className="text-blue-600 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </a>
            <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}