import { ArrowLeft, Menu } from "lucide-react";

interface HeaderProps {
  isOpen: boolean; 
  toggleSidebar: () => void; 
}

export const Header: React.FC<HeaderProps> = ({isOpen, toggleSidebar}) => {
  return (
    <header className="flex items-center justify-between py-3 px-8 bg-foreground text-white  shadow-md">
      <div className="flex items-center space-x-4">
        <button className="text-primary cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? <ArrowLeft /> :  <Menu size={24} />}
        </button>
      </div>
      <div className="flex items-center space-x-4">
          Perfil
      </div>
    </header>
  );
};
