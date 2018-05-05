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
        this.authService.getProfile().subscribe(profile => {
            this.email = profile.user.email; 
        });
    }

}

