import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/register/user.service';

@Component({
  selector: 'app-profile-pass-recovery',
  templateUrl: './profile-pass-recovery.component.html',
  styleUrls: ['./profile-pass-recovery.component.scss']
})
export class ProfilePassRecoveryComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.user = this.userService.get_user_by_id(localStorage["user_uid"]);
  }

}
