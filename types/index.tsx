export interface SliderTextProps {
  title: string;
  description: string;
  url: string;
}

export interface ProductProps {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CategoryItemProps {
  name: string;
  imgUrl: string;
}

export interface ProductCartProps {
  productId: string;
  quantity: number;
}
