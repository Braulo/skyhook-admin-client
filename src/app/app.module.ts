import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { RealmsComponent } from './components/realms/realms.component';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { RealmDialogComponent } from './components/dialogs/realm-dialog/realm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RealmApplicationDialogComponent } from './components/dialogs/realm-application-dialog/realm-application-dialog.component';
import { AuthGuardService } from './services/auth/guard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RealmsComponent,
    HomeComponent,
    RealmDialogComponent,
    RealmApplicationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
