import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Settings,
  User,
  PhoneCall,
  MessagesSquare,
} from "lucide-react";
import { useAuthStore } from "@stores/useAuthStore";
import { useThemeStore } from "@stores/useThemeStore";

const NavBar = () => {
  const { logout, authUser } = useAuthStore();
  const { navBoutton, setNavBoutton } = useThemeStore();
  const navigate = useNavigate();

  const NAV_ITEMS = [
    {
      id: 1,
      name: "Chat",
      icon: MessagesSquare,
      action: () => {
        setNavBoutton(1);
        navigate("/");
      },
    },
    {
      id: 2,
      name: "Appels",
      icon: PhoneCall,
      action: () => {
        setNavBoutton(2);
        navigate("/call");
      },
    },
  ];

  return (
    <header
      className="
      fixed top-0 z-40 w-full
      backdrop-blur-md bg-base-100/80
      border-b border-base-300
    "
    >
      <div className="container mx-auto px-4 h-14 md:h-16">
        <div className="flex items-center justify-between h-full">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition"
          >
            <img src="./logo.svg" alt="Logo" className="w-9 h-9" />
            <span>ZChat</span>
          </Link>

          {/* NAV DESKTOP */}
          {authUser && (
            <ul className="hidden sm:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.id}
                  onClick={item.action}
                  className={`
                    flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg
                    transition-all duration-300
                    ${
                      navBoutton === item.id
                        ? "bg-primary text-primary-content shadow"
                        : "hover:bg-base-200"
                    }
                  `}
                >
                  <item.icon className="size-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          )}

          {/* ACTIONS DESKTOP */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/settings"
              onClick={() => setNavBoutton(0)}
              className="btn btn-sm btn-ghost gap-2"
            >
              <Settings className="size-5" />
              <span>Paramètres</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setNavBoutton(0)}
                  className="btn btn-sm btn-ghost gap-2"
                >
                  <User className="size-5" />
                  <span>Profil</span>
                </Link>

                <button
                  onClick={() => logout(authUser._id)}
                  className="btn btn-sm btn-error btn-outline gap-2"
                >
                  <LogOut className="size-5" />
                  <span>Déconnexion</span>
                </button>
              </>
            )}
          </div>

          {/* MENU MOBILE */}
          {authUser && (
            <div className="sm:hidden dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <ul
                className="
                dropdown-content menu
                bg-base-200 rounded-xl
                mt-3 w-44 p-2 shadow-lg gap-1
              "
              >
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button onClick={item.action} className="gap-2">
                      <item.icon className="size-5" />
                      {item.name}
                    </button>
                  </li>
                ))}

                <li>
                  <Link to="/profile" className="gap-2">
                    <User className="size-5" />
                    Profil
                  </Link>
                </li>

                <li>
                  <Link to="/settings" className="gap-2">
                    <Settings className="size-5" />
                    Paramètres
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => logout(authUser._id)}
                    className="gap-2 text-error"
                  >
                    <LogOut className="size-5" />
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
