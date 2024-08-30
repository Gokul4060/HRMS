import React from "react";
import { MdDashboard, MdSettings } from "react-icons/md";
import {
  FaCalendarAlt,
  FaUsers,
  FaDeezer,
  FaUserAlt,
  FaTrash,
} from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../../redux/slices/authSlice";
import clsx from "clsx";
import logoCapz from "../../assets/logoCapz.png";

const adminLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Profile",
    link: "profile",
    icon: <FaUserAlt />,
  },

  {
    label: "User Management",
    link: "allEmployee",
    icon: <FaUsers />,
  },

  {
    label: "Project",
    link: "project",
    icon: <FaDeezer />,
  },
  {
    label: "Deleted Records",
    link: "trash",
    icon: <FaTrash />,
  },
];

const userLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Profile",
    link: "profile",
    icon: <FaUserAlt />,
  },

  {
    label: "Attendance",
    link: "attendance",
    icon: <FaUserAlt />,
  },

  {
    label: "Leaves",
    link: "leave",
    icon: <FaCalendarAlt />,
  },

  {
    label: "Project",
    link: "task",
    icon: <FaDeezer />,
  },
];

const managerLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Profile",
    link: "profile",
    icon: <FaUserAlt />,
  },

  {
    label: "Leave request",
    link: "request-messages",
    icon: <FaCalendarAlt />,
  },
  {
    label: "Attendance-Record",
    link: "attendance-record",
    icon: <FaCalendarAlt />,
  },
  {
    label: "Project",
    link: "task",
    icon: <FaDeezer />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  let sidebarLinks = [];
  if (user.isAdmin) {
    sidebarLinks = adminLinks;
  } else if (user.isManager) {
    sidebarLinks = managerLinks;
  } else {
    sidebarLinks = userLinks;
  }

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full flex gap-2 px-4 py-3 rounded-full items-center text-gray-800 text-base hover:bg-[#3ea053fe]",
          path === el.link ? "bg-customplam text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-grey-600">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-white lg:max-w-xs ">
      <div className="flex items-center gap-2">
        <img src={logoCapz} className="p-4 w-40 h-auto" alt="Logo" />
      </div>
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800 hover:bg-[#3ea053fe] rounded-full">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
