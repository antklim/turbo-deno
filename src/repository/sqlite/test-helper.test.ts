import { DenoDB } from "../../../deps.ts";
import { initDB } from "./db.ts";

export const DBconnect = async (): Promise<DenoDB.Database> => {
  const connector = new DenoDB.SQLite3Connector({
    filepath: "./test.db",
  });

  return await initDB(connector);
};
