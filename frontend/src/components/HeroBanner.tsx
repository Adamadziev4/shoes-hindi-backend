import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const HeroBanner = () => {
  return (
    <div className="relative mx-auto w-full max-w-[1360px] text-[20px] text-white md:mt-4">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        renderArrowPrev={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute bottom-0 right-[31px] z-10 flex h-[30px] w-[30px] cursor-pointer items-center
            justify-center bg-black hover:opacity-90 md:right-[51px] md:h-[50px] md:w-[50px]"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute bottom-0 right-0 z-10 flex h-[30px] w-[30px] cursor-pointer items-center
              justify-center bg-black hover:opacity-90 md:h-[50px] md:w-[50px]"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        <div>
          <Image
            width={1360}
            height={600}
            className="aspect-[16/10] object-cover md:aspect-auto"
            src="/sliders/slide-1.jpg"
            alt="sneaker"
          />
          <Link
            href={"/category/kedy"}
            className="absolute bottom-[25px] left-0 cursor-pointer bg-white px-[15px] py-[10px]
            text-[15px] font-medium uppercase text-black/[0.9] hover:opacity-90 md:bottom-[75px] md:px-[40px] md:py-[25px] md:text-[30px]"
          >
            В каталог
          </Link>
        </div>
        <div>
          <Image
            width={1360}
            height={600}
            className="aspect-[16/10] object-cover md:aspect-auto"
            src="/sliders/slide-2.jpg"
            alt="sneaker"
          />
          <Link
            href={"/category/kedy"}
            className="absolute bottom-[25px] left-0 cursor-pointer bg-white px-[15px] py-[10px]
            text-[15px] font-medium uppercase text-black/[0.9] hover:opacity-90 md:bottom-[75px] md:px-[40px] md:py-[25px] md:text-[30px]"
          >
            В Каталог
          </Link>
        </div>
      </Carousel>
    </div>
  );
};
