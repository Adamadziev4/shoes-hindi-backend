import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { navList } from "./Menu";

type MobileMenuProps = {
  showCategoryMenu: boolean;
  setShowCategoryMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  categories?: Category[];
};

export const MobileMenu = ({
  showCategoryMenu,
  setShowCategoryMenu,
  setMobileMenu,
  categories,
}: MobileMenuProps) => {
  return (
    <ul className="h-[calc(100vh - 50px)] absolute left-0 top-[50px] flex w-full flex-col border-t bg-white font-bold text-black md:hidden">
      {navList.map((item) => (
        <React.Fragment key={item.id}>
          {item.subMenu ? (
            <li
              className="relative flex cursor-pointer flex-col border-b px-5 py-4"
              onClick={() => setShowCategoryMenu((prev) => !prev)}
            >
              <div className="flex items-center justify-between">
                {item.name}
                <BsChevronDown size={14} />
              </div>

              {showCategoryMenu && (
                <ul className="-mx-5 -mb-4 mt-4 bg-black/[0.03]">
                  {categories?.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.attributes.slug}`}
                      onClick={() => {
                        setShowCategoryMenu(false);
                        setMobileMenu(false);
                      }}
                    >
                      <li className="flex justify-between border-t px-8 py-4">
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
            <Link
              className="border-b px-5 py-4"
              href={item.url}
              onClick={() => setMobileMenu(false)}
            >
              <li>{item.name}</li>
            </Link>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};
