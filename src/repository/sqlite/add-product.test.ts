// 1. creates a new receipt when no receipt provided
// 2. adds a new line item to receipt
// 3. returns an error when no receipt found in DB
// 4. when called with the same product multiple times then a new line item added

import {
  assertEquals,
  assertExists,
  assertStrictEquals,
} from "../../../deps.ts";
import { newProduct } from "../../entity/product.ts";
import { addProduct } from "./add-product.ts";

Deno.test("addProduct returns a new receipt with line item", async () => {
  const product = newProduct({ name: "iPhone", price: 76000 });
  const qty = 1;

  const receipt = await addProduct({ qty, product });

  assertExists(receipt);
  assertStrictEquals(receipt.status, "pending");
  assertStrictEquals(receipt.lineItems.length, 1);

  const lineItem = receipt.lineItems.at(0);

  assertExists(lineItem);
  assertEquals(lineItem.product, product);
  assertStrictEquals(lineItem.qty, qty);
  assertEquals(lineItem.receipt, receipt);
});

Deno.test("addProduct saves a new receipt with line item in DB", () => {
});

Deno.test("addProduct adds line item to existing receipt", () => {
});

Deno.test("addProduct adds new line item for repeating product", () => {
});

Deno.test("addProduct fails when receipt not found in DB", () => {
});
