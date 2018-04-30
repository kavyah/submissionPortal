
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(
        public   authService: AuthService,
        private router: Router
    ) { }
  onLogoutClick() {
      this.authService.logout(); // Logout user
      this.router.navigate(['/']); // Navigate back to home page
  }

  ngOnInit() {
  }

}
