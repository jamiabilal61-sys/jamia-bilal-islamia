export const navigation = [
  {
    title: "صفحہ اول",
    href: "/",
  },

  {
    title: "جامعہ",
    children: [
      {
        title: "تعارف",
        href: "/about",
      },
      {
        title: "تاریخ",
        href: "/history",
      },
      {
        title: "مشن و وژن",
        href: "/mission",
      },
      {
        title: "انتظامیہ",
        href: "/leadership",
      },
    ],
  },

  {
    title: "شعبہ جات",
    href: "/departments",
  },

  {
    title: "داخلہ",
    href: "/admissions",
  },

  {
    title: "اساتذہ",
    href: "/faculty",
  },

  {
    title: "طلبہ",
    href: "/students",
  },

  {
    title: "لائبریری",
    href: "/library",
  },

  {
    title: "رابطہ",
    href: "/contact",
  },
] as const;