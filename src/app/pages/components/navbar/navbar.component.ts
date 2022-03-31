import { Component, HostListener, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { UserService } from '../../auth/register/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged: any;
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    /* if(localStorage["user_uid"] != null){
      this.logged = true;
      this.user = this.userService.get_user_by_id(localStorage["user_uid"])
    } else {
      this.logged = false;
    } */
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      var navbar = document.getElementById('navbar');
      if(window.pageYOffset > 0){
        navbar?.classList.remove('bg-transparent');
        navbar?.classList.add('bg-white');
      } else if (window.pageYOffset == 0){
        navbar?.classList.remove('bg-white');
        navbar?.classList.add('bg-transparent');
      } 
  }

}
