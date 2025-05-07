import { Home, Kanban, Settings, ClipboardList, Users, LogOut } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Funil", icon: Kanban, path: "/funil" },
  { label: "Atividades", icon: ClipboardList, path: "/atividades" },
  { label: "Clientes", icon: Users, path: "/clientes" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
  { label: "Sair", icon: LogOut, path: "/logout" },
];

export default function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="h-screen bg-slate-900 text-white flex flex-col transition-all duration-300 w-fit">
      <div className="flex items-center justify-between p-4">
        <img src="/logo/vdois.png" alt="Logo" className="h-8" />
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-white ml-2"
        >
          ☰
        </button>
      </div>
      <nav className="flex flex-col gap-2 px-2 py-4">
        {menuItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname.startsWith(path) && path !== "/logout";
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded transition hover:bg-slate-800 ${
                isActive ? "bg-slate-800 text-blue-400" : ""
              }`}
              title={!isExpanded ? label : ""}
            >
              <Icon className="w-5 h-5" />
              {isExpanded && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}