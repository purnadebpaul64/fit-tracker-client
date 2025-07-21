import { Link } from "react-router";
import MenuItem from "./Menuitem";
import {
  ChartNoAxesGantt,
  CirclePlus,
  History,
  House,
  MapPinHouse,
} from "lucide-react";
const TrainerMenu = () => {
  return (
    <>
      <MenuItem
        icon={ChartNoAxesGantt}
        label="Manage Slots"
        address="manage-slots"
      />
      <Link to={"/dashboard/add-new-slot"}>
        <MenuItem
          icon={CirclePlus}
          label="Add New slot"
          address="add-new-slot"
        />
      </Link>

      <MenuItem
        icon={CirclePlus}
        label="Add New Forum"
        address="add-new-forum"
      />
    </>
  );
};

export default TrainerMenu;
