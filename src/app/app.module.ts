import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './shared/component/product/product.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { UserFormComponent } from './shared/component/user-form/user-form.component';
import { UserDashboaredComponent } from './shared/component/user-dashboared/user-dashboared.component';
import { MaterialModule } from './shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInformationComponent } from './shared/component/user-information/user-information.component';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavbarComponent,
    UserFormComponent,
    UserDashboaredComponent,
    UserInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    GetConfirmComponent,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}