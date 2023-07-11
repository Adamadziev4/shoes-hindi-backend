import React from "react";
import { useSelector } from "react-redux";
import { CartItem } from "@/components/CartItem";
import { Wrapper } from "@/components/Wrapper";
import type { RootState } from "store";
import { EmptyProducts } from "@/components/EmptyProducts";

const Cart = () => {
  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            <div className="mx-auto mt-8 max-w-[800px] text-center md:mt-0">
              <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">
                Корзина
              </div>
            </div>

            <div className="flex flex-col gap-12 py-10 lg:flex-row">
              <div className="flex-[2]">
                <div className="text-lg font-semibold">Товары в корзине</div>
                {cartItems.map(({ attributes, selectedSize, id, count }) => (
                  <CartItem
                    key={id}
                    id={id}
                    name={attributes.name}
                    subtitle={attributes.subtitle}
                    price={attributes.price}
                    size={attributes.size}
                    image={attributes.thumbnail.data[0].attributes}
                    selectedSize={selectedSize}
                    count={count}
                  />
                ))}
              </div>

              <div className="flex-[1]">
                <div className="text-lg font-semibold">Оплата</div>

                <div className="my-5 rounded-xl bg-black/[0.05] p-5">
                  <div className="flex justify-between">
                    <div className="text-md font-medium uppercase text-black md:text-lg">
                      К оплате:
                    </div>
                    <div className="text-md font-medium text-black md:text-lg">
                      {totalPrice} р
                    </div>
                  </div>
                  <div className="md:text-md mt-5 border-t py-5 text-sm">
                    Промежуточный итог отражает общую стоимость вашего заказа,
                    включая пошлины и налоги, с учетом скидок. Сюда не входят
                    расходы на доставку и сборы за международные транзакции.
                  </div>
                </div>

                <button className="transition-transorm mb-3 w-full rounded-full bg-black py-4 text-lg font-medium text-white hover:opacity-75 active:scale-95">
                  Оплатить
                </button>
              </div>
            </div>
          </>
        ) : (
          <EmptyProducts
            title="Ваша корзина пуста"
            text={
              "Кажется, вы ничего не добавили в свою корзину. </br> Перейдите в раздел &quot;Категории&quot; и выберите понравившийся товар"
            }
            btnText="Продолжить покупки"
          />
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
