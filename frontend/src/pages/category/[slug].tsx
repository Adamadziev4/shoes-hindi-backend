import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { ProductCard } from "@/components/Product/ProductCard";
import { Wrapper } from "@/components/Wrapper";

import { fetchDataFromApi } from "utils/api";

import type { ParsedUrlQuery } from "querystring";
import type { GetStaticPaths, GetStaticProps } from "next";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type CategoryProps = {
  category: Category;
  products: {
    data: Product[];
    meta: any;
  };
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchDataFromApi("categories?populate=*");

  const paths = categories.data.map((category) => ({
    params: {
      slug: category.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const limitOnPage = 1;
export const getStaticProps: GetStaticProps<{
  category: Category;
}> = async ({ params }) => {
  const { slug } = params as Params; // Категория
  const category = await fetchDataFromApi(
    `categories?filters[slug][$eq]=${slug}`
  ); // Получаем категорию
  const products = await fetchDataFromApi(
    `products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=1`
  ); // Получаем товары этой категории

  return {
    props: {
      category: category.data[0],
      products,
      slug,
    },
    revalidate: 3600, // С такой переодичностью будет делаться запрос на сервер
  };
};

const Category = ({ category, products, slug }: CategoryProps) => {
  const [pageIndex, setPageIndex] = React.useState(1);
  const { query } = useRouter();

  React.useEffect(() => {
    setPageIndex(1);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    `products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${limitOnPage}`,
    fetchDataFromApi,
    { fallbackData: products }
  );
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="mx-auto mt-8 max-w-[800px] text-center md:mt-0">
          <div className="mb-5 text-[28px] font-semibold leading-tight md:text-[34px]">
            {category.attributes.name}
          </div>
        </div>

        <div className="my-14 grid grid-cols-1 gap-5 px-5 md:grid-cols-2 md:px-0 lg:grid-cols-3">
          {data?.data.map(({ attributes, id }) => (
            <ProductCard
              key={id}
              name={attributes.name}
              price={attributes.price}
              original_price={attributes.original_price}
              thumbnail={attributes.thumbnail}
              slug={attributes.slug}
            />
          ))}
        </div>

        {data?.meta.pagination.total > limitOnPage && (
          <div className="my-16 flex items-center justify-center gap-3 md:my-0">
            <button
              className={`rounded bg-black px-4 py-2 text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded bg-black px-4 py-2 text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}

        {isLoading && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-white/[0.5]">
            <img
              src={"/svg/logo.svg"}
              width={150}
              height={150}
              alt={"loading"}
            />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;
