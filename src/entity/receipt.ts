import { LineItem } from "./line-item.ts";

export type ReceiptStatus = "pending" | "complete" | "failed" | "cancelled";

export interface Receipt {
  id: string;
  status: ReceiptStatus;
  lineItems: LineItem[];
}

export const newReceipt = (): Receipt => ({
  id: crypto.randomUUID(),
  status: "pending",
  lineItems: [],
});

export const addLineItem = (receipt: Receipt, lineItem: LineItem): Receipt => {
  // TODO: add check if receipt.id and lineItem.receipt.id are the same
  receipt.lineItems.push(lineItem);
  return receipt;
};
