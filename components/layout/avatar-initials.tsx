
const sanitize = (name: string) => {}

const AvatarInitials = ({ firstname, lastname }: { firstname: string; lastname: string }) => {
  const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-medium">
      {initials}
    </div>
  );
};

export default AvatarInitials;