import { DenoDB } from "../../deps.ts";
import { LineItem } from "./line-item.ts";
import { Product } from "./product.ts";
import { Receipt } from "./receipt.ts";

export const initRelations = () => {
  DenoDB.Relationships.belongsTo(LineItem, Product);
  DenoDB.Relationships.belongsTo(LineItem, Receipt);
};
