const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/transactions.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

db.run(
    `CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        account_id INTEGER NOT NULL,
        vendor STRING NOT NULL,
        amount REAL NOT NULL
    );`,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Created Table");
    }
);

db.run(
    `CREATE TABLE IF NOT EXISTS accounts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_name STRING NOT NULL
  );`,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Created Table");
    }
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

function select(callback) {
    db.all('SELECT * FROM transactions ORDER BY id ASC ',
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

function close() {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Disconnected from Database.');
    });
}

function insert_transaction(date, account_id, vendor, amount) {
    db.run(
        'INSERT INTO transactions' +
        '(date, account_id, vendor, amount)' +
        'VALUES("' + date.toISOString() + '", ' + account_id + ', "' + vendor + '", ' + amount + ');',
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Success");
        }
    );
}

function insert_account(account_name) {
    db.run(
        `INSERT INTO accounts
        (account_name)
        VALUES(${account_name})`,
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Success");
        }
    );
}

module.exports = {
    close: close,
    select: select,
    insert_transaction: insert_transaction,
    insert_account: insert_account
};