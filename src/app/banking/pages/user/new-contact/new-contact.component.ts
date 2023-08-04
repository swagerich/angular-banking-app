import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactDto } from 'src/app/banking/interfaces/contactDto-interface';
import { AccountService } from 'src/app/banking/services/account.service';
import { AuthService } from 'src/app/banking/services/auth.service';
import { ContactService } from 'src/app/banking/services/contact.service';
import { ValidatorsService } from 'src/app/shared/validators.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css'],
})
export class NewContactComponent implements OnInit {
  private fb = inject(FormBuilder);

  private validators = inject(ValidatorsService);

  private authService = inject(AuthService);

  private router = inject(Router);

  private contactService = inject(ContactService);

  private activateRouter = inject(ActivatedRoute);

  public myFormAccount: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: [''],
    number: ['', [Validators.required]],
    userId: [0],
  });

  get currentAccount(): ContactDto {
    return this.myFormAccount.value;
  }

  ngOnInit(): void {
 
      this.activateRouter.params
        .pipe(
          filter(
            (params) =>
              params['idContact'] !== null && params['idContact'] !== undefined
          ),
          switchMap((params) =>
            this.contactService.findByContactId(+params['idContact'])
          ),
          catchError((e: HttpErrorResponse) => {
            throw this.validators.showSnackBarForError(e);
          })
        )
        .subscribe((contact: ContactDto) => {
          this.myFormAccount.reset(contact);
        });
    
  }

  onSave() {
    if (this.myFormAccount.invalid) {
      this.myFormAccount.markAllAsTouched();
      return;
    }
    let idUser = this.authService.getUser().userId;
    this.myFormAccount.get('userId')?.setValue(idUser);
    this.contactService.saveContact(this.currentAccount).subscribe({
      next: () => {
        Swal.fire('Exito!', 'Account registered successfully!', 'success').then(
          (a) => {
            if (a.isConfirmed) {
              this.router.navigate(['/user/contacts']);
              this.myFormAccount.reset();
            }
          }
        );
      },
      error: (e: HttpErrorResponse) => {
        this.validators.showSnackBarForError(e);
      },
    });
  }
  backContacts():void{
    this.router.navigate(['/user/contacts']);
  }
  onFieldValidator(field: string): boolean | null {
    return this.validators.isValidField(this.myFormAccount, field);
  }
}
