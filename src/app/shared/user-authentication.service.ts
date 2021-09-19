import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  //api/Authenticatin/Login
  readonly BaseURL = 'http://localhost:20409/api';
  
  constructor(public fb:FormBuilder, private http: HttpClient) { }
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Password: ['',Validators.required]});

  login(formData:any) {
    return this.http.post(this.BaseURL + '/Authentication/Login', formData);
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Password
    };
    return this.http.post(this.BaseURL + '/Authentication/Register', body);
  }
}