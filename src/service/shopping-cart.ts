import { Product } from "../entity/product.ts";
import { newReceipt, Receipt } from "../entity/receipt.ts";
import { ShoppingCart } from "./repository.ts";

interface AddProductArgs {
  product: Product;
  qty: number;
  receipt?: Receipt;
}

export const addProduct = async (repo: ShoppingCart, args: AddProductArgs) => {
  const { receipt: r } = args;

  const receipt = r ?? newReceipt();

  if (!r) {
    await repo.createCart(receipt);
  }

  return;
};
