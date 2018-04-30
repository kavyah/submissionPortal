import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


    email = '';

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit() {
        // Once component loads, get user's data to display on profile
        this.authService.getProfile().subscribe(profile => {
            this.email = profile.user.email; // Set e-mail
        });
    }

}

