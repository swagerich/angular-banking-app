import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, async } from 'rxjs';
import { ContactDto } from 'src/app/banking/interfaces/contactDto-interface';
import { TransactionDto } from 'src/app/banking/interfaces/transactionDto-interface';
import { AuthService } from 'src/app/banking/services/auth.service';
import { ContactService } from 'src/app/banking/services/contact.service';
import { StatisticsService } from 'src/app/banking/services/statistics.service';
import { TransactionService } from 'src/app/banking/services/transaction.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  private transactionService = inject(TransactionService);

  private validatorService = inject(ValidatorsService);

  private contactService = inject(ContactService);

  private authService = inject(AuthService);

  private statistcService = inject(StatisticsService);

  private router = inject(Router);

  public subscription: Subscription = new Subscription();

  public transactionsType: Array<string> = ['DEPOSITO', 'TRANSFERENCIA'];

  public contacts: ContactDto[] = [];

  public accountBalance: number = 0;

  public myFormTransaction: FormGroup = this.fb.group({
    type: [''],
    choseContacts: [''],
    amount: [0, [Validators.min(20), Validators.max(1000000)]],
    destinationBank: [''],
    transactionDate: [''],
    userId: [0],
  });

  ngOnInit(): void {
    let idUser = this.authService.getUser().userId;
    this.myFormTransaction.get('userId')?.setValue(idUser);
    this.onTransactionTypeChange();
    this.findAllContactByUserId(this.myFormTransaction.get('userId')?.value);
    this.statistcAmount(this.myFormTransaction.get('userId')?.value);
  }

  get currentTransaction(): TransactionDto {
    return this.myFormTransaction.value as TransactionDto;
  }

  onTransactionTypeChange():void{
    if(this.transactionsType){
      this.myFormTransaction.get('type')?.valueChanges.subscribe(t =>{
        this.myFormTransaction.get('amount')?.setValue(0);
      });
    }
  }
  findAllContactByUserId(userId:number): void {
    this.subscription = this.contactService.findAllContactByUserId(userId).subscribe((c) => {
      this.contacts = c;
    });
  }

  statistcAmount(userId:number):void{
  this.subscription = this.statistcService.getAccountAmount(userId).subscribe({
      next:(data ) =>{
        if(data != null){
          this.accountBalance = data;
        }
      }
    })
  }

  changeType(): boolean {
    let type = this.myFormTransaction.get('type')?.value;
    return type === 'TRANSFERENCIA';
  }

  onContactSelectionChange(): void {
    let selectContact = this.myFormTransaction.get('choseContacts')?.value;
    if (selectContact) {
      this.myFormTransaction.get('destinationBank')?.setValue(selectContact.number);
    } else {
      this.myFormTransaction.get('destinationBank')?.setValue('');
    }
  }


  onSubmitTransaction(): void {
    if (this.myFormTransaction.invalid) {
      this.myFormTransaction.markAllAsTouched();
      return;
    }
    const fechaActualString = new Date(Date.now()).toISOString().slice(0,10);
    this.myFormTransaction.get('transactionDate')?.setValue(fechaActualString);
    //console.log(this.myFormTransaction.value);

    this.transactionService.saveTransaction(this.currentTransaction).subscribe({
      next: (data) => {
        Swal.fire(
          'Exito!',
          'Transaction completed successfully',
          'success'
        ).then((t) => {
          if (t.isConfirmed) {
            this.router.navigate(['/user/transactions']);
          }
        });
        console.log(data);
      },
      error: (e: HttpErrorResponse) => {
        this.validatorService.showSnackBarForError(e);
      },
    });
  }

  async cancel(): Promise<void> {
    await this.router.navigate(['/user/transactions']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
