import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
