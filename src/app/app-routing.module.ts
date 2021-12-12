import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetpageComponent } from './pages/budgetpage/budgetpage.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { StatusBudgetComponent } from './pages/status-budget/status-budget.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:LandingpageComponent},
  {path: 'budget', component: BudgetpageComponent},
  {path: 'statusBudget', component: StatusBudgetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
