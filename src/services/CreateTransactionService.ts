import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (balance.total >= value || type === 'income') {
      const transaction = this.transactionsRepository.create({
        title,
        type,
        value,
      });
      return transaction;
    }
    throw Error('There is not enough balance to complete this transaction');
  }
}

export default CreateTransactionService;
