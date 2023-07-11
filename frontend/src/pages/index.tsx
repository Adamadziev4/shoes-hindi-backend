import React from "react";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard } from "@/components/Product/ProductCard";
import { Wrapper } from "@/components/Wrapper";
import { fetchDataFromApi } from "utils/api";
import type { ProductResponse } from "utils/api";

type HomeProps = {
  productList: Product[];
};

export const getStaticProps = async () => {
  const productList: ProductResponse = await fetchDataFromApi(
    "products?populate=*"
  );

  return {
    props: {
      productList: productList.data,
    },
  };
};

export const Home = ({ productList }: HomeProps) => {
  return (
    <main>
      <HeroBanner />
      <Wrapper>
        <div className="mx-auto my-[50px] max-w-[800px] text-center md:my-[80px]">
          <div className="leadeing-tight mb-5 text-[28px] font-[600] leading-10 md:text-[34px]">
            Магазин кроссовок Sneakers
          </div>
          <div className="text-md md:text-lg">
            Ниже вы можете увидеть часть нашего ассортимента <br />
            Перейдите в Каталог, чтобы увидеть больше
          </div>
        </div>

        <div className="my-14 grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
          {productList.map(({ id, attributes }) => (
            <ProductCard
              key={id}
              name={attributes.name}
              price={attributes.price}
              original_price={attributes.original_price}
              slug={attributes.slug}
              thumbnail={attributes.thumbnail}
            />
          ))}
        </div>
      </Wrapper>
    </main>
  );
};

export default Home;
