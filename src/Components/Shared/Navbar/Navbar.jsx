import { motion } from "framer-motion";
import {
  Dumbbell,
  FileText,
  Gem,
  House,
  Menu,
  NotebookPen,
  UserSearch,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../Providers/AuthProviders";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logOut } = useContext(AuthContext);
  return (
    <div>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4">
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
                  to={"/all-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <UserSearch className="h-4 w-4" />
                  <span>All Trainer</span>
                </NavLink>
                <NavLink
                  to={"/featured-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <NotebookPen className="h-4 w-4" />
                  <span>All Classes</span>
                </NavLink>
                <NavLink
                  to={"/featured-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <Gem className="h-4 w-4" />
                  <span>Community</span>
                </NavLink>
                {loading ? (
                  <>
                    <div className="skeleton h-8 w-24 rounded-md"></div>
                    <div className="skeleton h-8 w-24 rounded-md"></div>
                  </>
                ) : (
                  user && (
                    <>
                      <NavLink
                        to="/add-blog"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <CirclePlus className="h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/wishlist"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <BookmarkCheck className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                    </>
                  )
                )}
              </ul>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="btn px-3 py-2 rounded-md text-white hover:bg-white/10">
                Sign In
              </button>
              <button className="btn px-3 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
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
              className="md:hidden bg-black/40 backdrop-blur-md rounded-lg mt-2 p-4"
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
                  to={"/all-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <UserSearch className="h-4 w-4" />
                  <span>All Trainer</span>
                </NavLink>
                <NavLink
                  to={"/featured-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <NotebookPen className="h-4 w-4" />
                  <span>All Classes</span>
                </NavLink>
                <NavLink
                  to={"/featured-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                >
                  <Gem className="h-4 w-4" />
                  <span>Community</span>
                </NavLink>
                {loading ? (
                  <>
                    <div className="skeleton h-8 w-24 rounded-md"></div>
                    <div className="skeleton h-8 w-24 rounded-md"></div>
                  </>
                ) : (
                  user && (
                    <>
                      <NavLink
                        to="/add-blog"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <CirclePlus className="h-4 w-4" />
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/wishlist"
                        className="flex items-center space-x-1 text-[#757D85] hover:text-[#f4f8fb] transition-colors font-medium px-3 py-2 rounded-md "
                      >
                        <BookmarkCheck className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                    </>
                  )
                )}
              </ul>
              <div className="flex flex-col space-y-4 mt-4">
                <button className="btn text-white hover:bg-white/10 py-2 px-4">
                  Sign In
                </button>
                <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      ;
    </div>
  );
};

export default Navbar;
