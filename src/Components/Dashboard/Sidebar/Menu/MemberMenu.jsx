import { useState } from "react";
// import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
import MenuItem from "./Menuitem";
import { Activity, ClockArrowUp, User } from "lucide-react";
const MemberMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  //   const closeModal = () => {
  //     setIsOpen(false);
  //   };

  return (
    <>
      <MenuItem icon={Activity} label="Activity Log" address="activity-log" />
      <MenuItem icon={User} label="Your Profile" address="your-profile" />
      <MenuItem
        icon={ClockArrowUp}
        label="Booked Trainer"
        address="booked-trainer"
      />

      {/* <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <ShieldUser className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div> */}

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  );
};

export default MemberMenu;
