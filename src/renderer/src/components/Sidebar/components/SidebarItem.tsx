import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: any;
  label: string;
}

export const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = to === "/" ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-lg ${isActive ? "bg-[#201E2C] border-r-4 border-primary cursor-default" : "hover:bg-[#201E2C]"
        } text-white cursor-pointer`}
    >
      <span className={`${isActive ? "text-primary" : "text-gray-500"} mr-3`}>{icon}</span>
      <span className={`${isActive ? "text-primary" : "text-gray-500"}`}>{label}</span>
    </Link>
  );
};
