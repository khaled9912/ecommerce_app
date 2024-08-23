export interface CartItemProps {
  productName: string;
  price: number;
  available: boolean;
  quantity: number;
}

export interface SliderTextProps {
  title: string;
  description: string;
  url: string;
}

export interface ProductProps {
  id: number;
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
