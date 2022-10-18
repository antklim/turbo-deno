import { Product } from "./product.ts";
import { Receipt } from "./receipt.ts";

export interface LineItem {
  id: string;
  qty: number;
  product: Product;
  receipt: Receipt;
}
