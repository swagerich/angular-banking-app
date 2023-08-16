import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from 'src/app/banking/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { delay, Subscription, timeout } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { ClientDto } from 'src/app/banking/interfaces/clientDto-interface';

@Component({
  selector: 'bank-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);

  private authService = inject(AuthService);

  private validators = inject(ValidatorsService);

  private fb = inject(FormBuilder);

  public subscription: Subscription = new Subscription();

  public clients: ClientDto[] = [];
  
  public myFormManagerUser = this.fb.group({
    active: false,
    showInactiveUserOnly: false,
  });

  ngOnInit(): void {

    this.getAllClientRoleUser();
    this.onToggleStateLocalStorage();
  
}

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'numberAccount',
    'active',
    'options',
  ];

  getAllClientRoleUser(): void {
    Swal.fire({
      title: 'Uploading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.subscription = this.userService.getAllClientByRoleUser()
      .pipe(delay(2000))
      .subscribe({
        next: (data) => {
          this.clients = data;
          Swal.close();
        },
        error: (e:HttpErrorResponse) => {
          this.validators.showSnackBarForError(e);
        },
      });
  }

  filterCustomers(): void {
    const showInactiveUserOnly = this.myFormManagerUser.get(
      'showInactiveUserOnly'
    )?.value;
    if (showInactiveUserOnly) {
      this.clients = this.clients.filter((x) => x.active);
    } else {
      this.getAllClientRoleUser();
    }
  }

  changeUserState(userId: number): void {
    let isActive = this.myFormManagerUser.get('active')?.value;
  
    if (isActive) {
      this.subscription = this.userService.validateAccount(userId).subscribe((u) => {
          const clientToUpdate = this.clients.filter((c) => c.id === userId);
          if (clientToUpdate) {
            clientToUpdate[0].active = true;
          }
          localStorage.setItem('toggleState', 'true');
        });
    } else {
      this.subscription = this.userService.invalidateAccount(userId).subscribe((u) => {
          const clientToUpdate = this.clients.filter((c) => c.id === userId);
          if (clientToUpdate) {
            clientToUpdate[0].active = false;
          }
          localStorage.setItem('toggleState', 'false');
        });
    }
  }

  onToggleStateLocalStorage(): void {
    const toggleState = localStorage.getItem('toggleState');

    if (toggleState === 'true'){
      this.myFormManagerUser.get('active')?.setValue(true);
    }else{
      this.myFormManagerUser.get('active')?.setValue(false);
    }
   
  }

  deleteContact(userId: number): void {
    const clientId = this.clients.find((idClient) => idClient.id == userId);
    if (clientId) {
      Swal.fire({
        title: `Are you sure to delete the client ${clientId.firstName}?`,
        text: 'you will not be able to reverse instead!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deleted!',
      }).then((c) => {
        if (c.isConfirmed) {
          this.userService.deleteClientById(userId).subscribe({
            next: () => {
              Swal.fire(
                'Removed!',
                'Contact was successfully removed!',
                'success'
              );
              this.clients = this.clients.filter((cId) => cId.id !== userId);
            },
            error: (e: HttpErrorResponse) => {
              this.validators.showSnackBarForError(e);
            },
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
