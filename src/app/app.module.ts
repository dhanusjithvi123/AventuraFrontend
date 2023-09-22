import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHeaderComponent } from './componets/admin/admin-header/admin-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AdminHomeComponent } from './componets/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './componets/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './componets/users/user-login/user-login.component';
import { UserHeaderComponent } from './componets/users/user-header/user-header.component';
import { UserSinginComponent } from './componets/users/user-singin/user-singin.component';
import { UserHomeComponent } from './componets/users/user-home/user-home.component';
import { OrganisaerHeaderComponent } from './componets/organisaer/organisaer-header/organisaer-header.component';
import { OrganisaerRegisterComponent } from './componets/organisaer/organisaer-register/organisaer-register.component';
import { OrganisaerLoginComponent } from './componets/organisaer/organisaer-login/organisaer-login.component';
import { OrganisaerHomeComponent } from './componets/organisaer/organisaer-home/organisaer-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AventuraInterceptor } from './aventura.interceptor';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganisaersLandingPageComponent } from './componets/organisaer/organisaers-landing-page/organisaers-landing-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LowercasePipe} from './pipes/pipe1.pipe';
import { AuthGuard } from './guard/admin/auth-guard.guard';
import { CookieService } from 'ngx-cookie-service';
import { CookieModule } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { OrganisaerPayformComponent } from './componets/organisaer/organisaer-payform/organisaer-payform.component';
import { OrganisaerGuard } from './guard/organisaer/aut-organisaer.guard';
import { UserNavbarComponent } from './componets/users/user-navbar/user-navbar.component';
import { UserLandingpageComponent } from './componets/users/user-landingpage/user-landingpage.component';
import { UserOtppageComponent } from './componets/users/user-otppage/user-otppage.component';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from "@angular/material/list";
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDashboard, faLocation, faShop, faBox, faMoneyBill, faChartBar, faContactBook, faHand } from '@fortawesome/free-solid-svg-icons';
import { UserlistAdminComponent } from './componets/admin/userlist-admin/userlist-admin.component';
import { OrganisaerAdminComponent } from './componets/admin/organisaer-admin/organisaer-admin.component';
import { OrganisaerEventaddingComponent } from './componets/organisaer/organisaer-eventadding/organisaer-eventadding.component';
import { EventlistComponent } from './componets/organisaer/eventlist/eventlist.component';
import { OrganisaerEventeditingComponent } from './componets/organisaer/organisaer-eventediting/organisaer-eventediting.component';
import { UserEventlistingComponent } from './componets/users/user-eventlisting/user-eventlisting.component';
import { AdminCategorylistComponent } from './componets/admin/admin-categorylist/admin-categorylist.component';
import { AdminCategoryAddandEditComponent } from './componets/admin/admin-category-addand-edit/admin-category-addand-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UserBookingComponent } from './componets/users/user-booking/user-booking.component';
import { UserOrganiserlistComponent } from './componets/users/user-organiserlist/user-organiserlist.component';
import { OrganiserbookinglistComponent } from './componets/organisaer/organiserbookinglist/organiserbookinglist.component';
import { UserbookinglistComponent } from './componets/users/userbookinglist/userbookinglist.component';
import { SearchComponent } from './componets/users/search/search.component';
import { UserProfileComponent } from './componets/users/user-profile/user-profile.component';
import { ChartModule } from 'angular-highcharts';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrganiserprofileComponent } from './componets/organisaer/organiserprofile/organiserprofile.component';
import { OrganiserRequestComponent } from './componets/admin/organiser-request/organiser-request.component';
import { ForgetpasswordComponent } from './componets/users/forgetpassword/forgetpassword.component';
import { AdminchatComponent } from './componets/admin/adminchat/adminchat.component';
import { OrganizerchatComponent } from './componets/organisaer/organizerchat/organizerchat.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatUsersListComponent } from './componets/admin/chat-users-list/chat-users-list.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PasswordchangeemailComponent } from './componets/users/passwordchangeemail/passwordchangeemail.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { NgxSpinnerModule } from "ngx-spinner";










library.add(faDashboard, faLocation, faShop, faBox, faMoneyBill, faChartBar, faContactBook, faHand);






@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserHeaderComponent,
    UserSinginComponent,
    UserHomeComponent,
    OrganisaerHeaderComponent,
    OrganisaerRegisterComponent,
    OrganisaerLoginComponent,
    OrganisaerHomeComponent,
    NotFoundComponent,
    OrganisaersLandingPageComponent,
    LowercasePipe,
    OrganisaerPayformComponent,
    UserNavbarComponent,
    UserLandingpageComponent,
    UserOtppageComponent,
    UserlistAdminComponent,
    OrganisaerAdminComponent,
    OrganisaerEventaddingComponent,
    EventlistComponent,
    OrganisaerEventeditingComponent,
    UserEventlistingComponent,
    AdminCategorylistComponent,
    AdminCategoryAddandEditComponent,
    UserBookingComponent,
    UserOrganiserlistComponent,
    OrganiserbookinglistComponent,
    UserbookinglistComponent,
    SearchComponent,
    UserProfileComponent,
    OrganiserprofileComponent,
    OrganiserRequestComponent,
    ForgetpasswordComponent,
    AdminchatComponent,
    OrganizerchatComponent,
    ChatUsersListComponent,
    PasswordchangeemailComponent,
    NewpasswordComponent,
  ],
  imports: [
    BrowserModule,
    CanvasJSAngularChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    CookieModule.forRoot(),
    MatTableModule,
    MatListModule,
    MatSidenavModule,
    NgChartsModule ,
    FontAwesomeModule,
    MatDialogModule,
    ChartModule ,
    MatProgressBarModule,
    RouterModule,
    NgxSpinnerModule,

  ],
  providers: [CookieService,OrganisaerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
