import { createConnection } from "mysql2/promise";
import { DATABASE_CONNECTION } from "../config/settings";
import "regenerator-runtime/runtime";

let instance = null;

/**
 * Database Singleton
 */
class Database {
  constructor() {
    this._connection = null;
  }

  async connect() {
    this._connection = await createConnection(DATABASE_CONNECTION);
  }

  async disconnect() {
    await this._connection.end();
  }

  getConnection() {
    return this._connection;
  }

  static getInstance() {
    if (!instance) {
      instance = new Database();
    }

    return instance;
  }
}

export default Database;
