import { assertExists, assertNotStrictEquals } from "../../deps.ts";
import { newCart } from "./cart.ts";

Deno.test("newCart creates a new instance of shopping Cart", () => {
  const cart = newCart();

  assertExists(cart.id);
});

Deno.test("newCart creates carts with unique IDs", () => {
  const cart1 = newCart();
  const cart2 = newCart();

  assertNotStrictEquals(cart1.id, cart2.id);
});
