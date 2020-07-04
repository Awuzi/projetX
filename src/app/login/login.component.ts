import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });


  constructor(private apiS: ApiService, private route: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm.reset();
  }

  login() {
    this.apiS.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }).subscribe((res: any) => {
      if (res.message) {
        return this.openSnackBar(res.message, 'warning');
      } // error
      localStorage.setItem('token', res.accessToken);
      this.route.navigate(['/']);
    });
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('token');
    return (authToken !== null);
  }


  logout() {
    const removeToken = localStorage.removeItem('token');
    this.route.navigate(['login']).then((redirection) => {
      redirection ? this.openSnackBar('Logout! ', 'success') : null;
    });

  }

  openSnackBar(message: string, status?: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: status
    });
  }

}
