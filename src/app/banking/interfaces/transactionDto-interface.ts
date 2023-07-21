export interface TransactionDto{
    id?:number;
    type?:Type;
    amount?:number;
    destinationBank?:string;
    transactionDate?:Date
    userId?:number;
}
enum Type{
    DEPOSITO,
    TRANSFERENCIA
}