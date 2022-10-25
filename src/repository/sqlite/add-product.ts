import { newLineItem } from "../../entity/line-item.ts";
import { Product } from "../../entity/product.ts";
import { addLineItem, newReceipt, Receipt } from "../../entity/receipt.ts";
import { LineItem as DBLineItem } from "../model/line-item.ts";
import { Receipt as DBReceipt } from "../model/receipt.ts";

/**
 * addProduct adds a product to a cart. It creates a new receipt when no receipt
 * provided as input. It adds a new line item to the receipt.
 */
export const addProduct = async (
  { product, qty, receipt: r }: {
    product: Product;
    qty: number;
    receipt?: Receipt;
  },
): Promise<Receipt> => {
  // TODO: check if receipt parameter provided but it does not exist in DB
  // then return error

  let receipt = r;

  if (!receipt) {
    receipt = newReceipt();

    await DBReceipt.create({
      id: receipt.id,
      status: receipt.status,
    });
  }

  const lineItem = newLineItem({ qty, product, receipt });

  receipt = addLineItem(receipt, lineItem);

  await DBLineItem.create({
    id: lineItem.id,
    qty: lineItem.qty,
    productId: product.id,
    receiptId: receipt.id,
  });

  return receipt;
};
