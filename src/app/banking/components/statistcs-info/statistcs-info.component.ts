import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

export interface StaticsInput {
  title?: string;
  amount?: number;
  infoStyle?: 'bg-primary' | 'bg-success' | 'bg-secondary' | 'bg-warning';
}
@Component({
  selector: 'banking-statistcs-info',
  templateUrl: './statistcs-info.component.html',
  styleUrls: ['./statistcs-info.component.css'],
  animations: [
    trigger('cardHover', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'hovered',
        style({
          transform: 'scale(1.05)',
        })
      ),
      transition('normal => hovered', animate('200ms ease-in')),
      transition('hovered => normal', animate('200ms ease-out')),
    ]),
  ],
})
export class StatistcsInfoComponent implements OnInit{
  
  public cardState: string = 'normal';

  onCardHover(isHovered: boolean) {
    this.cardState = isHovered ? 'hovered' : 'normal';
  }

  @Input()
  public infoInput: StaticsInput = {};


  ngOnInit(): void {
    if(!this.infoInput){
      throw new Error('Object infoInput  in error not  exists!');
    }
   
  }
  
}
