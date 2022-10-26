import { DenoDB } from "../../../deps.ts";
import { Product } from "./product.ts";

export class Cart extends DenoDB.Model {
  static table = "cart"; // table name in DB
  static timestamps = true; // automatically adds created_at and updated_at fields

  static fields = {
    id: {
      type: DenoDB.DataTypes.STRING,
      primaryKey: true,
    },
  };

  // TODO: should be a cart item
  static products() {
    return this.hasMany(Product);
  }
}
