import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetpageComponent } from './pages/budgetpage/budgetpage.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:LandingpageComponent},
  {path: 'budget', component: BudgetpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
