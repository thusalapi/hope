import {
  IoMdHome,
  IoIosPeople,
  IoMdAnalytics,
  IoIosPerson,
} from "react-icons/io";

export interface NavItem {
  icon: React.ReactNode;
  text: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: <IoMdHome />, text: "Dashboard", path: "/dashboard" },
  { icon: <IoIosPeople />, text: "Sessions", path: "/instructorSessions" },
  { icon: <IoMdAnalytics />, text: "Reports", path: "/reports" },
  { icon: <IoIosPerson />, text: "Profile", path: "/profile" },
];
