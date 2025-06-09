import Image from "next/image";

interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    position: string;
    faculty: string;
    image: string;
    contact: string;
  };
}

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg duration-300 transition-shadow">
      <div className="h-64 bg-gray-100 relative overflow-hidden">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.position}`}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {member.name}
        </h3>
        <p className="text-blue-600 font-medium mb-2">{member.position}</p>
        <p className="text-gray-600 text-sm mb-3">{member.faculty}</p>
        <a
          href={`mailto:${member.contact}`}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {member.contact}
        </a>
      </div>
    </div>
  );
}