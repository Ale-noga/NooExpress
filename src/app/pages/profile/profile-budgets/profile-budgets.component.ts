import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/register/user.service';

@Component({
  selector: 'app-profile-budgets',
  templateUrl: './profile-budgets.component.html',
  styleUrls: ['./profile-budgets.component.scss']
})
export class ProfileBudgetsComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.get_user_by_id(localStorage["user_uid"]);
  }

}
