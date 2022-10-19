import {
  assertEquals,
  assertExists,
  assertNotStrictEquals,
  assertStrictEquals,
} from "../../deps.ts";
import { newLineItem } from "./line-item.ts";
import { newProduct } from "./product.ts";
import { newReceipt } from "./receipt.ts";

const product = newProduct({ name: "iPhone", price: 76000 });
const receipt = newReceipt();

Deno.test("newLineItem creates a new instance of LineItem", () => {
  const li = newLineItem({ qty: 1, product, receipt });

  assertExists(li.id);
  assertStrictEquals(li.qty, 1);
  assertEquals(li.product, product);
  assertEquals(li.receipt, receipt);
});

Deno.test("newLineItem creates line items with unique IDs", () => {
  const li1 = newLineItem({ qty: 1, product, receipt });
  const li2 = newLineItem({ qty: 1, product, receipt });

  assertNotStrictEquals(li1.id, li2.id);
});
