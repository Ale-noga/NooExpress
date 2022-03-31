import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetpageComponent } from './pages/budgetpage/budgetpage.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StatusBudgetComponent } from './pages/status-budget/status-budget.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:LandingpageComponent},
  {path: 'budget', component: BudgetpageComponent},
  {path: 'statusBudget', component: StatusBudgetComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
