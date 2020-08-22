const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/transactions.db', db_error_handler);

db.run(
    `CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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

class Transaction {
    constructor(id, date, account_id, category_id, vendor, amount) {
        this.id = id;
        this.date = date;
        this.account_id = account_id;
        this.category_id = category_id;
        this.vendor = vendor;
        this.amount = amount;
    }
}

function select_transactions(callback) {
    db.all('SELECT * FROM transactions ORDER BY id DESC',
        (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            results = rows.map((row) => {
                return new Transaction(row.id, row.date, row.account_id, row.category_id, row.vendor, row.amount);
            });
            callback(results);
        }
    );
}

function select_accounts(callback) {
    db.all('SELECT * FROM accounts ORDER BY id DESC',
        (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback(rows);
        }
    );
}

function select_categories(callback) {
    db.all('SELECT * FROM categories ORDER BY id DESC',
        (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback(rows);
        }
    );
}

function close() {
    db.close(db_error_handler);
}

function insert_transaction(date, account_id, category_id, vendor, amount) {
    db.run(
        `INSERT INTO transactions
        (account_id, category_id, date, vendor, amount)
        VALUES(${account_id}, ${category_id}, "${date.toISOString()}", "${vendor}", ${amount});`,
        db_error_handler
    );
}

function insert_account(account_name) {
    db.run(
        `INSERT INTO accounts
        (name)
        VALUES("${account_name}")`,
        db_error_handler
    );
}

function insert_category(category_name) {
    db.run(
        `INSERT INTO categories
        (name)
        VALUES("${category_name}")`,
        db_error_handler
    );
}

function db_error_handler(err) {
    if (err) {
        console.error(err.message);
    }
    console.log("Success");
}

module.exports = {
    close: close,
    select_transactions: select_transactions,
    select_accounts: select_accounts,
    select_categories: select_categories,
    insert_transaction: insert_transaction,
    insert_account: insert_account,
    insert_category: insert_category
};