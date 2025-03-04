import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home-component/home-component.component';

export const routes: Routes = [
    {path:"login", component: LoginComponent},
    {path:"home",component: HomeComponent},
    {path:"", redirectTo:"/login", pathMatch:"full"},
    {path:"**", redirectTo:"/login"},
];
