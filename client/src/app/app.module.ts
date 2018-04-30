import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SubmissionComponent } from './submission/submission.component';
import { RegisterComponent } from './register/register.component';
import { AuthService} from './Services/auth.service';
import { SubmissionService } from './Services/submission.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    declarations: [AppComponent, NavBarComponent, HomeComponent, SubmissionComponent, RegisterComponent, LoginComponent, ProfileComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule, ReactiveFormsModule
    ],
    providers: [AuthService, AuthGuard ,SubmissionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
