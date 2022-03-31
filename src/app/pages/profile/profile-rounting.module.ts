import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { PersonComponent } from './person/person.component';
import { ProfileBudgetsComponent } from './profile-budgets/profile-budgets.component';
import { ProfilePassRecoveryComponent } from './profile-pass-recovery/profile-pass-recovery.component';
import { AuthGuard } from "../shared/guard/auth.guard";
import { NavbarProfileComponent } from './navbar-profile/navbar-profile.component';

const routes: Routes = [
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component:ProfileComponent,
        children: [
            {path: '', redirectTo: 'profile/person', pathMatch: 'full'},
            {path: 'person', component: PersonComponent},
            {path: 'profile-budgets', component: ProfileBudgetsComponent},
            {path: 'pass-recovery', component: ProfilePassRecoveryComponent}
        ]
    }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes),
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:[RouterModule],
    declarations:[
    PersonComponent,
    ProfileBudgetsComponent,
    ProfilePassRecoveryComponent
  ],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class ProfileRoutingModule{}