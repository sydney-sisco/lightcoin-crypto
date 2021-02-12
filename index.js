class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    if (!this.transactions.length) {
      return 0;
    }
    return this.transactions.reduce((total, transaction) => total + transaction.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isValid()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isValid() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isValid() {
    console.log('valid?', this.amount <= this.account.balance);
    return (this.amount <= this.account.balance);
  }
}


const myAccount = new Account("test-account");
console.log('🚨Balance:', myAccount.balance);

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('🚨Balance:', myAccount.balance);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

console.log('🚨Balance:', myAccount.balance);

const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('🚨Balance:', myAccount.balance);
