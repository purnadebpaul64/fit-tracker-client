import {
  CircleDollarSign,
  CirclePlus,
  FileUser,
  Mails,
  Users,
} from "lucide-react";
import MenuItem from "./Menuitem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={Mails}
        label="Newsletter Subs"
        address="newsletter-subs"
      />
      <MenuItem icon={Users} label="All Trainers" address="all-trainers" />
      <MenuItem
        icon={FileUser}
        label="Applied Trainer"
        address="applied-trainer"
      />
      <MenuItem icon={CircleDollarSign} label="Balance" address="balance" />
      <MenuItem
        icon={CirclePlus}
        label="Add new Class"
        address="add-new-class"
      />
    </>
  );
};

export default AdminMenu;
