export type MenuItem = {
  title: string;
  href: string;
  children?: MenuItem[];
};

export const menu: MenuItem[] = [
  {
    title: "صفحہ اول",
    href: "/",
  },

  {
    title: "تعارف",
    href: "/about",
  },

  {
    title: "شعبہ جات",
    href: "/departments",

    children: [
      {
        title: "درس نظامی",
        href: "/departments/dars-e-nizami",
      },

      {
        title: "حفظ القرآن",
        href: "/departments/hifz",
      },

      {
        title: "دارالافتاء",
        href: "/departments/fatwa",
      },

      {
        title: "کمپیوٹر سائنس",
        href: "/departments/computer",
      },
    ],
  },

  {
    title: "رابطہ",
    href: "/contact",
  },
];