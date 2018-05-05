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

    
    createAuthenticationHeaders() {
        this.authService.loadToken(); 
    
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json', 
                'authorization': this.authService.authToken 
            })
        });
    }

    newSubmission(submission) {
        this.createAuthenticationHeaders(); 
        return this.http.post(this.domain + 'submit/submission', submission, this.options).map(res => res.json());
    }

    getAllSubmissions() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'submit/allSubmissions', this.options).map(res => res.json());
    }


}
