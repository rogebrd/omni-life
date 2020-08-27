const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/transactions.db", db_error_handler);

db.run(
  `CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        accountId INTEGER NOT NULL,
        categoryId INTEGER NOT NULL,
        date DATE NOT NULL,
        vendor STRING NOT NULL,
        amount REAL NOT NULL
    );`,
  db_error_handler
);

db.run(
  `CREATE TABLE IF NOT EXISTS accounts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING NOT NULL
    );`,
  db_error_handler
);

db.run(
  `CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING NOT NULL
    );`,
  db_error_handler
);

function select_transactions(callback) {
  db.all("SELECT * FROM transactions ORDER BY id DESC", callback);
}

function select_accounts(callback) {
  db.all("SELECT * FROM accounts ORDER BY id DESC", callback);
}

function select_categories(callback) {
  db.all("SELECT * FROM categories ORDER BY id DESC", callback);
}

function close(callback) {
  db.close(callback);
}

function insert_transaction(
  date,
  account_id,
  category_id,
  vendor,
  amount,
  callback
) {
  db.run(
    `INSERT INTO transactions
        (accountId, categoryId, date, vendor, amount)
        VALUES(${account_id}, ${category_id}, "${date.toISOString()}", "${vendor}", ${amount});`,
    callback
  );
}

function insert_account(account_name, callback) {
  db.run(
    `INSERT INTO accounts
        (name)
        VALUES("${account_name}")`,
    callback
  );
}

function insert_category(category_name, callback) {
  db.run(
    `INSERT INTO categories
        (name)
        VALUES("${category_name}")`,
    callback
  );
}

function delete_account(account_id, callback) {
  db.run(`DELETE FROM accounts WHERE id = ${account_id}`, callback);
}

function delete_transaction(transaction_id, callback) {
  db.run(`DELETE FROM transactions WHERE id = ${transaction_id}`, callback);
}

function delete_category(category_id, callback) {
  db.run(`DELETE FROM categories WHERE id = ${category_id}`, callback);
}

function db_error_handler(err) {
  if (err) {
    throw err;
  }
}

module.exports = {
  close: close,
  select_transactions: select_transactions,
  select_accounts: select_accounts,
  select_categories: select_categories,
  insert_transaction: insert_transaction,
  insert_account: insert_account,
  insert_category: insert_category,
  delete_account: delete_account,
  delete_category: delete_category,
  delete_transaction: delete_transaction,
};
