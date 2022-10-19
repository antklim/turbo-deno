import {
  assertExists,
  assertNotStrictEquals,
  assertStrictEquals,
} from "../../deps.ts";
import { newReceipt } from "./receipt.ts";

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
