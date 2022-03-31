import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UserService } from '../auth/register/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  _router: any

  constructor(private router: Router, private userService: UserService) {
    this._router = this.router;
   }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.get_user_by_id(localStorage["user_uid"]);
  }

  signOut(){
    getAuth().signOut();
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
