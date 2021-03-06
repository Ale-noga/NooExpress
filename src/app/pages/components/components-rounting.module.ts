import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { AuthGuard } from "../shared/guard/auth.guard";
import { BudgetpageComponent } from "./budgetpage/budgetpage.component";
import { ComponentsComponent } from "./components.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { StatusBudgetComponent } from "./status-budget/status-budget.component";

const routes: Routes = [
    {
        path: 'principal',
        component:ComponentsComponent,
        children: [
            {path: '', redirectTo: 'principal/home', pathMatch: 'full'},
            {path: 'home', component: LandingpageComponent},
            {path: 'budget', component: BudgetpageComponent},
            {path: 'statusBudget', component: StatusBudgetComponent},
        ]
    }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes),
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        IvyCarouselModule
    ],
    exports:[RouterModule],
    declarations:[
    LandingpageComponent,
    BudgetpageComponent,
    StatusBudgetComponent
    
  ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})

export class ComponentsRoutingModule{}