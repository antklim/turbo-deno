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

  const iphone = newProduct({ name: "iPhone", price: 76000 });

  await DBProduct.create({
    id: iphone.id,
    name: iphone.name,
    price: iphone.price,
  });

  const receipt = await addProduct({ qty: 1, product: iphone });

  await t.step("creates a new receipt", () => {
    assertExists(receipt);
    assertStrictEquals(receipt.status, "pending");
    assertExists(receipt.lineItems);
    assertStrictEquals(receipt.lineItems.length, 1);
  });

  await t.step("creates a line item and adds it to a receipt", () => {
    const lineItem = receipt.lineItems.at(0);

    assertExists(lineItem);
    assertEquals(lineItem.product, iphone);
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
    assertStrictEquals(dbLineItem.productId, iphone.id);
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
    assertStrictEquals(dbLineItem.productId, iphone.id);
    assertStrictEquals(dbLineItem.receiptId, receipt.id);
  });

  await db.close();
});
