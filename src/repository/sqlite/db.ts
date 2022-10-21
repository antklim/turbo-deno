import { DenoDB } from "../../../deps.ts";
import { LineItem } from "../model/line-item.ts";
import { Product } from "../model/product.ts";
import { Receipt } from "../model/receipt.ts";
import { initRelations } from "../model/relations.ts";

export const initDB = async (
  opts: DenoDB.DatabaseOptions,
): Promise<DenoDB.Database> => {
  const db = new DenoDB.Database(opts);

  initRelations();

  // tables that depend on other tables should be linked
  // after their dependencies. Because of LineItem has foreign key to
  // Product and Receipt, it should be linked last.
  db.link([Product, Receipt, LineItem]);

  await db.sync({ drop: true });

  return db;
};
