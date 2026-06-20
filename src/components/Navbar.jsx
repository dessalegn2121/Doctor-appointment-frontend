import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import clsx from "clsx";

const roleToPath = {
  admin: "/admin",
  doctor: "/doctor-dashboard",
  patient: "/patient/dashboard",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-[0_4px_16px_rgba(15,23,42,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" className="navbar-brand">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#bfdbfe,#1d4ed8)] text-sm font-semibold text-white shadow-[0_6px_16px_rgba(37,99,235,0.45)]">
            TG
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-blue-700">Tepi General Hospital</span>
            <span className="text-xs text-slate-500">Doctor Appointment System</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              clsx(
                "relative pb-0.5 text-slate-600 transition duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-700 after:transition-[width] hover:-translate-y-px hover:text-blue-700",
                isActive && "text-blue-700 after:w-full",
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              clsx(
                "relative pb-0.5 text-slate-600 transition duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-700 after:transition-[width] hover:-translate-y-px hover:text-blue-700",
                isActive && "text-blue-700 after:w-full",
              )
            }
          >
            Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              clsx(
                "relative pb-0.5 text-slate-600 transition duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-700 after:transition-[width] hover:-translate-y-px hover:text-blue-700",
                isActive && "text-blue-700 after:w-full",
              )
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              clsx(
                "relative pb-0.5 text-slate-600 transition duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-700 after:transition-[width] hover:-translate-y-px hover:text-blue-700",
                isActive && "text-blue-700 after:w-full",
              )
            }
          >
            Contact
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  clsx(
                    "relative pb-0.5 text-slate-600 transition duration-150 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-700 after:transition-[width] hover:-translate-y-px hover:text-blue-700",
                    isActive && "text-blue-700 after:w-full",
                  )
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-blue-700 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-700 hover:text-white"
              >
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated && user && (
            <>
              <NavLink
                to={roleToPath[user.role] ?? "/"}
                className="inline-flex items-center justify-center rounded-full border border-blue-700 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-700 hover:text-white"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-blue-700 bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.3)] transition hover:from-blue-700 hover:to-blue-900"
                type="button"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-lg bg-transparent p-2 text-slate-600 transition hover:bg-slate-200 hover:text-blue-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          type="button"
        >
          <span className="sr-only">Open main menu</span>
          <span className="h-0.5 w-5 rounded-full bg-current" />
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-5 py-3 text-sm font-medium sm:px-6 lg:px-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                clsx(
                  "mb-1 block rounded-lg px-3 py-2 text-slate-700",
                  isActive && "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
                )
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                clsx(
                  "mb-1 block rounded-lg px-3 py-2 text-slate-700",
                  isActive && "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
                )
              }
              onClick={() => setIsOpen(false)}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                clsx(
                  "mb-1 block rounded-lg px-3 py-2 text-slate-700",
                  isActive && "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
                )
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                clsx(
                  "mb-1 block rounded-lg px-3 py-2 text-slate-700",
                  isActive && "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
                )
              }
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    clsx(
                      "mb-1 block rounded-lg px-3 py-2 text-slate-700",
                      isActive && "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
                    )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink to="/register" className="mb-1 block rounded-lg px-3 py-2 text-slate-700" onClick={() => setIsOpen(false)}>
                  Register
                </NavLink>
              </>
            )}

            {isAuthenticated && user && (
              <>
                <NavLink
                  to={roleToPath[user.role] ?? "/"}
                  className="mb-1 block rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 px-3 py-2 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="mb-1 block w-full rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 px-3 py-2 text-left text-white"
                  type="button"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

