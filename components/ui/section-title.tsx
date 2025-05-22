interface PageProps {
  title: string;
}

export default function SectionTitle ({ title }: PageProps) {
  return (
    <h2 className="text-3xl font-bold">{title}</h2>
  )
}