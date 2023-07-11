import React from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeItem,
  updateItemCount,
  updateItemSize,
} from "../../store/cartSlice";

type CartItemProps = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  size: Size;
  image: {
    name: string;
    url: string;
  };
  selectedSize: string;
  count: number;
};

const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CartItem = (props: CartItemProps) => {
  const dispatch = useDispatch();

  const changeCartItemSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateItemSize({ id: props.id, newSize: e.target.value }));
  };

  const changeCartItemCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      updateItemCount({ id: props.id, newCount: Number(e.target.value) })
    );
  };

  return (
    <div className="flex gap-3 border-b py-5 md:gap-5">
      <div className="aspect-square w-[90px] shrink-0 md:w-[120px]">
        <Image
          src={props.image.url}
          width={120}
          height={120}
          alt={props.image.name}
        />
      </div>

      <div className="flex w-full flex-col">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="text-lg font-semibold text-black/80 md:text-xl">
            {props.name}
          </div>
          <div className="md:text-md block text-sm font-medium text-black/50 md:hidden">
            {props.subtitle}
          </div>

          <div className="md:text-md mt-2 text-[15px] font-bold text-black/50">
            {props.price}p
          </div>
        </div>

        <div className="text-md hidden font-medium text-black/50 md:block">
          {props.subtitle}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="md:text-md flex flex-col items-baseline gap-2 text-sm text-black/50 sm:flex-row md:gap-10">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Размер:</div>
              <select
                className="hover:text-black"
                onChange={(e) => changeCartItemSize(e)}
              >
                {props.size.data.map((size) => (
                  <option
                    key={size.size}
                    selected={props.selectedSize === size.size}
                    disabled={!size.enabled && true}
                    value={size.size}
                  >
                    {size.size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Кол-во:</div>
              <select
                className="hover:text-black"
                onChange={(e) => changeCartItemCount(e)}
              >
                {counts.map((count) => (
                  <option
                    key={count}
                    selected={count === props.count}
                    value={count}
                  >
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-[20px] text-black/50 hover:text-black"
            onClick={() => dispatch(removeItem(props.id))}
          />
        </div>
      </div>
    </div>
  );
};
