export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stockCount: number;
  vendor: string;
  productImages: string[];
};

export type TCartProduct = {
  _id: string;
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    stockCount: number;
    vendor: string;
    productImages: string[];
  };
  user: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};
