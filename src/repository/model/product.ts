import { DenoDB } from "../../../deps.ts";

export class Product extends DenoDB.Model {
  static table = "catalog"; // table name in DB
  static timestamps = true; // automatically adds created_at and updated_at fields

  static fields = {
    id: {
      type: DenoDB.DataTypes.STRING,
      primaryKey: true,
    },
    name: DenoDB.DataTypes.string(25), // name max lenght is 25 characters
    price: DenoDB.DataTypes.INTEGER, // unit price in cents
  };
}
