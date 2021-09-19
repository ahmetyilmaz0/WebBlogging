import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/users.model';
import { UserAuthenticationService } from '../shared/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  
  constructor(public service: UserAuthenticationService, 
    private router: Router, 
    public http:HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.removeItem('username');
        localStorage.setItem('username', this.formModel.UserName);
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
      }
    );
  }
}
