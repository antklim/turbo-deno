import { newLineItem } from "../../entity/line-item.ts";
import { Product } from "../../entity/product.ts";
import { addLineItem, newReceipt, Receipt } from "../../entity/receipt.ts";

/**
 * addProduct adds a product to a cart. It creates a new receipt when no receipt
 * provided as input. It adds a new line item to the receipt.
 */
export const addProduct = (
  { product, qty, receipt: r }: {
    product: Product;
    qty: number;
    receipt?: Receipt;
  },
): Promise<Receipt> => {
  // TODO: check if receipt parameter provided but it does not exist in DB
  // then return error

  let receipt = r ?? newReceipt();

  const lineItem = newLineItem({ qty, product, receipt });

  receipt = addLineItem(receipt, lineItem);

  return Promise.resolve(receipt);
};