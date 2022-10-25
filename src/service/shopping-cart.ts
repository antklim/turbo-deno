import { Product } from "../entity/product.ts";
import { Receipt } from "../entity/receipt.ts";
import { ShoppingCart } from "./repository.ts";

interface AddProductArgs {
  product: Product;
  qty: number;
  receipt?: Receipt;
}

// deno-lint-ignore no-unused-vars
export const addProduct = (r: ShoppingCart) => {
};
