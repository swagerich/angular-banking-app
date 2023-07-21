import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{
  ngOnInit(): void {
 
  }


  displayedColumns: string[] = ['nombre', 'email', 'texto'];

  /* dataPaginacion = new MatTableDataSource<ComentarioDTo>([]);
  comments: ComentarioDTo[] = [];
  showSpinner: boolean = false;
  pageSize: number = 5;
  page: number = 0;
  totalComments: number = 0;
  totalPages: number = 0;

 


  showCommentsPageWithPublication(): void {
    this.activateRoute.params
      .pipe(
        delay(1000),
        switchMap(() =>
          this.commentService.getAllCommentPageInPublicationId(
            this.publicationId,
            this.page,
            this.pageSize
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.showSpinner = true;
          this.comments = response.comments;
          this.totalPages = response.pages.totalPages;
          this.totalComments = response.pages.totalComments;
          this.dataPaginacion = new MatTableDataSource<ComentarioDTo>(
            this.comments
          );
        },
        error: (e) => {
          if (e.status === 500) {
            this.validatorService.validateSnackBar(
              'A system error has occurred!'
            );
          }
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
          this.commentService.getAllCommentPageInPublicationId(
            this.publicationId,
            nroPagina,
            cantidadPorPagina
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.comments = response.comments;
          this.dataPaginacion = new MatTableDataSource<ComentarioDTo>(
            this.comments
          );
        },
      });
  } */
}
