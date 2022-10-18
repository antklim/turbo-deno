import { assertEquals, assertExists, assertNotEquals } from "../../deps.ts";
import { newReceipt } from "./receipt.ts";

Deno.test("newReceipt creates a new instance of Receipt", () => {
  const r = newReceipt();

  assertExists(r.id);
  assertEquals(r.status, "pending");
  assertExists(r.lineItems);
  assertEquals(r.lineItems.length, 0);
});

Deno.test("newReceipt creates receipts with unique IDs", () => {
  const r1 = newReceipt();
  const r2 = newReceipt();

  assertNotEquals(r1.id, r2.id);
});
