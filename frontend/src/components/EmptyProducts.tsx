import Image from "next/image";
import Link from "next/link";

type EmptyProductsProps = {
  title: string;
  text: string;
  btnText: string;
};

export const EmptyProducts = (props: EmptyProductsProps) => {
  return (
    <div className="flex flex-[2] flex-col items-center pb-[50px] md:-mt-14">
      <Image
        src="/empty-cart.jpg"
        className="w-[300px] md:w-[400px]"
        width={300}
        height={300}
        alt="Пустая корзина"
      />
      <span className="text-xl font-semibold">{props.title}</span>
      <span className="mt-4 text-center">
        <td dangerouslySetInnerHTML={{ __html: props.text }} />
      </span>
      <Link
        href="/"
        className="mb-3 mt-8 rounded-full bg-black px-8 py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95"
      >
        {props.btnText}
      </Link>
    </div>
  );
};
