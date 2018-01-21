﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User, UserInfo } from '../_models/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {

        // return this.http.get('http://localhost:61053/api/User/'+'tul@gmail.com') ;
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // get the data from the api using http request:
                    (this.http.get<UserInfo>('http://localhost:61053/api/User/tul@gmail.com').subscribe(resp => {
                        console.log(resp.email);
                        console.log(resp.password);
                    }));
                    // this.getJson().subscribe(resp => {
                    //     console.log(resp.firstname);
                    //     console.log(resp.lastname);
                    // });
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    // getJson(): Observable<any> {
    //     return this.http.get('http://localhost:61053/api/User');
    // }

}

