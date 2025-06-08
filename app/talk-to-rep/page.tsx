import FeedbackForm from "@/components/feedback-form";
import { reportIssueText } from "@/constants/texts";

function StepNumber({ number }: { number: number }) {
  return (
    <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
      {number}
    </div>
  );
}

/**
   * The TalkToRep component renders a page where users can share feedback
   * with their representatives. It includes a feedback form and an explanation
   * of the steps taken after feedback submission.
*/

export default function TalkToRep() {
  return (
    <main className="w-full flex flex-col gap-10 sm:gap-20">
      <HeroSection />

      <section className="py-12 bg-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto flex flex-col gap-12">
            <div className="rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Submit Your Report</h2>
              <FeedbackForm />
            </div>

            <WhatHappensNext />
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-12 sm:px-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-center">{reportIssueText.title}</h1>
          <p className="text-lg md:text-xl text-center mt-4 max-w-2xl mx-auto opacity-90">
            {reportIssueText.description}
          </p>
        </div>
      </section>
  )
}

function WhatHappensNext() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What happens next?</h3>
            <ol className="space-y-4" aria-label="Steps explaining what happens after feedback submission">
              <li className="flex">
                <StepNumber number={1} />
                <div>
                  <p className="text-gray-700">Your feedback is reviewed by the relevant department representatives</p>
                </div>
              </li>
              <li className="flex">
                <StepNumber number={2} />
                <div>
                  <p className="text-gray-700">If you've provided contact details, we'll acknowledge receipt within 48 hours</p>
                </div>
              </li>
              <li className="flex">
                <StepNumber number={3} />
                <div>
                  <p className="text-gray-700">Your feedback is discussed in the next SUG meeting</p>
                </div>
              </li>
              <li className="flex">
                <StepNumber number={4} />
                <div>
                  <p className="text-gray-700">Updates on actions taken are published on our website</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}