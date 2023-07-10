import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductCard } from "./Product/ProductCard";

type RecommendedProductsProps = {
  productList: Product[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const RecommendedProducts = ({
  productList,
}: RecommendedProductsProps) => {
  return (
    <div className="mb-[100px] mt-[50px] md:mb-0 md:mt-[100px]">
      <div className="mb-5 text-2xl font-bold">Вам может также понравиться</div>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
      >
        {productList.map(({ id, attributes }) => (
          <ProductCard
            key={id}
            name={attributes.name}
            price={attributes.price}
            slug={attributes.slug}
            original_price={attributes.original_price}
            thumbnail={attributes.thumbnail}
          />
        ))}
      </Carousel>
    </div>
  );
};
