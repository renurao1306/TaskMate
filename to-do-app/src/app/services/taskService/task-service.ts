import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) { }

  private getAuthToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    return undefined;
  }

  addTask(payload: any) {
    return this.http.post('http://localhost:5000/api/tasks/add', payload, { headers: this.getAuthToken() })
  }

  getTasks() {
    return this.http.get('http://localhost:5000/api/tasks/getTasks', {headers: this.getAuthToken()})
  }
}
