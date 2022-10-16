import { DenoDB } from "../../deps.ts";
import { Product } from "./product.ts";
import { Receipt } from "./receipt.ts";

export class LineItem extends DenoDB.Model {
  static table = "line-item"; // table name in DB
  static timestamps = true; // automatically adds created_at and updated_at fields

  static fields = {
    id: {
      type: DenoDB.DataTypes.STRING,
      primaryKey: true,
    },
    qty: DenoDB.DataTypes.INTEGER,
  };

  static product() {
    return this.hasOne(Product);
  }

  static receipt() {
    return this.hasOne(Receipt);
  }
}
