import { Component, OnInit } from '@angular/core';
import { StaticsInput } from '../../../components/statistcs-info/statistcs-info.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public infoList :Array<StaticsInput> = [];

  ngOnInit(): void {
   this.initializeStaticts();
  }

  private initializeStaticts ():void{
    this.infoList = [
      {
        title:"Account balance",
        amount:50,
        infoStyle:'bg-secondary'
      },
      {
        title:"Highest transfert",
        amount:50,
        infoStyle:'bg-warning'
      },
      {
        title:"Highest deposit",
        amount:100,
        infoStyle:'bg-success'
      }
    ];
  }
}
