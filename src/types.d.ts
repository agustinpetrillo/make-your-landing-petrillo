interface GlobalContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
}

interface ProductProps {
  firestoreId: string;
  image: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
}

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
  category: string;
  setCategory: (category: string) => void;
  categories: string[];
}

interface CartItem {
  firestoreId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  quantity: number;
  stock: number;
}

interface AddToCartButtonProps {
  product: ProductProps;
}
