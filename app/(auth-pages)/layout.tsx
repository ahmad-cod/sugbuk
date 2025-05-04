export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col gap-12 items-start bg-gradient-to-b from-blue-50 to-white">{children}</div>
  );
}
