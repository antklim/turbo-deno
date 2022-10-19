export interface Product {
  id: string;
  name: string;
  price: number;
}

export const newProduct = ({ name, price }: Omit<Product, "id">): Product => ({
  id: crypto.randomUUID(),
  name,
  price,
});
