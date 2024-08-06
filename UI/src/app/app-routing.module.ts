import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovestoryComponent } from './admin/approvestory/approvestory.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PoststoryComponent } from './user/poststory/poststory.component';
import { ReadstoriesComponent } from './user/readstories/readstories.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { CategoryComponent } from './admin/category/category.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'readstories',
    component: ReadstoriesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'poststory',
    component: PoststoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'approvestory',
    component: ApprovestoryComponent,
    canActivate: [AuthGuardService],
    data: { hasRole: 'Admin' }
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuardService],
    data: { hasRole: 'Admin' }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'accessdenied',
    component: AccessdeniedComponent
  },
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
