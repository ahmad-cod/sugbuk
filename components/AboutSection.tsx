import { MessageCircle, Users, Calendar } from 'lucide-react';


// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 transform hover:scale-105 transition-all duration-500 animate-fadeInUp">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The <span className="font-semibold text-blue-600">Student Union Government of Bayero University Kano (SUGBUK)</span> is the official representative body for all students at BUK. We are dedicated to advocating for student rights, promoting student welfare, and fostering a vibrant campus community.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our mission is to ensure that every student's voice is heard and that their needs are addressed effectively. We work closely with the university administration to create a conducive learning environment and organize various events and activities that enrich the student experience.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Student Advocacy</h3>
                <p className="text-sm text-gray-600">Representing your interests</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Campus Events</h3>
                <p className="text-sm text-gray-600">Enriching student life</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Open Communication</h3>
                <p className="text-sm text-gray-600">Always here to listen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};