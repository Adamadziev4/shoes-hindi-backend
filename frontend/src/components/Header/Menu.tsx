import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

type MenuProps = {
  showCategoryMenu: boolean;
  setShowCategoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
  categories?: Category[];
};
type MenuList = {
  id: number;
  name: string;
  url: string;
  subMenu?: boolean;
};

export const navList: MenuList[] = [
  { id: 1, name: "Главная", url: "/" },
  // { id: 2, name: "О нас", url: "/about" },
  { id: 3, name: "Категории", url: "", subMenu: true },
  { id: 4, name: "Контакты", url: "/contact" },
];

export const Menu = ({
  showCategoryMenu,
  setShowCategoryMenu,
  categories,
}: MenuProps) => {
  return (
    <ul className="hidden items-center gap-8 font-medium text-black md:flex">
      {navList.map((item) => (
        <React.Fragment key={item.id}>
          {item.subMenu ? (
            <li
              className="relative flex cursor-pointer items-center gap-2"
              onMouseEnter={() => setShowCategoryMenu(true)}
              onMouseLeave={() => setShowCategoryMenu(false)}
              // onClick={() => setShowCategoryMenu((prev) => !prev)}
            >
              {item.name}
              <BsChevronDown size={14} />

              {showCategoryMenu && (
                <ul className="absolute left-0 top-6 min-w-[250px] bg-white px-1 py-1 text-black shadow-lg">
                  {categories?.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.attributes.slug}`}
                      onClick={() => setShowCategoryMenu(false)}
                    >
                      <li className="flex h-12 items-center justify-between rounded-md px-3 hover:bg-black/[0.03]">
                        {category.attributes.name}
                        <span className="text-sm opacity-50">
                          {`(${category.attributes.products?.data.length})`}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <Link href={item.url}>
              <li className="cursor-pointer">{item.name}</li>
            </Link>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};
