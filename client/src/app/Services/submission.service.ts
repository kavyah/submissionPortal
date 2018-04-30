import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class SubmissionService {
    options;
    domain= this.authService.domain;

    constructor(
        private authService: AuthService,
        private http: Http
    ) { }

    // Function to create headers, add token, to be used in HTTP requests
    createAuthenticationHeaders() {
        this.authService.loadToken(); // Get token so it can be attached to headers
        // Headers configuration options
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json', // Format set to JSON
                'authorization': this.authService.authToken // Attach token
            })
        });
    }

    newSubmission(submission) {
        this.createAuthenticationHeaders(); // Create headers
        return this.http.post(this.domain + 'submit/submission', submission, this.options).map(res => res.json());
    }

    getAllSubmissions() {
        this.createAuthenticationHeaders(); // Create headers
        return this.http.get(this.domain + 'submit/allSubmissions', this.options).map(res => res.json());
    }


}
