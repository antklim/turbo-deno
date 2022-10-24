// 1. creates a new receipt when no receipt provided
// 2. adds a new line item to receipt
// 3. returns an error when no receipt found in DB
// 4. when called with the same product multiple times then a new line item added

import {
  assertEquals,
  assertExists,
  assertInstanceOf,
  assertStrictEquals,
  DenoDB,
} from "../../../deps.ts";
import { newProduct } from "../../entity/product.ts";
import { addProduct } from "./add-product.ts";
import { initDB } from "./db.ts";
import { Product } from "../model/product.ts";
import { Receipt } from "../model/receipt.ts";
import { LineItem } from "../model/line-item.ts";

// TODO: create better set up routine
Deno.test("addProduct without receipt", async (t) => {
  const connector = new DenoDB.SQLite3Connector({
    filepath: "./test.db",
  });

  const db = await initDB(connector);

  const product = newProduct({ name: "iPhone", price: 76000 });

  await Product.create({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  const qty = 1;

  const receipt = await addProduct({ qty, product });

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
    assertStrictEquals(lineItem.qty, qty);
    assertEquals(lineItem.receipt, receipt);
  });

  await t.step("adds new receipt to DB", async () => {
    const dbReceipt = await Receipt.find(receipt.id);

    assertExists(dbReceipt);
    assertStrictEquals(dbReceipt.id, receipt.id);
    assertStrictEquals(dbReceipt.status, receipt.status);

    // receipt has line items
    const dbLineItems = await Receipt.where("id", receipt.id).lineItems();

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
    const dbLineItems = await LineItem.where("receiptId", receipt.id).get();

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
