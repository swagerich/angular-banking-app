import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './banking/auth/login/login.component';
import { SignupComponent } from './banking/auth/signup/signup.component';
import { NavbarComponent } from './banking/components/navbar/navbar.component';
import { UserDashboardComponent } from './banking/pages/user/user-dashboard/user-dashboard.component';
import { StatistcsInfoComponent } from './banking/components/statistcs-info/statistcs-info.component';
import { TransactionsComponent } from './banking/pages/user/transactions/transactions.component';
import { HttpClientModule} from '@angular/common/http';
import { AccountComponent } from './banking/pages/user/account/account.component';
import { ContactComponent } from './banking/pages/user/contact/contact.component';
import { NewTransactionComponent } from './banking/pages/user/new-transaction/new-transaction.component';
import { NewContactComponent } from './banking/pages/user/new-contact/new-contact.component';
import { ProfileComponent } from './banking/pages/profile/profile.component';
import { ManageUsersComponent } from './banking/pages/admin/manage-users/manage-users.component';
import { UserLayoutComponent } from './banking/pages/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './banking/pages/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './banking/pages/admin/dashboard/dashboard.component';

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
    ContactComponent,
    NewTransactionComponent,
    NewContactComponent,
    ProfileComponent,
    ManageUsersComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
