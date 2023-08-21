import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap, Subscription } from 'rxjs';
import { TransactionDto } from 'src/app/banking/interfaces/transactionDto-interface';
import { TransactionService } from 'src/app/banking/services/transaction.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { ExcelService } from 'src/app/banking/services/excel.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private activateRoute = inject(ActivatedRoute);

  private validatorService = inject(ValidatorsService);

  private authService = inject(AuthService);

  private transactionService = inject(TransactionService);

  private subscription = new Subscription();

  private excelService = inject(ExcelService);

  public transactionId: number = 0;

  public loadingDialog: any;

  private userId: number = 0;

  public isDisabled: boolean = false;

  ngOnInit(): void {
    this.userId = this.authService.getUser().userId;
    this.showTransactionPage();
  }

  displayedColumns: string[] = [
    'transactionDate',
    'destinationBank',
    'amount',
    'type',
  ];
  dataPaginacion = new MatTableDataSource<TransactionDto>();
  transactions: TransactionDto[] = [];
  pageSize: number = 5;
  page: number = 0;
  totalTransactions: number = 0;
  totalPages: number = 0;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPaginacion.filter = filterValue.trim().toLowerCase();
    if (this.dataPaginacion.paginator) {
      this.dataPaginacion.paginator.firstPage();
    }
  }

  onExcel(): void {
   this.onClosedDialog();
   this.loadingDialog = Swal.fire({
      title: 'Download...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.subscription = this.excelService
      .onExcel(this.userId.toString())
      .pipe(delay(1000))
      .subscribe({
        next: (data: Blob) => {
          const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'transactions.xlsx'; //AQUI FALTA CAMBIAR EL NOMBRE RANDOM COMO EN EL BACKEND !!
          link.click();
          window.URL.revokeObjectURL(url);
          this.onClosedDialog();
        },
        error: (e: HttpErrorResponse) => {
          this.validatorService.showSnackBarForError(e);
        },
      });
  }

  onDisabled(): boolean {
    if (this.transactions.length <= 0) {
      return (this.isDisabled = true);
    }
    return (this.isDisabled = false);
  }

  showTransactionPage(): void {
  this.loadingDialog =  Swal.fire({
      title: 'Uploading Data...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.subscription = this.activateRoute.params
      .pipe(
        delay(2000),
        switchMap(() =>
          this.transactionService.transactionAllPageByUser(
            this.userId,
            this.page,
            this.pageSize
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.transactions = response.transactions;
          this.totalPages = response.pages.totalPages;
          this.totalTransactions = response.pages.totalTransactions;
          this.dataPaginacion = new MatTableDataSource<TransactionDto>(
            this.transactions
          );
          this.onDisabled();
          this.onClosedDialog();
        },
        error: (e: HttpErrorResponse) => {
          this.validatorService.showSnackBarForError(e);
          this.onClosedDialog();
        },
      });
  }

  pageEvents(event: any) {
    console.log(event.pageIndex);
    this.getPage(event.pageIndex, event.pageSize);
  }

  getPage(nroPagina: number, cantidadPorPagina: number): void {
    this.subscription = this.activateRoute.params
      .pipe(
        switchMap(() =>
          this.transactionService.transactionAllPageByUser(
            this.userId,
            nroPagina,
            cantidadPorPagina
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.transactions = response.transactions;
          this.dataPaginacion = new MatTableDataSource<TransactionDto>(
            this.transactions
          );
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.onClosedDialog();
  }
  
  onClosedDialog(): void {
    if(this.loadingDialog){
      Swal.close();
    }
  }
}
