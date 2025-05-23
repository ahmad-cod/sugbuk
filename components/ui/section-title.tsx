interface PageProps {
  title: string;
}

export default function SectionTitle ({ title }: PageProps) {
  return (
    <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">{title}</h2>
  )
}