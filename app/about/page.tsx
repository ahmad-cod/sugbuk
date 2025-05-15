import TeamMember from "@/components/team-member";

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Abdullahi Usman Baba",
      position: "President",
      faculty: "Faculty of Engineering",
      image: "/images/team/president.jpg",
      contact: "president@sugbuk.org"
    },
    {
      id: 2,
      name: "Amina Yusuf",
      position: "Vice President",
      faculty: "Faculty of Social Sciences",
      image: "/images/team/vp.jpg",
      contact: "vp@sugbuk.org"
    },
    {
      id: 3,
      name: "Fatima Ahmad",
      position: "General Secretary",
      faculty: "Faculty of Law",
      image: "/images/team/secretary.jpg",
      contact: "secretary@sugbuk.org"
    },
    {
      id: 4,
      name: "Mohammed Ali",
      position: "Financial Secretary",
      faculty: "Faculty of Management Sciences",
      image: "/images/team/finance.jpg",
      contact: "finance@sugbuk.org"
    }
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">About SUGBUK</h1>
          <p className="text-lg md:text-xl text-center mt-4 max-w-2xl mx-auto opacity-90">
            Learn about the Student Union Government of Bayero University Kano and the team representing you.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              The Student Union Government of Bayero University Kano (SUGBUK) exists to represent, protect, and advance the interests of all students at BUK. We strive to create a campus environment where every student's voice is heard, rights are protected, and university experience is enriched through advocacy, activities, and services.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Transparency</h3>
                <p className="text-gray-700">
                  We operate with full transparency in our decisions, actions, and use of resources.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Inclusivity</h3>
                <p className="text-gray-700">
                  We ensure all students, regardless of background, are represented and included.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Accountability</h3>
                <p className="text-gray-700">
                  We hold ourselves accountable to the student body and fulfill our commitments.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}