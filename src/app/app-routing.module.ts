import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './banking/auth/signup/signup.component';
import { LoginComponent } from './banking/auth/login/login.component';
import { UserDashboardComponent } from './banking/pages/user/user-dashboard/user-dashboard.component';
import { TransactionsComponent } from './banking/pages/user/transactions/transactions.component';
import { ContactComponent } from './banking/pages/user/contact/contact.component';
import { NewTransactionComponent } from './banking/pages/user/new-transaction/new-transaction.component';
import { NewContactComponent } from './banking/pages/user/new-contact/new-contact.component';
import { ProfileComponent } from './banking/pages/profile/profile.component';
import { UserLayoutComponent } from './banking/pages/user/user-layout/user-layout.component';
import { AdminLayoutComponent } from './banking/pages/admin/admin-layout/admin-layout.component';
import { ManageUsersComponent } from './banking/pages/admin/manage-users/manage-users.component';
import { DashboardComponent } from './banking/pages/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:'full'
  },

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'contacts',
        component: ContactComponent,
      },
      {
        path: 'new-transaction',
        component: NewTransactionComponent,
      },
      {
        path: 'new-contact',
        component: NewContactComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'new-contact/:idContact',
        component: NewContactComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
    {
      path:'customers',
      component:ManageUsersComponent
    },
    {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path:'**',
      redirectTo:'dashboard'
    }
  ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
