interface ProductItem {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: [string];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
    count: number;
}

interface ProductObject {
  products: Array<ProductItem>;
  limit?: number;
  total?: number;
  skip?: number;
}

interface CheckoutState {
    bag: ProductItem[];
    viewCheckout: boolean;
}

interface UsersState {
    users: UserItem[]
}

interface AddressItem {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface UserItem {
  username: string;
  image: string;
  address: AddressItem;
  id: number;
  firstName: string,
  lastName: string,
}

interface UsersObject {
  users: Array<UserItem>;
  limit?: number;
  total?: number;
  skip?: number;  
}

export type { ProductItem, ProductObject, CheckoutState, UsersObject, UsersState, UserItem}