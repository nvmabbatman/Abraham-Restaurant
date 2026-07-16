export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'kebabs' | 'mains' | 'salads' | 'desserts';
  origin: string;
  image: string;
  rating: number;
  reviewsCount: number;
  ingredients: string[];
  calories: number;
  prepTime: string;
  isVegetarian: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
