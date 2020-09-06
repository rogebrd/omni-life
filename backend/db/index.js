const sqlite3 = require('sqlite3').verbose();

let db;

function initialize_db(db_file, callback) {
  open(db_file, (err) => {
    if (err) throw err;
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS transactions(
            transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            account_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            date DATE NOT NULL,
            vendor STRING NOT NULL,
            amount REAL NOT NULL
        );`,
        db_error_handler
      );

      db.run(
        `CREATE TABLE IF NOT EXISTS accounts(
            account_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name STRING NOT NULL,
            account_type_id INTEGER NOT NULL
        );`,
        db_error_handler
      );

      db.run(
        `CREATE TABLE IF NOT EXISTS categories(
            category_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name STRING NOT NULL
        );`,
        db_error_handler
      );

      db.run(
        `CREATE TABLE IF NOT EXISTS account_types(
        account_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING NOT NULL
      )`,
        db_error_handler
      );

      db.run(
        `INSERT INTO account_types
        (name)
        VALUES('Cash')`,
        db_error_handler
      );

      db.run(
        `INSERT INTO account_types
        (name)
        VALUES('Investment')`,
        db_error_handler
      );

      db.run(
        `INSERT INTO account_types
        (name)
        VALUES('Credit')`,
        db_error_handler
      );

      db.run(
        `INSERT INTO categories
        (name)
        VALUES('Uncategorized')`
      );

      if (callback) callback();
    });
  });
}

function select_transactions(callback) {
  db.all(
    `SELECT
  transaction_id AS id,
          account_id,
          category_id,
          date,
          vendor,
          amount
   FROM transactions 
   ORDER BY id DESC`,
    callback
  );
}

function select_accounts(callback) {
  db.all(
    `SELECT 
    ac.account_id AS id, 
    ac.name AS name, 
    acty.name AS type
  FROM accounts AS ac
  INNER JOIN account_types AS acty
  ON ac.account_type_id == acty.account_type_id
  ORDER BY id DESC`,
    callback
  );
}

function select_categories(callback) {
  db.all(
    `SELECT 
  category_id AS id,
  name
  FROM categories 
  ORDER BY id DESC`,
    callback
  );
}

function close(callback) {
  db.close(callback);
}

function open(db_file, callback) {
  db = new sqlite3.Database(db_file, callback);
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
        (account_id, category_id, date, vendor, amount)
        VALUES(${account_id}, ${category_id}, '${date.toISOString()}', '${vendor}', ${amount});`,
    callback
  );
}

function insert_account(account_name, account_type, callback) {
  db.run(
    `INSERT INTO accounts
        (name, account_type_id)
        VALUES('${account_name}', ${account_type})`,
    callback
  );
}

function insert_category(category_name, callback) {
  db.run(
    `INSERT INTO categories
        (name)
        VALUES('${category_name}')`,
    callback
  );
}

function delete_account(account_id, callback) {
  db.run(`DELETE FROM accounts WHERE account_id = ${account_id}`, callback);
}

function delete_transaction(transaction_id, callback) {
  db.run(`DELETE FROM transactions WHERE transaction_id = ${transaction_id}`, callback);
}

function delete_category(category_id, callback) {
  db.run(`DELETE FROM categories WHERE category_id = ${category_id}`, callback);
}

function db_error_handler(err) {
  if (err) {
    throw err;
  }
}

module.exports = {
  close: close,
  open: open,
  initialize_db: initialize_db,
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
