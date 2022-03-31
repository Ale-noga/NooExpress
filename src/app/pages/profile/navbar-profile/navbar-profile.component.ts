import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UserService } from '../../auth/register/user.service';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.get_user_by_id(localStorage["user_uid"])
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

  signOut(){
    getAuth().signOut();
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
