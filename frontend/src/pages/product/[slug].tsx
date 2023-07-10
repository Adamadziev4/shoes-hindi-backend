import React from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { IoMdHeartEmpty } from "react-icons/io";
import { addToCart } from "store/cartSlice";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { ProductDetailsCarousel } from "@/components/Product/ProductDetailsCarousel";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { Wrapper } from "@/components/Wrapper";

import { fetchDataFromApi } from "utils/api";
import { getDiscountedPricePercentage } from "utils/helper";

import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next/types";

import "react-toastify/dist/ReactToastify.css";

type ProductDetailsProps = {
  product: Product;
  recProducts: Product[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const productList = await fetchDataFromApi("products?populate=*");

  const paths = productList.data.map((product) => ({
    params: {
      slug: product.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  product: Product;
  recProducts: Product[];
}> = async ({ params }) => {
  const { slug } = params as Params;
  const product = await fetchDataFromApi(
    `products?populate=*&filters[slug][$eq]=${slug}`
  );

  const recProducts = await fetchDataFromApi(
    `products?populate=*&filters[slug][$ne]=${slug}`
  );

  return {
    props: { product: product.data[0], recProducts: recProducts.data },
  };
};

const ProductDetails: NextPage<ProductDetailsProps> = ({
  product,
  recProducts,
}) => {
  const [selectedSize, setSelectedSize] = React.useState("");
  const [showError, setShowError] = React.useState(false);

  const dispatch = useDispatch();

  const onClickAddCart = () => {
    if (!selectedSize) {
      setShowError(true);
      document.getElementById("sizeGrid")?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    } else {
      dispatch(addToCart({ product, selectedSize }));
      notify();
    }
  };

  const notify = () => {
    toast.success("Товар добавлен в корзину", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <ToastContainer />

        <div className="flex flex-col gap-[50px] font-noto md:px-10 lg:flex-row lg:gap-[100px]">
          <div className="mx-auto w-full max-w-[500px] flex-[1.5] md:w-auto lg:mx-0 lg:max-w-full">
            <ProductDetailsCarousel images={product.attributes.image} />
          </div>
          <div className="flex-[1] py-3">
            <div className="mb-3 text-[34px] font-semibold leading-10">
              {product.attributes.name}
            </div>

            <div className="mb-4 text-[15px] font-medium">
              {product.attributes.subtitle}
            </div>

            <div className="flex items-center">
              <p className="mr-4 text-lg font-medium">
                {product.attributes.price}₽
              </p>
              {product.attributes.original_price && (
                <>
                  <p className="text-[15px] font-medium line-through">
                    {product.attributes.original_price}₽
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(
                      product.attributes.original_price,
                      product.attributes.price
                    )}
                    %
                  </p>
                </>
              )}
            </div>

            <div className="text-[15px] font-normal text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="mb-20 text-[15px] font-normal text-black/[0.5]">
              {`(Also includes all applicable duties)`}
            </div>

            <div className="mb-10">
              <div className="mb-2 flex justify-between">
                <div className="text-md font-semibold">Выберите размер</div>
                <div className="text-md cursor-pointer font-normal text-black/[0.5]">
                  Как выбрать?
                </div>
              </div>

              <div id="sizeGrid" className="grid grid-cols-3 gap-2">
                {product.attributes.size.data.map(({ size, enabled }) => (
                  <div
                    key={size}
                    className={`${
                      enabled
                        ? "cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } rounded-md border py-3 text-center font-medium hover:border-black ${
                      selectedSize === size && enabled ? "border-black" : ""
                    }`}
                    onClick={() => {
                      if (enabled) {
                        setSelectedSize(size);
                        setShowError(false);
                      }
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>

              {showError && (
                <div className="mt-2 font-normal text-red-600">
                  Выберите размер!
                </div>
              )}
            </div>

            <button
              className="mb-3 w-full rounded-full bg-black py-4 text-lg font-medium
            text-white transition-transform hover:opacity-75 active:scale-95"
              onClick={onClickAddCart}
            >
              Добавить в корзину
            </button>

            <button
              className="mb-10 flex w-full items-center justify-center gap-2 rounded-full
              border border-black py-4 text-lg font-medium transition-transform hover:opacity-75 active:scale-95"
            >
              В избранное
              <IoMdHeartEmpty size={20} />
            </button>

            <div>
              <div className="mb-5 text-lg font-bold">Описание товара</div>
              <div className="markdown text-md-mb-5">
                <ReactMarkdown>{product.attributes.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        <RecommendedProducts productList={recProducts} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
