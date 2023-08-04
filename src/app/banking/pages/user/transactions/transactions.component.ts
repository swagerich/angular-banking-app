import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { TransactionDto } from 'src/app/banking/interfaces/transactionDto-interface';
import { TransactionService } from 'src/app/banking/services/transaction.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);

  private validatorService = inject(ValidatorsService);
  
  private authService = inject(AuthService);

  private transactionService = inject(TransactionService);

  public transactionId: number = 0;

  ngOnInit(): void {
    this.showCommentsPageWithPublication();
  }

  displayedColumns: string[] = ['transactionDate', 'destinationBank','amount','type'];
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

  showCommentsPageWithPublication(): void {
    const userId = this.authService.getUser().userId;
    Swal.fire({
      title: 'Uploading Data...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.activateRoute.params
      .pipe(
        delay(2000),
        switchMap(() =>
          this.transactionService.transactionAllPageByUser(
            1,
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
          Swal.close();
        },
        error: (e: HttpErrorResponse) => {
          this.validatorService.showSnackBarForError(e);
        },
      });
  }

  pageEvents(event: any) {
    console.log(event.pageIndex);
    this.getPage(event.pageIndex, event.pageSize);
  }

  getPage(nroPagina: number, cantidadPorPagina: number): void {
    this.activateRoute.params
      .pipe(
        switchMap(() =>
          this.transactionService.transactionAllPageByUser(
            1,
            /* this.transactionId, */
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
}
