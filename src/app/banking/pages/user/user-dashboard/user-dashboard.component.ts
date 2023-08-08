import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { StaticsInput } from '../../../components/statistcs-info/statistcs-info.component';
import { StatisticsService } from 'src/app/banking/services/statistics.service';
import { AuthService } from 'src/app/banking/services/auth.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, lastValueFrom} from 'rxjs';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit,OnDestroy {

  
  private statistService = inject(StatisticsService);

  private authService = inject(AuthService);

  private fb = inject(FormBuilder);

  private validatorService = inject(ValidatorsService);

  public subscription = new Subscription();

  public minDate = new Date(2022,6,1);
  public maxDate = new Date(2030,6,1);

  public myFormDasboard = this.fb.group({
    startDate:['',Validators.required],
    lastDate:['',Validators.required],
  });

  public highestDeposit   : number = 0;
  public highestTransfert : number = 0;
  public accountBalance   : number = 0;

  public infoList: Array<StaticsInput> = [];

  public barChartType:ChartType = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { 
        data: [],
        label:'Sum transactions by day',
       /*  backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)', */
        fill: 'origin', 
      },
    ],
  };


  public chartOptions : ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins:{
     legend:{
      position:'bottom',
      display:true,
      labels:{
        font:{
          size:16
        },
        usePointStyle:true
      }
    },
  
    }
  }

  ngOnInit(): void {
    const userId = this.authService.getUser().userId;
    this.getStatisctData(userId);
  }

  onTransactionDate(): void {

    const userId = this.authService.getUser().userId;
    const startDate = this.myFormDasboard.get('startDate')?.value;
    const lastDate = this.myFormDasboard.get('lastDate')?.value;

    let start = this.convertFormaterDate(startDate as string);
    let last = this.convertFormaterDate(lastDate as string);
 
     this.subscription = this.statistService.getTransactionBetwenDate(userId, start, last).subscribe({
        next:(data) =>{
          let dataValues: Array<number> = [];
          data.forEach(d => {
            this.lineChartData.labels?.push(d.transactionDate as string);
            dataValues.push(d.amount as number);
          });
          this.lineChartData.datasets[0].data = dataValues;
        },
        error:(e:HttpErrorResponse) =>{
          this.validatorService.showSnackBarForError(e);
        }
      });
  
  }

  convertFormaterDate(inputDate: Date | string): string{
    const date = new Date(inputDate as string);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;

  }

  async getStatisctData(userId:number): Promise<any>{

    try {

      this.highestTransfert = await lastValueFrom(this.statistService.getHighTransaction(userId));

      this.highestDeposit   = await lastValueFrom(this.statistService.getHighDeposito(userId));

      this.accountBalance   = await lastValueFrom(this.statistService.getAccountAmount(userId));

    }catch(e:any | HttpErrorResponse){
      this.validatorService.showSnackBarForError(e);
    }
    this.initializeStaticts();
  }
 

  private initializeStaticts(): void {
    this.infoList = [
      {
        title: 'Account balance',
        amount: this.accountBalance,
        infoStyle: 'bg-secondary',
      },
      {
        title: 'Highest transfert',
        amount: this.highestTransfert,
        infoStyle: 'bg-warning',
      },
      {
        title: 'Highest deposit',
        amount: this.highestDeposit,
        infoStyle: 'bg-success',
      },
    ];
  }


  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
 
}
