import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ComponentsComponent } from './pages/components/components.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginGuard } from './pages/shared/guard/login.guard';

const routes: Routes = [

  {path: '', redirectTo: 'principal/home', pathMatch: 'full'},
  {path: 'principal', component:ComponentsComponent},
  {path: 'authentication', component:AuthComponent},
  {path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
