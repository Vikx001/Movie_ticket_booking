import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon, 
  RectangleStackIcon,
  CheckBadgeIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Courses, Notifications } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "customers",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <CheckBadgeIcon {...icon} />,
        name: "courses",
        path: "/courses",
        element: <Courses />,
      },
      {
        icon: <PencilSquareIcon {...icon} />,
        name: "enrollments",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  }
];

export default routes;
