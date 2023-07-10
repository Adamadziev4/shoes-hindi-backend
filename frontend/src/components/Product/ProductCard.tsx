import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getDiscountedPricePercentage } from "utils/helper";

type ProductCardProps = {
  name: string;
  price: number;
  original_price?: number;
  slug: string;
  thumbnail: Thumbnail;
};

export const ProductCard = (productData: ProductCardProps) => {
  return (
    <Link
      href={`/product/${productData.slug}`}
      className="transform cursor-pointer overflow-hidden bg-white shadow-sm duration-200 hover:scale-[1.02]"
    >
      <Image
        className="border"
        src={productData.thumbnail?.data[0].attributes.url}
        width={300}
        height={300}
        alt={productData.name}
        style={{ height: "360px", width: "100%" }}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{productData.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            {productData.price}&#8381;
          </p>
          {productData.original_price && (
            <>
              <p className="text-base font-medium line-through">
                {productData.original_price}&#8381;
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  productData.price,
                  productData.original_price
                )}
                %
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
