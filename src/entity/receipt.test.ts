import {
  assertExists,
  assertNotStrictEquals,
  assertStrictEquals,
} from "../../deps.ts";
import { newLineItem } from "./line-item.ts";
import { newProduct } from "./product.ts";
import { addLineItem, newReceipt } from "./receipt.ts";

Deno.test("newReceipt creates a new instance of Receipt", () => {
  const r = newReceipt();

  assertExists(r.id);
  assertStrictEquals(r.status, "pending");
  assertExists(r.lineItems);
  assertStrictEquals(r.lineItems.length, 0);
});

Deno.test("newReceipt creates receipts with unique IDs", () => {
  const r1 = newReceipt();
  const r2 = newReceipt();

  assertNotStrictEquals(r1.id, r2.id);
});

Deno.test("addLineItem adds line item to receipt", () => {
  const product = newProduct({ name: "iPhone", price: 76500 });
  let receipt = newReceipt();

  const li1 = newLineItem({ qty: 1, product, receipt });
  const li2 = newLineItem({ qty: 2, product, receipt });

  receipt = addLineItem(receipt, li1);
  receipt = addLineItem(receipt, li2);

  assertStrictEquals(receipt.lineItems.length, 2);
  assertStrictEquals(receipt.lineItems.at(0)?.id, li1.id);
  assertStrictEquals(receipt.lineItems.at(1)?.id, li2.id);

  assertStrictEquals(li1.receipt.lineItems.length, 2);
  assertStrictEquals(li2.receipt.lineItems.length, 2);
});
