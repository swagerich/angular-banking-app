import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionDto } from 'src/app/banking/interfaces/transactionDto-interface';
import { TransactionService } from 'src/app/banking/services/transaction.service';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);

  private transactionService = inject(TransactionService);

  private validatorService  = inject(ValidatorsService);

  public foods : Array<string> = ['hola','pepe'];

  public myFormTransaction: FormGroup = this.fb.group({
    transactionType:[''],
    choseContacts:[''],
    amount:['',[Validators.min(20),Validators.max(1000000)]],
    numberAccount:['']
  });

  ngOnInit(): void {
    this.foods;
  }

  get currentTransaction():TransactionDto{
    return this.myFormTransaction.value as TransactionDto;
  }

  onSubmitTransaction():void{

    if(this.myFormTransaction.invalid) return;

    console.log(this.myFormTransaction.value)
   /*  this.transactionService.saveTransaction(this.currentTransaction).subscribe({
      next:(data) =>{
        console.log(data);
        
      },
      error:(e:HttpErrorResponse) =>{
          if(e.status === 500){
            this.validatorService.validateSnackBar('A system error has occurred!');
          }
      }
    }); */
  }

  ngOnDestroy(): void {}
}
