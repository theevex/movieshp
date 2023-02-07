import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class APIService {

    constructor(private http: HttpClient) {}
    
    post(url: string, data: any) {
        return this.http.post<any>(`${url}`, data);
    }

    get(url: string) {
        return this.http.get<any>(`${url}`);
    }
}