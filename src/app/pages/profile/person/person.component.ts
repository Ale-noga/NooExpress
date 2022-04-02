import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/register/user.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.get_user_by_id(localStorage["user_uid"]);
  }

}
