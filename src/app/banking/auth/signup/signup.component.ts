import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ClientDto } from '../../interfaces/clientDto-interface';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder);

  private validators = inject(ValidatorsService);

  private authService = inject(AuthService);

  public myFormAuth: FormGroup = this.fb.group({
    id: [0],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['test@example.com', [Validators.email, Validators.required]],
    age: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repeatPassword: ['', Validators.required],
  });

  ngOnInit(): void {}

  get currentUser(): ClientDto {
    return this.myFormAuth.value as ClientDto;
  }

  onSignupForm(): void {
    if (this.myFormAuth.invalid) {
      this.myFormAuth.markAllAsTouched();
      return;
    }
    const password1 = this.myFormAuth.get('password')?.value;
    const password2 = this.myFormAuth.get('repeatPassword')?.value;
    if (password1 !== password2) {
      this.myFormAuth.get('repeatPassword')?.setErrors({ mismatch: true });
      return;
    }

    this.authService.signup(this.currentUser).subscribe({
      next: () => {
        Swal.fire('Success!', 'Registered Successfully!', 'success').then((e) => {
          if (e.isConfirmed) {
            this.myFormAuth.reset();
          }
        });
      },
      error: (e:HttpErrorResponse) => {
        this.validators.showSnackBarForError(e);
      }
    });
  }
  onFieldValidators(field: string): boolean | null {
    return this.validators.isValidField(this.myFormAuth, field);
  }
  onFieldValitatorRequiredLength(field: string): string | null {
    return this.validators.isValidFieldLength(this.myFormAuth, field);
  }
}
