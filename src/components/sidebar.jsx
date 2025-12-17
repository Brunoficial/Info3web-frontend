import React from "react";
import logo from "../assets/logo.svg";
import homeIcon from "../assets/home-icon.svg";
import galleryIcon from "../assets/gallery-icon.svg";
import classIcon from "../assets/class-icon.svg";
import profileIcon from "../assets/profile-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { Icons } from "../assets/icons";


const navItems = [
  { label: "Home", icon: homeIcon, to: "/" },
  { label: "Galeria", icon: galleryIcon, to: "/galeria" },
  { label: "Turma", icon: classIcon, to: "/turma" },
  { label: "Perfil", icon: profileIcon, to: "/perfil" }
];


export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth()

  return (
    <aside className="fixed top-1/2 left-0 transform -translate-y-1/2 w-48 h-[720px] bg-white rounded-r-[40px] shadow-md flex flex-col items-center">
      <div className="flex items-center gap-4 mb-12 py-6">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-normal">INFO3WEB</h1>
      </div>

      <nav className="flex flex-col gap-12 w-full">
        {navItems.map(({ label, icon, to }) => {
          const isActive = location.pathname === to;

          return (
            <button
              key={label}
              onClick={() => navigate(to)}
              className={`flex cursor-pointer items-center gap-4 w-full px-4 py-3 transition-colors ${
                isActive
                  ? "bg-[#C18CEA4D] text-[#C18CEA] font-medium"
                  : "text-black hover:bg-gray-200 font-light"
              }`}
            >
              <img
                src={icon}
                alt={label}
                className={`w-5 h-5 ${
                  isActive ? "filter brightness-0 saturate-100" : ""
                }`}
              />
              <span className="text-base">{label}</span>
            </button>
          );
        })}

        <button className="flex font-medium cursor-pointer items-center gap-4 w-full px-4 py-3 transition-colors hover:text-white hover:bg-red-400" onClick={logout}><Icons.Logout/> Sair</button>
      </nav>
    </aside>
  );
}
