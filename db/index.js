const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/transactions.db', db_error_handler);

db.run(
    `CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        account_id INTEGER NOT NULL,
        vendor STRING NOT NULL,
        amount REAL NOT NULL
    );`,
    db_error_handler
);

db.run(
    `CREATE TABLE IF NOT EXISTS accounts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_name STRING NOT NULL
  );`,
    db_error_handler
);

class Transaction {
    constructor(id, date, account, vendor, amount) {
        this.id = id;
        this.date = date;
        this.account = account;
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
                return new Transaction(row.id, row.date, row.account, row.vendor, row.amount);
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

function close() {
    db.close(db_error_handler);
}

function insert_transaction(date, account_id, vendor, amount) {
    db.run(
        `INSERT INTO transactions
        (date, account_id, vendor, amount)
        VALUES("${date.toISOString()}", ${account_id}, "${vendor}", ${amount});`,
        db_error_handler
    );
}

function insert_account(account_name) {
    db.run(
        `INSERT INTO accounts
        (account_name)
        VALUES("${account_name}")`,
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
    insert_transaction: insert_transaction,
    insert_account: insert_account
};