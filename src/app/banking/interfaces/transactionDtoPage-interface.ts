import { TransactionDto } from './transactionDto-interface';

export interface TransactionDtoPageByUser {
  transactions: TransactionDto[];
  pages: Page;
}
interface Page {
  totalPages: number;
  totalTransactions: number;
  pageNumber: number;
}
