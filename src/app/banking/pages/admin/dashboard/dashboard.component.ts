import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { lastValueFrom, Subscription } from 'rxjs';
import { StaticInputCustomer } from 'src/app/banking/components/statistcs-info/statistcs-info.component';
import { UsuariosDetails } from 'src/app/banking/interfaces/usuariosDetails';
import { StatisticsService } from 'src/app/banking/services/statistics.service';
import { UserService } from 'src/app/banking/services/user.service';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  private userService = inject(UserService);

  private validatorService = inject(ValidatorsService);

  private statisticsService = inject(StatisticsService);

  private subscription = new Subscription();

  public infoList: Array<StaticInputCustomer> = [];

  public customersActive: number = 0;
  public customersInactive: number = 0;
  public customersTotal: number = 0;

  public minDate = new Date(2022, 6, 1);
  public maxDate = new Date(2030, 6, 1);

  public myFormDasboardAdmin: FormGroup = this.fb.group({
    startDate: ['', [Validators.required]],
    lastDate: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.clientsRoleUserIsDetail();
  }

  async clientsRoleUserIsDetail(): Promise<void> {
    try {
      this.customersActive = await lastValueFrom(
        this.userService.getAllRoleUserIsActive()
      );

      this.customersInactive = await lastValueFrom(
        this.userService.getAllRoleUserIsInactive()
      );

      this.customersTotal = await lastValueFrom(
        this.userService.countClientByRoleUser()
      );
    } catch (e: HttpErrorResponse | any) {
      this.validatorService.showSnackBarForError(e);
    }
    this.initializeCustomers();
  }

  onDetilsClient(): void {
    const start = this.myFormDasboardAdmin.get('startDate')?.value;
    const last = this.myFormDasboardAdmin.get('lastDate')?.value;

    const startDate = this.convertFormaterDate(start);
    const lastDate = this.convertFormaterDate(last);

    this.subscription = this.statisticsService
      .countClientsByDate(startDate, lastDate)
      .subscribe({
        next: (data: UsuariosDetails[]) => {
          let totalUsers: number[] = [];
          data.forEach((u) => {
            this.lineChartData.labels?.push(u.usuariosDate);
            totalUsers.push(u.total as number);
          });
          this.lineChartData.datasets[0].data = totalUsers;
        },
        error: (e: HttpErrorResponse) => {
          this.validatorService.showSnackBarForError(e);
        },
      });
  }

  public lineChartType: ChartType = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Customer by date',
        fill: 'origin',
      },
    ],
  };

  public chartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          font: {
            size: 16,
          },
          usePointStyle: true,
        },
      },
    },
  };

  convertFormaterDate(inputDate: Date | string): string {
    const date = new Date(inputDate as string);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private initializeCustomers(): void {
    this.infoList = [
      {
        title: 'Total active customers',
        customers: this.customersActive,
        infoStyle: 'bg-primary',
      },
      {
        title: 'Total inactive customers',
        customers: this.customersInactive,
        infoStyle: 'bg-warning',
      },
      {
        title: 'Total customers',
        customers: this.customersTotal,
        infoStyle: 'bg-secondary',
      },
    ];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
