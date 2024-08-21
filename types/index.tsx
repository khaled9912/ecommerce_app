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
  imgUrl: string;
  name: string;
  description: string;
  price: number;
}

export interface CategoryItemProps {
  imgUrl: string;
  name: string;
}
