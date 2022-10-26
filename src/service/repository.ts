import { Product } from "../entity/product.ts";
import { Receipt } from "../entity/receipt.ts";

export interface ShoppingCart {
  addProduct(
    args: { product: Product; qty: number; receipt?: Receipt },
  ): Promise<Receipt>;
  createCart(receipt: Receipt): Promise<void>;
  deleteProduct(args: { product: Product; receipt: Receipt }): Promise<Receipt>;
  checkout(receipt: Receipt): Promise<Receipt>;
  total(receipt: Receipt): number;
}
