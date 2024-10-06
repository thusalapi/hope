import {
  IoMdHome,
  IoIosPeople,
  IoMdAnalytics,
  IoIosPerson,
  IoIosTime,
} from "react-icons/io";

export interface NavItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: <IoMdHome />, text: "Dashboard", path: "/dashboard" },
  { icon: <IoIosTime />, text: "Sessions", path: "/instructorSessions" },
  { icon: <IoMdAnalytics />, text: "Grades", path: "/viewgrades" },
  { icon: <IoIosPerson />, text: "Profile", path: "/profile" },
  { icon: <IoIosPeople />, text: "Users", path: "/users" },
  { icon: <IoIosPeople />, text: "My codes", path: "/sessionlist" },
];
