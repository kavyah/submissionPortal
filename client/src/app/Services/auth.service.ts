import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

    domain = " "; 
    authToken;
    user;
    options;

    constructor(
        private http: Http
    ) { }

    
    createAuthenticationHeaders() {
        this.loadToken(); 
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authToken 
            })
        });
    }

    
    loadToken() {
        this.authToken = localStorage.getItem('token');
    }

    
    registerUser(user) {
        return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
    }

    

    
    checkEmail(email) {
        return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
    }
    checkLink(link) {
        return this.http.get(this.domain + 'authentication/checkLink/' + link).map(res => res.json());
    }


    // Function to login user
    login(user) {
        return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
    }

    // Function to logout
    logout() {
        this.authToken = null; // Set token to null
        this.user = null; // Set user to null
        localStorage.clear(); // Clear local storage
    }

    // Function to store user's data in client local storage
    storeUserData(token, user) {
        localStorage.setItem('token', token); // Set token in local storage
        localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
        this.authToken = token; // Assign token to be used elsewhere
        this.user = user; // Set user to be used elsewhere
    }

    // Function to get user's profile data
    getProfile() {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
    }

    // Function to check if user is logged in
    loggedIn() {
        return tokenNotExpired();
    }



}
