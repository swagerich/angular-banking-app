import { Component, Input, OnDestroy, OnInit } from '@angular/core';

export interface StaticsInput {
  title?: string;
  amount?: number;
  infoStyle?: 'bg-primary' | 'bg-success' | 'bg-secondary' | 'bg-warning';
}
@Component({
  selector: 'banking-statistcs-info',
  templateUrl: './statistcs-info.component.html',
  styleUrls: ['./statistcs-info.component.css'],
})
export class StatistcsInfoComponent implements OnInit, OnDestroy {

  @Input()
  public infoInput: StaticsInput = {};


  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
