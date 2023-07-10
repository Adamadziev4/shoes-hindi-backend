import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type ProductDetailsCarouselProps = {
  images: Image;
};

export const ProductDetailsCarousel = ({
  images,
}: ProductDetailsCarouselProps) => {
  return (
    <div className="sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px] text-white">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.data.map(({ id, attributes }) => (
          <img
            width={100}
            height={100}
            key={id}
            src={attributes.url}
            alt="shoe"
          />
        ))}
      </Carousel>
    </div>
  );
};
