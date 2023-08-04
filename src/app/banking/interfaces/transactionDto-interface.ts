export interface TransactionDto {
  id?: number;
  type?: 'DEPOSITO' | 'TRANSFERENCIA';
  amount?: number;
  choseContacts?: string | null;
  destinationBank?: string;
  transactionDate?: string;
  userId?: number;
}
enum Type {
  DEPOSITO = 'DEPOSITO',
  TRANSFERENCIA = 'TRANSFERENCIA',
}
