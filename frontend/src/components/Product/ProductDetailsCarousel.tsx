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
            key={id}
            src={attributes.url}
            width={500}
            height={500}
            sizes="100%"
            alt="shoe"
          />
        ))}
      </Carousel>
    </div>
  );
};
