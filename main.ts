import { DenoDB } from "./deps.ts";
import { LineItem } from "./src/repository/model/line-item.ts";
import { Product } from "./src/repository/model/product.ts";
import { Receipt } from "./src/repository/model/receipt.ts";
import { initDB } from "./src/repository/sqlite/db.ts";

if (import.meta.main) {
  // TODO: move to a separate location
  const connector = new DenoDB.SQLite3Connector({
    filepath: "./shopping-cart.db",
  });

  const db = await initDB(connector);

  await Product.create({
    id: "p1", // TODO: add uuid
    name: "Apple Mac Book Pro",
    price: 350000,
  });

  await Product.create({
    id: "p2", // TODO: add uuid
    name: "iPad",
    price: 130000,
  });

  await Product.create({
    id: "p3", // TODO: add uuid
    name: "iPhone",
    price: 80000,
  });

  await Receipt.create({
    id: "r1",
    status: "pending",
  });

  await LineItem.create({
    id: "r1l1",
    qty: "2",
    productId: "p2",
    receiptId: "r1",
  });

  await LineItem.create({
    id: "r1l2",
    qty: "1",
    productId: "p3",
    receiptId: "r1",
  });

  await Receipt.create({
    id: "r2",
    status: "pending",
  });

  await LineItem.create({
    id: "r2l1",
    qty: "1",
    productId: "p1",
    receiptId: "r2",
  });

  await LineItem.create({
    id: "r2l2",
    qty: "1",
    productId: "p2",
    receiptId: "r2",
  });

  await LineItem.create({
    id: "r2l3",
    qty: "1",
    productId: "p3",
    receiptId: "r2",
  });

  const r1LineItems = await Receipt.where("id", "r1").lineItems();

  console.log("Receipt 1 line items:");
  console.table(r1LineItems);

  const r2LineItems = await Receipt.where("id", "r2").lineItems();

  console.log("Receipt 2 line items:");
  console.table(r2LineItems);

  await db.close();

  console.log("DB closed");
}
