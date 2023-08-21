import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { ContactDto } from 'src/app/banking/interfaces/contactDto-interface';
import { AuthService } from 'src/app/banking/services/auth.service';
import { ContactService } from 'src/app/banking/services/contact.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  private contactService = inject(ContactService);

  private validators = inject(ValidatorsService);

  private authService = inject(AuthService);

  private router = inject(Router);

  public contacts: ContactDto[] = [];

  private subscription: Subscription = new Subscription();

  private loadingDialog : any;

  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'number',
    'options',
  ];

  ngOnInit(): void {
    this.contactsAll();
  }

  contactsAll(): void {
  this.closedLoadingDialog();
  this.loadingDialog =  Swal.fire({
      title: 'Uploading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const userId = this.authService.getUser().userId;
    this.subscription = this.contactService
      .findAllContactByUserId(userId).pipe(delay(2000))
      .subscribe({
        next: (data: ContactDto[]) => {
          this.contacts = data;
          this.closedLoadingDialog();
        },
        error:(e:HttpErrorResponse) =>{
          this.validators.showSnackBarForError(e);
          this.closedLoadingDialog();
        }
      });
  }

  deleteContact(id: number): void {
    const contactId = this.contacts.find((idContact) => idContact.id == id);
    if (contactId) {
      Swal.fire({
        title: `Are you sure to delete the contact ${contactId.firstName}?`,
        text: 'you will not be able to reverse instead!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deleted!',
      }).then((c) => {
        if (c.isConfirmed) {
       this.subscription = this.contactService.deleteContactById(id).subscribe({
            next: () => {
              Swal.fire(
                'Removed!',
                'Contact was successfully removed!',
                'success'
              );
              this.contacts = this.contacts.filter((cId) => cId.id !== id);
            },
            error: (e:HttpErrorResponse) => {
              this.validators.showSnackBarForError(e);
            },
          });
        }
      });
    }
  }

  updateContact(id: number): void {
    this.router.navigate(['/user/new-contact', id]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.closedLoadingDialog();
  }

  closedLoadingDialog() : void {
    if(this.loadingDialog){
        Swal.close();
    }
  }
}
