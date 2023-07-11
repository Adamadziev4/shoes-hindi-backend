import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import { Menu } from "./Menu";
import { MobileMenu } from "./MobileMenu";
import { Wrapper } from "../Wrapper";

import { fetchDataFromApi } from "utils/api";

import type { RootState } from "store";

type ShowType = "translate-y-0" | "-translate-y-[80px]" | "shadow-sm";

export const Header = () => {
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = React.useState(false);
  const [show, setShow] = React.useState<ShowType>("translate-y-0"); // isHeaderActive
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const { cart, favorite } = useSelector((state: RootState) => state);

  const controlMenu = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", controlMenu);

    return () => {
      window.removeEventListener("scroll", controlMenu);
    };
  });

  React.useEffect(() => {
    fetchDataFromApi("categories?populate=*").then((res) =>
      setCategories(res.data)
    );
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 flex h-[70px] w-full items-center justify-between bg-white shadow-sm transition-transform duration-300 md:h-[80px] ${show}`}
    >
      <Wrapper className="flex h-[60px] items-center justify-between">
        <Link href="/">
          <Image
            src="/svg/logo.svg"
            width={40}
            height={40}
            alt="sneaker"
            className="w-[45px] md:w-[50px]"
          />
        </Link>

        <Menu
          showCategoryMenu={showCategoryMenu}
          setShowCategoryMenu={setShowCategoryMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MobileMenu
            showCategoryMenu={showCategoryMenu}
            setShowCategoryMenu={setShowCategoryMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-5 text-black">
          <Link
            href={"/favorites"}
            className="relative flex h-8 w-8 cursor-pointer items-center
            justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12"
          >
            <IoMdHeartEmpty className="text-[24px] md:text-[27px] " />
            {favorite.favItems.length > 0 && (
              <div
                className="md:text[12px] absolute left-5 top-0 flex h-[15px] min-w-[15px]
              items-center justify-center rounded-full bg-red-600 pl-[1.5px]
              text-[12px] text-white md:left-7 md:top-0.5 md:h-[20px] md:min-w-[20px]"
              >
                {favorite.favItems.length}
              </div>
            )}
          </Link>

          <Link
            href={"/cart"}
            className="relative flex h-8 w-8 cursor-pointer items-center
            justify-center rounded-full hover:bg-black/[0.05] md:h-12 md:w-12"
          >
            <BsCart className="text-[21px] md:text-[25px] " />
            {cart.cartItems.length > 0 && (
              <div
                className="md:text[12px] absolute left-5 top-0 flex h-[16px] min-w-[16px]
              items-center justify-center rounded-full bg-red-600 pl-[1.5px]
              text-[10px] text-white md:left-7 md:top-1 md:h-[20px] md:min-w-[20px]"
              >
                {cart.cartItems.length}
              </div>
            )}
          </Link>

          <div
            className="relative -mr-2 flex h-8 w-8 cursor-pointer
            items-center justify-center rounded-full hover:bg-black/[0.05] md:hidden"
          >
            {mobileMenu ? (
              <VscChromeClose
                className="text-[20px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[24px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};
