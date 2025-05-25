interface PageProps {
  title: string;
}

export default function SectionTitle ({ title }: PageProps) {
  return (
    <h2 className="text-2xl font-semibold my-6 text-center md:text-left">{title}</h2>
  )
}