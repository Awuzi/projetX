import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getItems() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}/${token}`);
  }

  postItem(item: object) {
    return this.http.post(this.API_URL, item);
  }

  deleteItem(item: object) {
    return this.http.post(`${this.API_URL}/delete`, item);
  }


  updateItem(item: object) {
    return this.http.post(`${this.API_URL}/update`, item);
  }

  register(credentials: object) {
    return this.http.post(`${this.API_URL}/register`, credentials);
  }

  login(credentials: object) {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  getUsername() {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
  }
}
