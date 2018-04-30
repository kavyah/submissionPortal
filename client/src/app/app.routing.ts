import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SubmissionComponent } from './submission/submission.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './Services/auth.service';
import { SubmissionService } from './Services/submission.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'submission', 
        component: SubmissionComponent,
        canActivate: [AuthGuard]
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent }
    //{ path: '**', component: PageNotFoundComponent }
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]

})
export class AppRoutingModule { }
