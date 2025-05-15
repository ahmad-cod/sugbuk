"use client"
import { useState } from 'react'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/image-upload'

interface ReportFormData {
  title: string
  description: string
  recommendation?: string
  image_urls?: string[]
  is_private: boolean
}

export default function Report() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    recommendation: '',
    image_urls: [],
    is_private: false,
  })

  const supabase = createClient()

  const handleImageUpload = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      image_urls: urls
    }))
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }
  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const submitData = {
      ...formData,
      created_at: new Date().toISOString()
    }
    console.log('Submitting report...')
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([submitData])
        .select()
      if (error) throw error
      
      // Redirect to the report list page
      router.push('/reports')
      // router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred while submitting the report.')
    } finally {
      setIsSubmitting(false)
    }

    console.log('Report submitted successfully')

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }))
  }

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);


//   return (
//     <section className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Report an Issue</h1>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col">
//           <label htmlFor="title" className="mb-1">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="border rounded p-2"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="description" className="mb-1">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="border rounded p-2 min-h-[100px]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="recommendation" className="mb-1">Recommendation</label>
//           <textarea
//             id="recommendation"
//             name="recommendation"
//             value={formData.recommendation}
//             onChange={handleChange}
//             className="border rounded p-2 min-h-[100px]"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="file" className="mb-1">Upload File</label>
//           {/* <CldUploadButton
//             uploadPreset="bukstudent-uploads"
//             options={{ maxFiles: 1 }}
//             onUpload={(result) => {
//               console.log('File uploaded:', result)
//             }}
//             className="border rounded p-2 bg-gray-100 hover:bg-gray-200"
//           >
//             Choose File
//           </CldUploadButton> */}
//           {/* <CldUploadButton
//             // signatureEndpoint="/api/sign-cloudinary-params"
//             uploadPreset="bukstudent-uploads"
//           /> */}
          
//         </div>


//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="is_private"
//             name="is_private"
//             checked={formData.is_private}
//             onChange={handleChange}
//             className="rounded"
//           />
//           <label htmlFor="is_private">Make this report private</label>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//         >
//           { isSubmitting ? 'Submitting...' : 'Submit Report' }
//         </button>
//       </form>
//     </section>
//   )
// }





return (
  <div>
    <h1>New Report</h1>
    {step === 1 && (
      <div>
        <h2>Step 1: Basic Info</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button onClick={nextStep}>Next</button>
      </div>
    )}
    {step === 2 && (
      <div>
        <h2>Step 2: Upload Images</h2>
        <ImageUpload onUpload={handleImageUpload} />
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    )}
    {step === 3 && (
      <div>
        <h2>Step 3: Review</h2>
        <p>Title: {formData.title}</p>
        <p>Description: {formData.description}</p>
        <p>Images: {formData.image_urls?.length} uploaded</p>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    )}
  </div>
);
}