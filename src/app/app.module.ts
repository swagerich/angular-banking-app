import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './banking/auth/auth.interceptor';
import { AppComponent } from './app.component';

import { LoginComponent } from './banking/auth/login/login.component';
import { SignupComponent } from './banking/auth/signup/signup.component';
import { NavbarComponent } from './banking/components/navbar/navbar.component';
import { UserDashboardComponent } from './banking/pages/user/user-dashboard/user-dashboard.component';
import { StatistcsInfoComponent } from './banking/components/statistcs-info/statistcs-info.component';
import { TransactionsComponent } from './banking/pages/user/transactions/transactions.component';
import { AccountComponent } from './banking/pages/user/account/account.component';
import { ContactsComponent } from './banking/pages/user/contacts/contacts.component';
import { NewTransactionComponent } from './banking/pages/user/new-transaction/new-transaction.component';
import { NewContactComponent } from './banking/pages/user/new-contact/new-contact.component';
import { ProfileComponent } from './banking/pages/profile/profile.component';
import { ManageUsersComponent } from './banking/pages/admin/manage-users/manage-users.component';
import { UserLayoutComponent } from './banking/pages/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './banking/pages/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './banking/pages/admin/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'yyyy-MM-dd',
  },
  display: {
    dateInput: 'yyyy-MM-dd',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'yyyy-MM-dd',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    UserDashboardComponent,
    StatistcsInfoComponent,
    TransactionsComponent,
    AccountComponent,
    ContactsComponent,
    NewTransactionComponent,
    NewContactComponent,
    ProfileComponent,
    ManageUsersComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [
    authInterceptorProviders,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
