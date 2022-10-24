// 1. creates a new receipt when no receipt provided
// 2. adds a new line item to receipt
// 3. returns an error when no receipt found in DB
// 4. when called with the same product multiple times then a new line item added

import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertStrictEquals,
} from "../../../deps.ts";
import { newProduct } from "../../entity/product.ts";
import { addProduct } from "./add-product.ts";
import { Product as DBProduct } from "../model/product.ts";
import { Receipt as DBReceipt } from "../model/receipt.ts";
import { LineItem as DBLineItem } from "../model/line-item.ts";
import { DBconnect } from "./test-helper.test.ts";

Deno.test("addProduct without receipt", async (t) => {
  const db = await DBconnect();

  const product = newProduct({ name: "iPhone", price: 76000 });

  await DBProduct.create({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  const receipt = await addProduct({ qty: 1, product });

  await t.step("creates a new receipt", () => {
    assertExists(receipt);
    assertStrictEquals(receipt.status, "pending");
    assertExists(receipt.lineItems);
    assertStrictEquals(receipt.lineItems.length, 1);
  });

  await t.step("creates a line item and adds it to a receipt", () => {
    const lineItem = receipt.lineItems.at(0);

    assertExists(lineItem);
    assertEquals(lineItem.product, product);
    assertStrictEquals(lineItem.qty, 1);
    assertEquals(lineItem.receipt, receipt);
  });

  await t.step("adds new receipt to DB", async () => {
    const dbReceipt = await DBReceipt.find(receipt.id);

    assertExists(dbReceipt);
    assertStrictEquals(dbReceipt.id, receipt.id);
    assertStrictEquals(dbReceipt.status, receipt.status);

    // receipt has line items
    const dbLineItems = await DBReceipt.where("id", receipt.id).lineItems();

    assertExists(dbLineItems);
    assertInstanceOf(dbLineItems, Array);

    const dbLineItem = dbLineItems.at(0);

    assertExists(dbLineItem);
    assertStrictEquals(dbLineItem.id, receipt.lineItems.at(0)?.id);
    assertStrictEquals(dbLineItem.qty, 1);
    assertStrictEquals(dbLineItem.productId, product.id);
    assertStrictEquals(dbLineItem.receiptId, receipt.id);
  });

  await t.step("adds a line item to DB", async () => {
    const dbLineItems = await DBLineItem.where("receiptId", receipt.id).get();

    assertExists(dbLineItems);
    assertInstanceOf(dbLineItems, Array);

    const dbLineItem = dbLineItems.at(0);

    assertExists(dbLineItem);
    assertStrictEquals(dbLineItem.id, receipt.lineItems.at(0)?.id);
    assertStrictEquals(dbLineItem.qty, 1);
    assertStrictEquals(dbLineItem.productId, product.id);
    assertStrictEquals(dbLineItem.receiptId, receipt.id);
  });

  await db.close();
});

// Deno.test("addProduct adds line item to existing receipt", () => {
// });

// Deno.test("addProduct adds new line item for repeating product", () => {
// });

// Deno.test("addProduct fails when receipt not found in DB", () => {
// });
