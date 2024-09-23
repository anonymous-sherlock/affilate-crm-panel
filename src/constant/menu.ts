import { ChartPie, Gauge, Gear, ProjectorScreenChart, TreeStructure, User, Users } from "@phosphor-icons/react/dist/ssr";
import { IconProps } from "@phosphor-icons/react";

export type SubMenuType = {
  label: string;
  link?: string;
  icon?: React.ComponentType<IconProps>;
  items?: SubMenuType[];
};

export type MenuItem = {
  label: string;

  subMenu?: SubMenuType[];
};

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    subMenu: [
      {
        label: "Overview",
        link: "/dashboard",
        icon: Gauge,
        items: [],
      },
    ],
  },
  {
    label: "Reports",
    subMenu: [
      {
        label: "Reports / Logs",
        icon: ProjectorScreenChart,

        items: [
          { label: "All Reports", link: "/reports" },
          { label: "Reports Kpi", link: "/reports/kpi" },
        ],
      },
    ],
  },
  {
    label: "Offers",
    subMenu: [
      {
        label: "All Offers",
        icon: ChartPie,

        items: [
          { label: "Create Offer", link: "/offers" },
          { label: "Approved Offers", link: "/offers/approved" },
          { label: "Pending Offers", link: "/offers/pending" },
          { label: "Rejected Offers", link: "/offers/rejected" },
        ],
      },
    ],
  },
  {
    label: "Affiliates",
    subMenu: [
      {
        label: "Affiliates",
        icon: Users,
        items: [
          { label: "Add Affiliate", link: "/affiliates" },
          { label: "Pending Affiliates", link: "/affiliates/pending" },
        ],
      },
    ],
  },

  {
    label: "Automation",
    subMenu: [
      {
        label: "Automation",
        icon: TreeStructure,
        items: [
          { label: "API Integration", link: "/widget/statistic" },
          { label: "Postback", link: "/widget/statistic" },
        ],
      },
    ],
  },
  {
    label: "Account",
    subMenu: [
      { label: "Profile", icon: User, link: "/profile" },
      { label: "Settings", icon: Gear, link: "/settings" },
    ],
  },
];
