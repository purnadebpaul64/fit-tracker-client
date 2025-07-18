import { motion } from "framer-motion";
import {
  CirclePlus,
  CircleUser,
  Dumbbell,
  FileText,
  Gem,
  House,
  Menu,
  NotebookPen,
  UserSearch,
  X,
} from "lucide-react";
import { useState } from "react";
import { Skeleton, Tooltip } from "@material-tailwind/react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import avatarImg from "../../../assets/avatar.webp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  return (
    <div>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between h-16">
            <Logo></Logo>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <ul className="flex gap-5 px-1 font-bold">
                <NavLink
                  to={"/"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md hover:bg-[#1f253080]"
                >
                  <House className="h-4 w-4" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to={"/all-trainer"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <UserSearch className="h-4 w-4" />
                  <span>All Trainer</span>
                </NavLink>
                <NavLink
                  to={"/all-classes"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <NotebookPen className="h-4 w-4" />
                  <span>All Classes</span>
                </NavLink>
                <NavLink
                  to={"/community"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <Gem className="h-4 w-4" />
                  <span>Community</span>
                </NavLink>
                {loading ? (
                  <>
                    <div className="animate-pulse h-8 w-24 bg-white/10 rounded-md"></div>
                    <div className="animate-pulse h-8 w-24 bg-white/10 rounded-md"></div>
                  </>
                ) : (
                  user && (
                    <>
                      <NavLink
                        to="/dashboard"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <CirclePlus className="h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <CircleUser className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                    </>
                  )
                )}
              </ul>
            </div>

            {/* {user ? (
              <div className="hidden lg:flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt="profile"
                  />
                </div>
                <div
                  onClick={logOut}
                  className="btn cursor-pointer px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to={"/auth"}
                  className="btn px-3 py-2 rounded-md text-white hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to={"auth/register"}
                  className="btn px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Get Started
                </Link>
              </div>
            )} */}

            <div className="hidden lg:flex items-center space-x-4">
              {!loading ? (
                user ? (
                  <div className="flex items-center space-x-3">
                    <Tooltip
                      content={user.displayName}
                      placement="bottom"
                      offset={10}
                      className="z-[9999] bg-white text-black rounded-md shadow-md text-sm font-medium"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </Tooltip>

                    <button
                      className="btn cursor-pointer px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to={"/auth"}
                      className="btn px-3 py-2 rounded-md text-white hover:bg-white/10"
                    >
                      <p>Login</p>
                    </Link>
                    <Link
                      to={"/auth/registration"}
                      className="btn px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      Register
                    </Link>
                  </div>
                )
              ) : (
                <>
                  <div className="animate-pulse h-10 w-10 bg-white/10 rounded-full"></div>
                  <div className="animate-pulse h-8 w-24 bg-white/10 rounded-md"></div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/40 backdrop-blur-md rounded-lg mt-2 p-4"
            >
              <ul className="gap-5 py-2 font-bold">
                <NavLink
                  to={"/"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <House className="h-4 w-4" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to={"/all-trainer"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <UserSearch className="h-4 w-4" />
                  <span>All Trainer</span>
                </NavLink>
                <NavLink
                  to={"/all-classes"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <NotebookPen className="h-4 w-4" />
                  <span>All Classes</span>
                </NavLink>
                <NavLink
                  to={"/community"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <Gem className="h-4 w-4" />
                  <span>Community</span>
                </NavLink>
                {loading ? (
                  <>
                    <div className="animate-pulse h-8 w-24 bg-white/10 rounded-md"></div>
                    <div className="animate-pulse h-8 w-24 bg-white/10 rounded-md"></div>
                  </>
                ) : (
                  user && (
                    <>
                      <NavLink
                        to="/dashboard"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <CirclePlus className="h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <CircleUser className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                    </>
                  )
                )}
              </ul>
              {user ? (
                <div className="space-x-4 flex flex-col gap-3">
                  <Tooltip
                    content={user.displayName}
                    placement="right"
                    offset={10}
                    className="z-[9999] bg-white text-black rounded-md shadow-md text-sm font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer">
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </Tooltip>
                  <div
                    onClick={logOut}
                    className="btn cursor-pointer w-full text-center px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 mt-4">
                  <Link
                    to={"/auth"}
                    className="btn rounded-md text-center bg-white/5 text-white hover:bg-white/10 py-2 px-4"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"auth/register"}
                    className="btn w-full text-center px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.nav>
      ;
    </div>
  );
};

export default Navbar;
