import { DenoDB } from "../../deps.ts";
import { LineItem } from "./line-item.ts";

export class Receipt extends DenoDB.Model {
  static table = "receipt"; // table name in DB
  static timestamps = true; // automatically adds created_at and updated_at fields

  static fields = {
    id: {
      type: DenoDB.DataTypes.STRING,
      primaryKey: true,
    },
  };

  static lineItems() {
    this.hasMany(LineItem);
  }
}
