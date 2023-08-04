import { Component, OnInit, Input, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bank-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  private authService= inject(AuthService);

  @Input()
  public isAdmin : boolean= false;
  
  public role  : string = 'user';

  ngOnInit(): void {
    if(this.isAdmin){
      this.role = 'admin';
    }
  
  }
  
  logout():void{
    this.authService.logout();
  }
}
