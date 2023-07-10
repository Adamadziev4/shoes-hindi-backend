type Thumbnail = {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
    };
  }[];
};

type Size = {
  data: {
    size: string;
    enabled: boolean;
  }[];
};

type Image = {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  }[];
};

type Product = {
  id: number;
  attributes: {
    name: string;
    subtitle: string;
    description: string;
    price: number;
    original_price: number;
    slug: string;
    size: Size;
    thumbnail: Thumbnail;
    image: Image;
  };
};

type Category = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    products?: {
      data: Product[];
    };
  };
};

type CartItem = {
  id: number;
  selectedSize: string;
  count: number;
  attributes: {
    name: string;
    subtitle: string;
    price: number;
    slug: string;
    size: Size;
    thumbnail: Thumbnail;
  };
};
