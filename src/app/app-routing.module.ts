import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './componets/users/user-login/user-login.component';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './componets/users/user-home/user-home.component';
import { UserSinginComponent } from './componets/users/user-singin/user-singin.component';
import { OrganisaerHomeComponent } from './componets/organisaer/organisaer-home/organisaer-home.component';
import { OrganisaerLoginComponent } from './componets/organisaer/organisaer-login/organisaer-login.component';
import { OrganisaerRegisterComponent } from './componets/organisaer/organisaer-register/organisaer-register.component';
import { AdminLoginComponent } from './componets/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './componets/admin/admin-home/admin-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganisaersLandingPageComponent } from './componets/organisaer/organisaers-landing-page/organisaers-landing-page.component';
import { AuthGuard } from './guard/admin/auth-guard.guard';
import { OrganisaerPayformComponent } from './componets/organisaer/organisaer-payform/organisaer-payform.component';
import { OrganisaerGuard } from './guard/organisaer/aut-organisaer.guard';
import { autUserGuard } from './guard/user/aut-user.guard';
import { UserLandingpageComponent } from './componets/users/user-landingpage/user-landingpage.component';
import { UserOtppageComponent } from './componets/users/user-otppage/user-otppage.component';
import { UserlistAdminComponent } from './componets/admin/userlist-admin/userlist-admin.component';
import { OrganisaerAdminComponent } from './componets/admin/organisaer-admin/organisaer-admin.component';
import { OrganisaerEventaddingComponent } from './componets/organisaer/organisaer-eventadding/organisaer-eventadding.component';
import { EventlistComponent } from './componets/organisaer/eventlist/eventlist.component';
import { OrganisaerEventeditingComponent } from './componets/organisaer/organisaer-eventediting/organisaer-eventediting.component';
import { UserEventlistingComponent } from './componets/users/user-eventlisting/user-eventlisting.component';
import { AdminCategorylistComponent } from './componets/admin/admin-categorylist/admin-categorylist.component';
import { UserBookingComponent } from './componets/users/user-booking/user-booking.component';
import { UserOrganiserlistComponent } from './componets/users/user-organiserlist/user-organiserlist.component';
import { OrganiserbookinglistComponent } from './componets/organisaer/organiserbookinglist/organiserbookinglist.component';
import { UserbookinglistComponent } from './componets/users/userbookinglist/userbookinglist.component';
import { AdminCategoryAddandEditComponent } from './componets/admin/admin-category-addand-edit/admin-category-addand-edit.component';
import { UserProfileComponent } from './componets/users/user-profile/user-profile.component';
import { OrganiserprofileComponent } from './componets/organisaer/organiserprofile/organiserprofile.component';
import { OrganiserRequestComponent } from './componets/admin/organiser-request/organiser-request.component';
import { ForgetpasswordComponent } from './componets/users/forgetpassword/forgetpassword.component';

const routes: Routes = [
  { path: '', component: UserLandingpageComponent },
  { path: 'home', component: UserHomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'singin', component: UserSinginComponent },
  { path: 'otp', component: UserOtppageComponent },
  { path: 'event', component: UserEventlistingComponent },
  { path: 'booking/:id', component: UserBookingComponent },
  { path: 'userorgiserlist', component: UserOrganiserlistComponent },
  { path: 'bookedhistory', component: UserbookinglistComponent },
  {path: 'profile/:id',component:UserProfileComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},

  { path: 'organisaer', component: OrganisaersLandingPageComponent },
  { path: 'organisaerlogin', component: OrganisaerLoginComponent },
  { path: 'organisaerregister', component: OrganisaerRegisterComponent },
  { path: 'payform',component: OrganisaerPayformComponent,canActivate: [OrganisaerGuard],
  },
  { path: 'organisaerhome', component: OrganisaerHomeComponent },
  { path: 'eventadding', component: OrganisaerEventaddingComponent },
  { path: 'eventlist', component: EventlistComponent },
  { path: 'editevent/:id', component: OrganisaerEventeditingComponent },
  { path: 'bookedevent', component: OrganiserbookinglistComponent },
  { path: 'organsierprofile', component:OrganiserprofileComponent},

  { path: 'addcategory', component: AdminCategoryAddandEditComponent },
  { path: 'categorylist', component: AdminCategorylistComponent },
  { path: 'userlist', component: UserlistAdminComponent },
  { path: 'organisaerlist', component: OrganisaerAdminComponent },
  { path: 'verfiy',component:OrganiserRequestComponent},
  { path: 'adminlogin', component: AdminLoginComponent },
  {
    path: 'adminhome',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
