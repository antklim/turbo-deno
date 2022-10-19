import {
  assertExists,
  assertNotStrictEquals,
  assertStrictEquals,
} from "../../deps.ts";
import { newProduct } from "./product.ts";

Deno.test("newProduct creates a new instance of Product", () => {
  const p = newProduct({ name: "iPod", price: 134500 });

  assertExists(p.id);
  assertStrictEquals(p.name, "iPod");
  assertStrictEquals(p.price, 134500);
});

Deno.test("newProduct creates products with unique IDs", () => {
  const p1 = newProduct({ name: "iPhone", price: 80000 });
  const p2 = newProduct({ name: "iPad", price: 45000 });

  assertNotStrictEquals(p1.id, p2.id);
});
