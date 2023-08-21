import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { AddressDto } from '../../interfaces/addressDto-interface';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidatorsService } from 'src/app/shared/validators.service';
import {
  Subscription,
  Observable,
  mergeMap,
  EMPTY,
  of,
  catchError,
  filter,
  firstValueFrom,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);

  private validatorsService = inject(ValidatorsService);

  private addressService = inject(AddressService);

  private fb = inject(FormBuilder);

  private subscription = new Subscription();

  public user: string = '';

  public disableButton: boolean = false;

  public readOnly: boolean = false;

  public myFormProfile: FormGroup = this.fb.group({
    id: [''],
    street: ['', [Validators.required]],
    direction: ['', [Validators.required]],
    codePostal: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    userId: [0],
  });

  ngOnInit(): void {
    const userId = this.authService.getUser().userId;
    this.myFormProfile.get('userId')?.setValue(userId);
    this.userLocalStorage();
    this.getAddressByUserId(userId);
  }

  userLocalStorage(): void {
    this.user = this.authService.getUser().fullName;
  }

  get currentAddress(): AddressDto {
    return this.myFormProfile.value as AddressDto;
  }

  onSaveAddress(): void {
    if (this.myFormProfile.invalid) {
      this.myFormProfile.markAllAsTouched();
      return;
    }
    this.addressService.saveAddressByUserId(this.currentAddress).subscribe({
      next: (data: AddressDto) => {
        Swal.fire('Exito!', 'Address registered successfully!', 'success').then(
          (e) => {
            if (e.isConfirmed) {
              this.disableButton = true;
              this.readOnly = true;
            }
          }
        );
      },
      error: (e: HttpErrorResponse) => {
        this.validatorsService.showSnackBarForError(e);
      },
    });
  }

  getAddressByUserId(userId: number): void {
    this.validateUser(userId).subscribe((isValid) => {
      if (isValid) {
        this.addressService.findAddresByUserId(userId).subscribe({
          next: (data: AddressDto) => {
            if (data) {
              this.disableButton = true;
              this.readOnly = true;
              this.myFormProfile.patchValue(data);
              //this.myFormProfile.disable();
            }
          },
          error: (e: HttpErrorResponse) => {
            this.validatorsService.showSnackBarForError(e);
          },
        });
      }
    });
  }

  private validateUser(userId: number): Observable<Boolean> {
    return this.addressService.existsByUserId(userId);
  }

  onFieldValidator(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myFormProfile, field);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
