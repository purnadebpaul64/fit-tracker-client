import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Logo from "../../Shared/Logo/Logo";
import { AlignJustify, ChartColumn, LogOut, Settings } from "lucide-react";
import MenuItem from "./Menu/Menuitem";
import AdminMenu from "./Menu/AdminMenu";
import TrainerMenu from "./Menu/TrainerMenu";
import MemberMenu from "./Menu/MemberMenu";
import useRole from "../../../Hooks/useRole";
const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-slate-700 text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <Logo></Logo>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-slate-700"
        >
          <AlignJustify className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-slate-700 mx-auto">
              <Link to="/">
                <Logo></Logo>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items */}
              {role === "customer" && <MemberMenu />}
              {role === "trainer" && <TrainerMenu />}
              {role === "admin" && <AdminMenu />}

              {/* <MenuItem
                icon={ChartColumn}
                label="Statistics"
                address="/dashboard"
              /> */}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={Settings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <LogOut className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
