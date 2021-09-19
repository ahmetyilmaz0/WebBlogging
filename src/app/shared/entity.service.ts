import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  readonly BaseURL = 'http://localhost:20409/api/Entities';
  constructor(public fb:FormBuilder, 
    private http: HttpClient,
    public user:UserAuthenticationService) { }
    
    formModel = this.fb.group({
      UserName: [localStorage.getItem('username'), Validators.required],
      Entity: ['', Validators.required]
    });

    postEntity(formData:any) {
      return this.http.post(this.BaseURL, formData);
    }
    deleteEntity(id: number) {
      return this.http.delete(this.BaseURL+"/"+id);
    }
}
