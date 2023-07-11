import { useSelector } from "react-redux";

import { Wrapper } from "@/components/Wrapper";
import { EmptyProducts } from "@/components/EmptyProducts";
import { ProductCard } from "@/components/Product/ProductCard";

import type { RootState } from "store";

const Favorites = () => {
  const { favItems } = useSelector((state: RootState) => state.favorite);
  return (
    <Wrapper>
      <div className="mx-auto mt-8 max-w-[800px] text-center md:mt-12">
        <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">
          Избранное
        </div>
      </div>

      {favItems.length > 0 ? (
        <div className="my-14 grid grid-cols-1 gap-5 px-5 md:grid-cols-2 md:px-0 lg:grid-cols-3">
          {favItems.map(
            ({ name, price, slug, thumbnail, original_price }, i) => (
              <ProductCard
                key={i}
                name={name}
                price={price}
                original_price={original_price}
                thumbnail={thumbnail}
                slug={slug}
              />
            )
          )}
        </div>
      ) : (
        <EmptyProducts
          title="Избранное пусто"
          text="Кажется, вы ничего не добавили в избранное"
          btnText="На главную"
        />
      )}
    </Wrapper>
  );
};

export default Favorites;
