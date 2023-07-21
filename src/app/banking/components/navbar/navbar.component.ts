import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bank-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Input()
  public isAdmin : boolean= false;
  
  public role  : string = 'user';

  ngOnInit(): void {
    if(this.isAdmin){
      this.role = 'admin';
    }
  
  }
  
}
