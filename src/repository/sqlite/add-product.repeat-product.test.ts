import {
  assertExists,
  assertInstanceOf,
  assertStrictEquals,
} from "../../../deps.ts";
import { newProduct } from "../../entity/product.ts";
import { addProduct } from "./add-product.ts";
import { Product as DBProduct } from "../model/product.ts";
import { LineItem as DBLineItem } from "../model/line-item.ts";
import { DBconnect } from "./test-helper.test.ts";

Deno.test("addProduct adds new line item for repeating product", async (t) => {
  const db = await DBconnect();

  const iphone = newProduct({ name: "iPhone", price: 76000 });

  await DBProduct.create({
    id: iphone.id,
    name: iphone.name,
    price: iphone.price,
  });

  const receipt = await addProduct({ qty: 1, product: iphone });

  await t.step("DB has one line item before adding a new product", async () => {
    const dbLineItems = await DBLineItem.where("receiptId", receipt.id).get();

    assertExists(dbLineItems);
    assertInstanceOf(dbLineItems, Array);
    assertStrictEquals(dbLineItems.length, 1);
  });

  await t.step(
    "creates a new line item regardless for the same product",
    async () => {
      const r = await addProduct({ qty: 2, product: iphone, receipt });

      assertStrictEquals(r.id, receipt.id);
      assertStrictEquals(r.lineItems.length, 2);
    },
  );

  await t.step("adds a new line item to DB", async () => {
    const dbLineItems = await DBLineItem.where("receiptId", receipt.id).get();

    assertExists(dbLineItems);
    assertInstanceOf(dbLineItems, Array);
    assertStrictEquals(dbLineItems.length, 2);
  });

  await db.close();
});
